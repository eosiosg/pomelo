// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions } from "react-native";

// 自定义组件
import { styles, assetStyles } from "./style";

class VoteIndexPage extends Component {
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
                  <View style={styles.contentTitleBox}>
                    <Text style={styles.contentTitle}>EOS</Text>
                  </View>
                  <View style={assetStyles.assetBox}>
                    <View style={assetStyles.totalAssetBox}>
                      <View style={assetStyles.userNameBox}>
                        <Text style={assetStyles.userNameTip}>
                          userName:  <Text style={assetStyles.userName}>Maroon 5</Text>
                        </Text>
                      </View>
                      <View style={assetStyles.userTotalAssetBox}>
                        <Text style={assetStyles.userTotalAssetTip}>Total Asset</Text>
                        <Text style={assetStyles.userTotalAssetValue}>
                          12344.00 <Text style={assetStyles.userTotalAssetValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <Text style={assetStyles.userTotalAssetByUsd}>~$1224.24</Text>
                    </View>
                    <View style={assetStyles.assetItemBox}>
                      <View style={assetStyles.itemBox}>
                        <Text style={assetStyles.itemName}>
                          Refunding <Text style={assetStyles.refundingTime}>2d23h</Text>
                        </Text>
                        <Text style={assetStyles.itemValue}>
                          12345.00 <Text style={assetStyles.itemValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <View style={assetStyles.itemBox}>
                        <Text style={assetStyles.itemName}>Balance</Text>
                        <Text style={assetStyles.itemValue}>
                          12345.00 <Text style={assetStyles.itemValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <View style={[assetStyles.itemBox, {borderBottomWidth: 0,}]}>
                        <Text style={assetStyles.itemName}>RAM bytes</Text>
                        <Text style={assetStyles.itemValue}>12345.00</Text>
                      </View>
                    </View>
                  </View>
                  {/*{this.props.allAsset ? this.props.allAsset.map((item) => (*/}
                    {/*<View style={styles.titleBox} key={item.id}>*/}
                      {/*<Text style={styles.titleText}>{item.title}</Text>*/}
                    {/*</View>*/}
                  {/*)) : null}*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(VoteIndexPage);
