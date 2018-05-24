// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions } from "react-native";

// 自定义组件
import { styles } from "./style";

class HomePage extends Component {
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
                <ScrollView style={styles.contentBox}>
                  {this.props.allAsset ? this.props.allAsset.map((item) => (
                    <View style={styles.titleBox} key={item.id}>
                      <Text style={styles.titleText}>{item.title}</Text>
                    </View>
                  )) : null}
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
