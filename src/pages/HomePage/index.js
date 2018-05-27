// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import Eos from "eosjs"
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, TextInput, Image, TouchableHighlight, Dimensions ,Modal ,CheckBox ,TouchableOpacity} from "react-native";
import { localSave } from "../../utils/storage";
import { EOSInit ,  } from "./../../actions/EosAction"
import TouchID from 'react-native-touch-id'

// 自定义组件
import { styles } from "./style";

class HomePage extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            header: null
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

        };
    }
    componentWillReceiveProps( nextProps ) {
      console.log('home:',nextProps.accountNames);
     if(nextProps.accountNames){
       this.setState({
         ItemData :  nextProps.accountNames
       })
     }
    }
    componentDidMount() {
        // 获取数据
      const optionalConfigObject = {
        title: "Authentication Required", // Android
        color: "#e00606", // Android,
        fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
      }

      TouchID.authenticate('to demo this react-native component', optionalConfigObject)
        .then(success => {
          //AlertIOS.alert('Authenticated Successfully');
        })
        .catch(error => {
          //AlertIOS.alert('Authentication Failed');
        });
    }
    render() {

      return (
            <View style={styles.bodyBox}>
              <ScrollView>
                <View style={styles.contentBox}>
                  <TouchableHighlight onPress={() => {this.props.navigation.goBack();}} style={{flex : 1}}>
                    <Image source={require("./image/arrow-left-account.png")}  style={styles.contentBoxImg}/>
                  </TouchableHighlight>
                  <View  style={{flex : 3}}>
                    <Text style={styles.titleTextTop}>Import EOS wallet</Text>
                  </View>
                  <View style={{flex : 1}}>

                  </View>
                </View>
                <View>
                  <Text style={styles.contentBoxTitle}>Your Private Key</Text>
                  <TextInput
                    style={styles.conItemTextInput}
                    placeholder="Please enter"
                    placeholderTextColor={"#222"}
                    onChangeText={(key) => this.setState({key})}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View  style={{display : this.state.ItemData.length > 0 ? "flex" : "none"}}>
                  <Text style={styles.contentItemTitle}>Choice an account name</Text>
                  <View style={styles.contentItemBox}>
                    {this.state.ItemData.map((v , i) => (
                      <View style={styles.contentItem} key={ i}>
                        <Text  style={styles.contentItemText}>
                          {v|| ""}
                        </Text>
                        <View>
                          <TouchableHighlight onPress={() => {this.goWallet(v)}}>
                            <Image source={require("./image/arrow-right-account.png")}  style={styles.contentBoxImg}/>
                          </TouchableHighlight>
                        </View>
                      </View>
                    ))}
                    {/*
                     <Text style={styles.contentItemNo}>
                     No account name
                     </Text>
                    */}
                  </View>


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
              </ScrollView>
              <View>
                <TouchableOpacity onPress={this.goSubmit} style={styles.bottomContent}>
                  <Text style={styles.buttonSubmit}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }


  //back last page
  goback = () =>{
    window.history.back();
  }


  goWallet = (data) =>{
    console.log("data:",data)
    localSave.setAccountName(data);
    //this.props.navigation.replace("WalletPage");
    this.props.navigation.navigate("WalletPage", {data});
  }
  //submit wallet data
  goSubmit = () =>{
    if (!this.state.key){
      this.setState({
        show : true
      })
      return
    }
    this.props.onDispatchGetAccountNames(this.state.key);
    //this.props.navigation.replace("WalletPage");
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
        onDispatchGetAccountNames: (data) => dispatch({ type: "HOME_ACCOUNT_NAME" ,data}),
    };
}
function mapStateToProps(state) {
    return {
      accountNames: state.HomePageReducer.accountNames,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
