// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, Dimensions, Modal, AlertIOS, SafeAreaView, Linking, Switch } from "react-native";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import Toast from "react-native-root-toast";
import Icon from "react-native-vector-icons/Ionicons";
import I18n from "../../../I18n";
var compareVersions = require('compare-versions');
import  { updatingDetectURL, versionNumber, getNetInfoURL } from '../../../config/configParams' ;
import { Radio} from 'antd-mobile';
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
          whichNet:"",
          show : false,
          ItemData :[],
          accountPrivateKey : "",
          walletValue : "",
          biometryType: null,
          needUpdate:false,
            netChosen:'',
        };

        fetch(getNetInfoURL).then((res)=>{
            return res.json()
        }).then((res)=>{
            this.props.onDispatchMainNetInfo(res);
        }).catch(err=>{
            console.log('err',err);
        })
    }

  componentWillReceiveProps( nextProps ) {
   if(nextProps.accountNames){
     this.setState({
       ItemData :  nextProps.accountNames.account_names
     })
   }
  }

  componentWillMount() {
        this.isNeedInputPassword();
      getEventEmitter().on('checkPasswordSuccess', () => {
          this.isNeedUpdate();
          this.isHadImportPrivateKey();
      });
  }
  componentDidMount() {

  }

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
              <View style={{}}>
                  <TouchableOpacity disable={this.props.mainNetInfo.domains.length} onPress={() => {this.checkNet('mainNetInfo')}}>
                      <Icon
                          style={[ {
                              marginLeft: 10,
                          } ]}
                          name={this.state.netChosen == 'mainNetInfo' ? 'md-radio-button-on' : 'md-radio-button-off'}
                          size={33}
                          color={!this.props.mainNetInfo.domains.length?'blue':'red'}>
                      </Icon>
                      <View style={{flex:1}}>
                          <Text>Main Net</Text>
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {this.checkNet('testNetInfo')}}>
                      <Icon
                          style={[ {
                              marginLeft: 10,
                          } ]}
                          name={this.state.netChosen == 'testNetInfo' ? 'md-radio-button-on' : 'md-radio-button-off'}
                          size={33}
                          color={'blue'}>
                      </Icon>
                      <View style={{flex:1}}>
                          <Text>tesst Net</Text>
                      </View>

                  </TouchableOpacity>

              </View>
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
                      <TouchableOpacity style={styleModal.buttonStyle} onPress={() => {this.setState({needUpdate:false})}}>
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
            <TouchableOpacity style={styles.bottomContent} onPress={this.goSubmit}>
              <Text style={styles.buttonSubmit}>{submitKey}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
  }

  checkNet = (netChosen) => {
      this.setState({
          netChosen,
      })
  }

  isNeedInputPassword = () => {
    if (!isSetLocalStorageAESKey()) {
      this.props.navigation.navigate("PasswordInputPage")
    }
  };

  isNeedUpdate = () => {
    // 判断更新
    const appVersion= versionNumber;

    fetch(updatingDetectURL).then((res)=>{
      return res.json()
    }).then((res)=>{
      let newestVersion = res.version;
      this.downLoadUrl = res.download;

      let compareResult = compareVersions(appVersion,newestVersion);
      let needUpdate = compareResult<0;
      this.setState({
        needUpdate
      });
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
          netChosen:this.state.netChosen,
        accountName: data,
        accountPrivateKey: this.state.key,
      }),
    }).then(() => {

      this.props.navigation.navigate("VoteIndexPage");
    });
  };

  //submit wallet data
  goSubmit = () =>{
      console.log('aaaaaaaaaaaaaaa');
      if(!this.state.netChosen){
          Toast.show('Please selet net',{position:30})
          return
      }

    this.setState({
      ItemData : []
    });

    if (!this.state.key){
      this.setState({
        show : true
      });
      return;
    }

    console.log(this.state.netChosen);
      console.log('above is net chosen');

      let whichNet = this.state.netChosen;
      console.log(this.props[whichNet]);
    if(!this.props[whichNet]){
        return
    }
    let url = getUrl(this.props[whichNet]['domains']);
    storage.save({
          key: 'HomePageNetStorage',
          data: {
              chain_id: this.props[whichNet]['chain_id'],
              netURL: url
          }
      })

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
        onDispatchMainNetInfo: (data) => dispatch({ type: "HOME_MAINNETINFO_REDUCER" ,data}),

    };
}

function mapStateToProps(state) {
    return {
      accountNames: state.HomePageReducer.accountNames,
      mainNetInfo: state.HomePageReducer.mainNetInfo,
      testNetInfo: state.HomePageReducer.testNetInfo,
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);




const getUrl = (nodeAddressList) => {
    nodeAddressList.sort(function(a, b){return 0.5 - Math.random()});
    return  nodeAddressList[0]
}


// "plugins": [
//     ["import", {
//         "style" : "css",
//         "libraryName": "antd-mobile"
//     }]
// ]