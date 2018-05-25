// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, TextInput, Image, TouchableHighlight, Dimensions } from "react-native";

// 自定义组件
import { styles } from "./style";

class HomePage extends Component {
    constructor (props) {
        super(props);
        this.state = {
          TextInputAutoFocus : false,
          mobile : "",

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
                <TouchableHighlight onPress={this.goback}>
                  <Text style={styles.titleText}>Import EOS wallet</Text>
                </TouchableHighlight>
              </View>
              <View>
                <Text style={styles.contentBoxTitle}>Your Account Name</Text>
                <TextInput
                  style={styles.conItemTextInput}
                  placeholder="Hint"
                  autoFocus={this.state.TextInputAutoFocus}
                  placeholderTextColor={"#222"}
                  maxLength={11}
                  onChangeText={(mobile) => this.setState({mobile})}
                  underlineColorAndroid={"transparent"}
                />
                <Text style={styles.contentBoxTitle}>Your Private Key</Text>
                <TextInput
                  style={styles.conItemTextInput}
                  placeholder="Hint"
                  autoFocus={this.state.TextInputAutoFocus}
                  placeholderTextColor={"#fff"}
                  maxLength={11}
                  onChangeText={(mobile) => this.setState({mobile})}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View style={styles.bottomContent}>
                <TouchableHighlight onPress={this.goSubmit} >
                  <Text style={styles.buttonSubmit}>Submit</Text>
                </TouchableHighlight>
              </View>
            </View>
        );
    }



  goback = () =>{
    "use strict";
    console.log("1")
  }

  goSubmit = () =>{
    "use strict";
    console.log("2")
    this.props.navigation.replace("WalletPage");

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
