/**
 * Created by dongjie on 24/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions } from "react-native";
import { getVotingList } from "./getVotingList";
// 自定义组件
import { styles } from "./style";

class VotePage extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps( nextProps ) {
        console.log('nextprops');
        console.log(nextProps.allAsset);
    }
    componentDidMount() {
        // 获取数据
        this.props.onDispatchGetAllVotingList();
    }
    render() {
        console.log('==========');
        console.log(this.props);
        return (
            <View style={styles.bodyBox}>
                <ScrollView style={styles.contentBox}>
                    {this.props.allAsset ? this.props.allAsset.map((item) => (
                            <View style={styles.titleBox} key={item.id}>
                                <Text style={styles.titleText}>{item.title + 'adf'}</Text>
                            </View>
                        )) : null}
                </ScrollView>
            </View>
        );
    }
}

// 挂载中间件到组件；
function mapDispatchToProps() {
    return {
        onDispatchGetAllVotingList: getVotingList,
    };
}
function mapStateToProps(state) {
    console.log('=======');
    console.log(state.VotePageReducer);
    return {
        allAsset: state.VotePageReducer.votingList,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);