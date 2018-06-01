// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, Dimensions, Modal, CheckBox, AlertIOS, SafeAreaView, Linking } from "react-native";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";

// 自定义组件
import { styles } from "./style";
import { getEventEmitter, isSetLocalStorageAESKey } from "../../setup";
import {ModalYNStyles as styleModal} from "../../style/style";

class HomePage extends Component {

  static navigationOptions = ( props ) => {
      const { navigation } = props;
      const { state, setParams } = navigation;
      const { params } = state;
      return {
          title: I18n.t( "HomePage importWallet" ),
      };
  };

  constructor (props) {
        super(props);
        this.state = {
          TextInputAutoFocus : true,
          name : "",
          key : "" ,
          show : false,
          ItemData :[],
          accountPrivateKey : "",
          walletValue : "",
          biometryType: null,
          needUpdate:false,
        };
    }

  componentWillReceiveProps( nextProps ) {
    if(nextProps.accountNamesErr && nextProps.accountNamesErr != this.props.accountNamesErr){
      Toast.show("NO DATA",{
        position: 200,
      });
    }
   if(nextProps.accountNames){
     this.setState({
       ItemData :  nextProps.accountNames.account_names
     })
   }
  }

  componentWillMount() {
    this.isNeedInputPassword();

  }
  componentDidMount() {}

