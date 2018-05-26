/**
 * Created by dongjie on 24/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions, Modal } from "react-native";
import { getVotingList } from "./saga";
// 自定义组件
import { styles } from "./style";

class VotePage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            noticeShow:false,
            ruleShow:false,
            votingList : [

                {
                    id: 4,
                    title: "canon",
                },
                {
                    id: 5,
                    title: "eos shenzhen",
                },
                {
                    id: 0,
                    title: "eosio.sg",
                },
                {
                    id: 1,
                    title: "meet.one",
                },
                {
                    id: 2,
                    title: "canon",
                },
                {
                    id: 3,
                    title: "eoscananda",
                },
            ]
        };

        this._setDeleteBPC = this._setDeleteBPC.bind(this);

    }

    componentWillReceiveProps( nextProps ) {
        console.log('nextprops: ',nextProps.votingList);
        let votingList = nextProps.votingList;
        this.setState({
            votingList,
        })
    }

    componentDidMount() {
        // 获取数据
        this.props.onDispatchGetAllVotingList();
    }


    render() {

        return (
            <View style={styles.bodyBox}>

                <View style={styles.header}>
                    <Text style={styles.pageTitle}>
                        Vote
                    </Text>
                </View>


            <View style={styles.scrollBodyBox}>
                <ScrollView>
                <View style={styles.contentHeader}>
                    <View style={styles.contentHeaderAccountName}>
                        <Text style={styles.contentHeaderAccountNameLabel}>
                            Account
                        </Text>
                        <Text style={styles.contentHeaderAccountNameValue}>
                            username1324
                        </Text>
                    </View>
                    <View style={styles.contentHeaderAccountName}>
                        <Text style={styles.contentHeaderAccountNameLabel}>
                            Balance
                        </Text>
                        <Text style={styles.contentHeaderAccountNameValue}>
                            249.5827
                            <Text>
                                EOS
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.contentHeaderAccountName}>
                        <Text style={styles.contentHeaderAccountNameLabel}>
                            Stake Count
                        </Text>
                        <Text style={styles.contentHeaderAccountNameValue}>
                            0
                            <Text>
                                EOS
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.contentBodyStake}>
                    <View style={styles.contentBodyStakeHeader}>
                        <Text style={styles.contentBodyStakeHeaderName}>Delegatebw</Text>
                        <View  style={styles.contentBodyStakeHeaderQuestionContainer}>
                            <TouchableHighlight onPress={this._setRuleModalVisible.bind(this)} >
                            <View style={styles.contentBodyStakeHeaderQuestionBox}>
                                <Text style={styles.contentBodyStakeHeaderQuestion}>
                                    ?
                                </Text>
                            </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.contentBodyStakeBody}>
                        <View style={styles.contentBodyStakeCpu}>
                            <Text style={styles.contentBodyStakeBodyTextLabel}>
                                Cpu
                            </Text>
                            <Text style={styles.contentBodyStakeBodyTextValue}>
                                Cpu value
                            </Text>
                        </View>
                        <View style={styles.contentBodyStakeNetwork}>
                            <Text style={styles.contentBodyStakeBodyTextLabel}>
                                Network
                            </Text>
                            <Text style={styles.contentBodyStakeBodyTextValue}>
                                Network value
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contentBodyVotingList}>
                    <View style={styles.contentBodyVotingListHeader}>
                        <Text style={styles.contentBodyVotingListName}>Each node above will get</Text>
                    </View>
                    <View style={styles.contentBodyBPListContainer}>
                    {
                        this.state.votingList.map((votingC, index)=>{
                            return <View key = {votingC.id}
                                         style={styles.contentBodyBP}>
                                <Text style={styles.contentBodyBPName}>
                                    { votingC.title }
                                </Text>
                                <View style={styles.contentBodyBPDeleteContainer}>
                                    <TouchableHighlight id={index}
                                                        onPress={()=>this._setDeleteBPC(index)}>
                                        <View style={styles.contentBodyBPDeleteButton}>
                                            <View style={styles.contentBodyBPDeleteButtonInner}></View>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        })
                    }
                    </View>
                </View>


            </ScrollView>
            </View>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.ruleShow}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={styles.ruleModalStyle}>
                        <View style={styles.ruleSubView}>
                            <Text style={styles.ruleContentText}>
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                            </Text>
                            <View style={styles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._setRuleModalVisible.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        Cancel
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.noticeShow}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                            <Text style={styles.titleText}>
                                Notice
                            </Text>
                            <Text style={styles.contentText}>
                                You could revote, delegatebw or undelegatebw anytime. Vote will use CPU+Network stake.
                            </Text>
                            <View style={styles.horizontalLine} />
                            <View style={styles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._setNoticeModalVisible.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        Cancel
                                    </Text>
                                </TouchableHighlight>
                                <View style={styles.verticalLine} />
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this.goImport}>
                                    <Text style={styles.buttonText}>
                                        OK
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style = {styles.footerView}>
                    <TouchableHighlight onPress={this._submitList.bind(this)}>
                        <Text style={styles.footerSubmit}>
                            Submit
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }



    _submitList() {
        console.log(this.state.votingList);
        this.props.onDispatchVoteVotingList();
    }

    _setDeleteBPC(index){
        let votingList = [].concat(this.state.votingList);
        votingList.splice(index,1);
        this.setState({
            votingList
        })
    }

    // 显示/隐藏 modal
    _setRuleModalVisible() {
        let isShow = this.state.ruleShow;
        this.setState({
            ruleShow:!isShow,
        });
    }
    // 显示/隐藏 modal
    _setNoticeModalVisible() {
        let isShow = this.state.noticeShow;
        this.setState({
            noticeShow:!isShow,
        });
    }

}

// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
    return {
         onDispatchGetAllVotingList: () => dispatch({ type: "VOTE_GETLIST_POST" ,data: [{id:1,title:'hi'}]}),
         // onDispatchVoteVotingList: () => dispatch({ type: "VOTE_LIST_POST", data: this.state.votingList }),
    };
}
function mapStateToProps(state) {
    return {
        votingList: state.VotePageReducer.votingList,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);