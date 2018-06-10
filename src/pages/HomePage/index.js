// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, Dimensions, Modal, AlertIOS, SafeAreaView, Linking, Switch } from "react-native";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";
var compareVersions = require('compare-versions');
import  { updatingDetectURL, versionNumber, getNetInfoURL } from '../../../config/configParams' ;
// 自定义组件
import { styles } from "./style";
import { getEventEmitter, isSetLocalStorageAESKey } from "../../setup";
import {ModalYNStyles as styleModal} from "../../style/style";


const MAINNET = require('../../images/mainnet.png');
const TESTNET = require('../../images/testnet.png');

export const MAIN_NET_NAME = 'mainNetInfo';
export const TEST_NET_NAME = 'testNetInfo';

class HomePage extends Component {

  static navigationOptions = ( props ) => {
      const { navigation } = props;
      const { state, setParams } = navigation;
      const { params } = state;
      return {

          headerLeft:null,
          title: I18n.t( "HomePage importWallet" ),
      };
  };

  constructor (props) {
        super(props);
        this.state = {
          TextInputAutoFocus : true,
          name : "",
          show : false,
          ItemData :[],
          accountPrivateKey : "",
          walletValue : "",
          biometryType: null,
          needUpdate:false,
            netChosen:null,
            showTestAlert:false,
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
   if(!this.state.netChosen){
     this.setState({
         netChosen :  nextProps.defaultNet
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

    const getBorderWidth = (netName) => {
        if(this.state.netChosen){
            return netName == this.state.netChosen?1:0
        }else if(this.props.defaultNet){
            return this.props.defaultNet == netName?1:0
        }else{
            return 0
        }
    }

    return (
        <SafeAreaView style={[{flex:1}]}>
          <View style={styles.bodyBox}>
            <ScrollView>
              <View style={styles.netContainer}>
                      <TouchableOpacity style={[styles.netButtonContainer,{borderWidth:getBorderWidth(MAIN_NET_NAME)}]}
                                        disable={this.props.mainNetInfo.chain_id}
                                        onPress={() => {this.setNet(MAIN_NET_NAME)}}>
                          <View style={styles.netNameContainer}>
                              <Text style={styles.netName}>{this.props.mainNetInfo.name}</Text>
                          </View>
                          <View style={styles.netImageContainer}>
                              <Image source={MAINNET}  style={styles.netImg}/>
                          </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.netButtonContainer,{marginLeft:10},{borderWidth:getBorderWidth(TEST_NET_NAME)}]}
                                        onPress={() => {this.setNet(TEST_NET_NAME)}}>
                          <View style={styles.netNameContainer} >
                              <Text style={styles.netName}>{this.props.testNetInfo.name}</Text>
                          </View>
                          <View style={styles.netImageContainer}>
                              <Image source={TESTNET}  style={styles.netImg}/>
                          </View>
                      </TouchableOpacity>

              </View>


              <View>
                <Text style={styles.contentBoxTitle}>{privateKeyIntl}</Text>
                <TextInput
                  style={styles.conItemTextInput}
                  placeholder={Hint}
                  placeholderTextColor={"#999"}
                  onChangeText={(accountPrivateKey) => this.setState({accountPrivateKey})}
                  value={this.state.accountPrivateKey}
                  underlineColorAndroid={"transparent"}
                />
              </View>

                {
                    this.props.accountNames&&<View  style={{display : this.props.accountNames.length > 0 ? "flex" : "none"}}>
                        <Text style={styles.contentItemTitle}>{choiceAccountIntl}</Text>
                        <View style={styles.contentItemBox}>
                            {this.props.accountNames.map((v , i) => (
                                <TouchableOpacity onPress={() => {this.goWallet(v)}}  key={ i}>
                                    <View style={styles.contentItem} >
                                        <Text  style={styles.contentItemText} >
                                            {v||""}
                                        </Text>
                                        <View>
                                            <Image source={require("./image/arrow-right-account.png")}  style={styles.contentBoxImg}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                }

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


                <Modal animationType='slide'
                       transparent={true}
                       onShow={() => {}}
                       onRequestClose={() => {}}
                       visible={this.state.showTestAlert} >
                    <View style={styleModal.modalStyle}>
                        <View style={styleModal.subView}>
                            <Text style={styleModal.titleText}>{I18n.t("HomePage Testnet Dialog Title")}</Text>
                            <Text style={styleModal.contentText}>{I18n.t("HomePage Testnet Dialog Desc")}</Text>
                            <View style={styleModal.horizontalLine} />
                            <View style={styleModal.buttonView}>
                                <TouchableOpacity style={styleModal.buttonStyle} onPress={() => {this.setState({showTestAlert:false})}}>
                                    <Text style={styleModal.buttonText}>{I18n.t("HomePage Testnet Dialog Cancel")}</Text>
                                </TouchableOpacity>
                                <View style={styleModal.verticalLine} />
                                <TouchableOpacity style={styleModal.buttonStyle} onPress={() => {this.OpenVoteWeb()}}>
                                    <Text style={styleModal.buttonText}>{I18n.t("HomePage Testnet Dialog OK")}</Text>
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

  setNet = (netChosen) => {
      if(netChosen==MAIN_NET_NAME&&!this.props.mainNetInfo.chain_id){
          Toast.show(I18n.t('HomePage Mainnet not ready'),{position:30})
          return
      }
      let clickTestNet = false;
      if(netChosen==TEST_NET_NAME){
          clickTestNet = true
      }
      let currentNet = this.state.netChosen;
      var accountPrivateKey = this.state.accountPrivateKey;
      if(netChosen !== currentNet){
          accountPrivateKey = '';
          this.props.onDispatchDelAccountNames();
      }
      console.log('aaadf',netChosen),
      this.setState({
          netChosen,
          accountPrivateKey,
          showTestAlert : clickTestNet
      })
  }

    OpenUpdateUrl = () => {
        this.setState({
            showTestAlert : false
        })
        Linking.canOpenURL(this.downLoadUrl).then(supported => {
            supported ? Linking.openURL(this.downLoadUrl) : '';
        }).catch(err => {
            console.log(err);
        });
    };


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
  OpenVoteWeb = () => {
    Linking.canOpenURL('http://vote.eosio.sg/').then(supported => {
      supported ? Linking.openURL('http://vote.eosio.sg/') : '';
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
            this.setState( { accountPrivateKey: "" } );
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
        accountPrivateKey: this.state.accountPrivateKey,
      }),
    }).then(() => {
        // this.setState({ItemData:[]});
        this.props.onDispatchDelAccountNames();
      this.props.navigation.navigate("VoteIndexPage");
    });
  };

  //submit wallet data
  goSubmit = () =>{
      if(!this.state.netChosen){
          Toast.show(I18n.t('HomePage Choose one net'),{position:30})
          return
      }

      this.props.onDispatchDelAccountNames();

    let whichNet = this.state.netChosen;
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

    this.props.onDispatchGetAccountNames(this.state.accountPrivateKey);
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
        onDispatchDelAccountNames: () => dispatch({ type: "HOME_DELACCOUNTNAMES_REDUCER" }),
    };
}

function mapStateToProps(state) {
    return {
      accountNames: state.HomePageReducer.accountNames,
      mainNetInfo: state.HomePageReducer.mainNetInfo,
      testNetInfo: state.HomePageReducer.testNetInfo,
        defaultNet: state.HomePageReducer.defaultNet,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


const getUrl = (nodeAddressList) => {
    nodeAddressList.sort(function(a, b){return 0.5 - Math.random()});
    return  nodeAddressList[0]
}