  render() {
    const privateKeyIntl = I18n.t( "HomePage privateKey" );
    const choiceAccountIntl = I18n.t( "HomePage choiceAccount" );
    const submitKey = I18n.t( "HomePage Submit" );
    const Hint = I18n.t( "HomePage Hint" );
    const PleaseEnterComplete = I18n.t( "HomePage PleaseEnterComplete" );
    const PleaseSure = I18n.t( "HomePage PleaseSure" );
    const PleaseCancel = I18n.t( "HomePage PleaseCancel" );

    return (
        <SafeAreaView style={[{flex:1}]}>
          <View style={styles.bodyBox}>
            <ScrollView>
              <View>
                <Text style={styles.contentBoxTitle}>{privateKeyIntl}</Text>
                <TextInput
                  style={styles.conItemTextInput}
                  placeholder={Hint}
                  placeholderTextColor={"#999"}
                  onChangeText={(key) => this.setState({key})}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View  style={{display : this.state.ItemData.length > 0 ? "flex" : "none"}}>
                <Text style={styles.contentItemTitle}>{choiceAccountIntl}</Text>
                <View style={styles.contentItemBox}>
                  {this.state.ItemData.map((v , i) => (
                  <TouchableOpacity onPress={() => {this.goWallet(v)}}  key={ i}>
                    <View style={styles.contentItem} >
                      <Text  style={styles.contentItemText} >
                        {v|| ""}
                      </Text>
                      <View>
                          <Image source={require("./image/arrow-right-account.png")}  style={styles.contentBoxImg}/>
                      </View>
                    </View>
                  </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.show}
                onShow={() => {}}
                onRequestClose={() => {}}
              >
                <View style={styles.modalStyle}>
                  <View style={styles.subView}>
                    <Text style={styles.titleText}>
                      Notice
                    </Text>
                    <Text style={styles.contentText}>
                      {PleaseEnterComplete}
                    </Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.buttonView}>
                      <TouchableOpacity underlayColor='transparent' style={styles.buttonStyle} onPress={() => {this._setModalVisible()}}>
                        <Text style={styles.buttonText}>
                          {PleaseCancel}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.verticalLine} />
                      <TouchableOpacity underlayColor='transparent' style={styles.buttonStyle} onPress={() => {this._setModalVisible()}}>>
                        <Text style={styles.buttonText}>
                          {PleaseSure}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal animationType='slide' transparent={true} visible={this.state.needUpdate} onShow={() => {}} onRequestClose={() => {}} >
                <View style={styleModal.modalStyle}>
                  <View style={styleModal.subView}>
                    <Text style={styleModal.titleText}>{I18n.t("Global Upgrade Notice")}</Text>
                    <Text style={styleModal.contentText}>{I18n.t("Global Upgrade Description")}</Text>
                    <View style={styleModal.horizontalLine} />
                    <View style={styleModal.buttonView}>
                      <TouchableOpacity style={styleModal.buttonStyle} onPress={() => {this.setState({needUpdate:false});this.isHadImportPrivateKey();}}>
                        <Text style={styleModal.buttonText}>{I18n.t("Global Upgrade Later")}</Text>
                      </TouchableOpacity>
                      <View style={styleModal.verticalLine} />
                      <TouchableOpacity style={styleModal.buttonStyle} onPress={() => {this.OpenUpdateUrl()}}>
                        <Text style={styleModal.buttonText}>{I18n.t("Global Upgrade Now")}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View style={{height : 80}}></View>
            </ScrollView>
            <View>
              <TouchableOpacity onPress={this.goSubmit} style={styles.bottomContent}>
                <Text style={styles.buttonSubmit}>{submitKey}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
  }

  isNeedInputPassword = () => {
    if (!isSetLocalStorageAESKey()) {
    } else {
      getEventEmitter().on('checkPasswordSuccess', () => {
        this.isNeedUpdate();
      });
    }
  };

  isNeedUpdate = () => {
    // 判断更新
    const appVersion= '0.0.1';

    fetch('https://api.eosio.sg/upgrade').then((res)=>{
      return res.json()
    }).then((res)=>{
      let newestVersion = res.version;
      this.downLoadUrl = res.download;
      let [a,b,c] = newestVersion.split('.');
      let [x,y,z] = appVersion.split('.');
      let needUpdate = false;
      if(a>x){
        needUpdate = true;
      }else if(a==x){
        if(b>y){
          needUpdate =true;
        }else if(b==y){
          if(c>z){
            needUpdate=true;
          }else if(c<z){
            console.log(`Error version number from api ${newestVersion}`)
          }
        }else{
          console.log(`Error version number from api ${newestVersion}`)
        }
      }else{
        console.log(`Error version number from api ${newestVersion}`)
      }
      this.setState({
        needUpdate
      });
      if (!needUpdate) {
        this.isHadImportPrivateKey();
      }
    }).catch(
      err => {
        console.log(err);
      }
    );
  };

  // 打开升级更新链接
  OpenUpdateUrl = () => {
    Linking.canOpenURL(this.downLoadUrl).then(supported => {
      supported ? Linking.openURL(this.downLoadUrl) : console.log("不支持下载更新");
    }).catch(err => {
      console.log(err);
    });
  };

  isHadImportPrivateKey = () => {
    // 加载私钥
    storage.load({key: "HomePageStorage"}).then( ( ret1 ) => {
      if ( ret1 ) {
        const ret = decryptObject( ret1 );
        if ( ret && ret.accountPrivateKey ) {
          //判断来自哪个页面的跳转
          if ( this.props.navigation.state.params ) {
            this.setState( { key: "" } );
          } else {
            this.props.navigation.navigate( "VoteIndexPage" );
          }
        }
      }
    }).catch( err => {
      console.log(err);
    });
  };

  //go VoteIndexPage
  goWallet = (data) =>{
    storage.save({
      key: 'HomePageStorage',
      data: encryptObjectToString({
        accountName: data,
        accountPrivateKey: this.state.key,
      }),
    }).then(() => {
      this.props.navigation.navigate("VoteIndexPage");
    });
  };

  //submit wallet data
  goSubmit = () =>{
    this.setState({
      ItemData : []
    });

    if (!this.state.key){
      this.setState({
        show : true
      });
      return;
    }

    this.props.onDispatchGetAccountNames(this.state.key);
  };

  //  modal
  _setModalVisible() {
    let isShow = this.state.show;
    this.setState({
      show:!isShow,
    });
  }

}

// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
    return {
        onDispatchGetAccountNames: (data) => dispatch({ type: "HOME_ACCOUNT_NAME" ,data}),

    };
}

function mapStateToProps(state) {
    return {
      accountNames: state.HomePageReducer.accountNames,
      accountNamesErr: state.HomePageReducer.accountNamesErr,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
