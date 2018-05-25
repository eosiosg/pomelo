// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions } from "react-native";

// 自定义组件
import { styles } from "./style";

class WalletPage extends Component {
    constructor (props) {
        super(props);
        this.state = {};
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
                  <Text style={styles.titleText}>Change Wallet</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.contentMain}>
                <Text style={styles.ContentTitleText}>EOS</Text>
                <View style={styles.ContentBg}>
                  <Text style={styles.ContentBgTopText}>userName1213</Text>
                  <View style={styles.ContentBgMid}>
                    <Text style={styles.ContentBgMidText}>Total Assets</Text>
                    <View style={styles.ContentBgMidBack}>
                      <Text style={styles.ContentBgMidAccount}>3223.00</Text> <Text style={styles.ContentBgMidName}>EOS</Text>
                    </View>
                  </View>
                  <View style={styles.ContentBgBottom}>
                    <Text style={styles.ContentBgBottomText}>= $23132</Text>
                  </View>
                </View>
              </View>
            </View>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);
