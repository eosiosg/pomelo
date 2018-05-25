// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import Eos from "eosjs"
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, TextInput, Image, TouchableHighlight, Dimensions ,Modal } from "react-native";
import { localSave } from "../../utils/storage";

// 自定义组件
import { styles } from "./style";

class HomePage extends Component {
    constructor (props) {
        super(props);
        this.state = {
          TextInputAutoFocus : true,
          name : "",
          key : "" ,
          show : false
        };
    }
    componentWillReceiveProps( nextProps ) {
      console.log(nextProps.allAsset);
    }
    componentDidMount() {
        // 获取数据
        this.props.onDispatchGetAllAssetPost();
    }
    render() {
        return (
            <View style={styles.bodyBox}>
              <View style={styles.contentBox}>
                <TouchableHighlight onPress={() => {this.props.navigation.goBack();}}>
                  <Image source={require("./image/arrow-left-account.png")}  style={styles.contentBoxImg}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.goback}>
                  <Text style={styles.titleTextTop}>Import EOS wallet</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.go}>
                  <Text></Text>
                </TouchableHighlight>
              </View>
              <View>
                <Text style={styles.contentBoxTitle}>Your Account Name</Text>
                <TextInput
                  style={styles.conItemTextInput}
                  placeholder="Please enter"
                  autoFocus={this.state.TextInputAutoFocus}
                  placeholderTextColor={"#222"}
                  maxLength={11}
                  onChangeText={(name) => this.setState({name})}
                  underlineColorAndroid={"transparent"}
                />
                <Text style={styles.contentBoxTitle}>Your Private Key</Text>
                <TextInput
                  style={styles.conItemTextInput}
                  placeholder="Please enter"
                  placeholderTextColor={"#222"}
                  onChangeText={(key) => this.setState({key})}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View style={styles.bottomContent}>
                <TouchableHighlight onPress={this.goSubmit} >
                  <Text style={styles.buttonSubmit}>Submit</Text>
                </TouchableHighlight>
              </View>

              <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.show}
                onShow={() => {}}
                onRequestClose={() => {}} >
                <View style={styles.modalStyle}>
                  <View style={styles.subView}>
                    <Text style={styles.titleText}>
                      Notice
                    </Text>
                    <Text style={styles.contentText}>
                      Please enter the complete
                    </Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.buttonView}>
                      <TouchableHighlight underlayColor='transparent'
                                          style={styles.buttonStyle}
                                          onPress={this._setModalVisible.bind(this)}>
                        <Text style={styles.buttonText}>
                          cancle
                        </Text>
                      </TouchableHighlight>
                      <View style={styles.verticalLine} />
                      <TouchableHighlight underlayColor='transparent'
                                          style={styles.buttonStyle}
                                          onPress={this._setModalVisible.bind(this)}>
                        <Text style={styles.buttonText}>
                          ok
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
        );
    }


  //back last page
  goback = () =>{
    "use strict";

  }
  //submit wallet data
  goSubmit = () =>{
    "use strict";
    if (!this.state.key || !this.state.name){
      this.setState({
        show : true
      })
      return
    }
    let {ecc} = Eos.modules
    let accountPublicKey = ecc.privateToPublic(this.state.key);
    let nodeAddress = 'http://13.229.70.163:8888';

    console.log("accountPublicKey：",accountPublicKey);
    localSave.setAccountPublicKey(accountPublicKey);

//    let config = {
//      keyProvider: this.state.key, // WIF string or array of keys..
//      httpEndpoint: nodeAddress,
////    mockTransactions: () => 'pass', // or 'fail'
////    transactionHeaders: (expireInSeconds, callback) => {
////      callback(null/*error*/, headers)
////    },
//      expireInSeconds: 60,
//      broadcast: true,
//      debug: false,
//      sign: true
//    };
//
//    let eos = Eos.Testnet(config);
//    console.log("eos:",eos);

    //this.props.navigation.replace("WalletPage");

  }
  go = ()=>{

  }
  // 显示/隐藏 modal
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
        onDispatchGetAllAssetPost: () => dispatch({ type: "HOME_GETALLASSET_POST" }),
    };
}
function mapStateToProps(state) {
    return {
        allAsset: state.HomePageReducer.allAsset,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
