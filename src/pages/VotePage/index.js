/**
 * Created by dongjie on 24/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions } from "react-native";
import { getVotingList } from "./saga";
// 自定义组件
import { styles } from "./style";

class VotePage extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps( nextProps ) {
        console.log('nextprops: ',nextProps);
    }
    componentDidMount() {
        // 获取数据
        this.props.onDispatchGetAllVotingList();
    }
    render() {
        console.log('=====vote props=====');
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
function mapDispatchToProps(dispatch) {
    return {
        onDispatchGetAllVotingList: () => dispatch( { type: "VOTE_LIST_REDUCER" } ),
    };
}
function mapStateToProps(state) {
    return {
        allAsset: state.VotePageReducer.votingList,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);