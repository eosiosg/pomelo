/**
 * Created by dongjie on 24/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { injectIntl } from 'react-intl';
import { ScrollView, View, Text, Image, TouchableHighlight,SafeAreaView, TouchableOpacity, Dimensions, Modal } from "react-native";
// 自定义组件
import { styles, navStyles } from "./style";
import messages from './messages';

import LoadingView from './components/loading'

class VotePage extends Component {
    static navigationOptions = ( props ) => {
        // const { navigation } = props;
        // const { state, setParams } = navigation;
        // const { params } = state;

        return {
            title: 'Vote'
        };
    };


    constructor (props) {
        super(props);

        this.state = {
            noticeShow:false,
            ruleShow:false,
            votingList : []
        };

        this._setDeleteBPC = this._setDeleteBPC.bind(this);

    }

    componentWillReceiveProps( nextProps ) {
        let votingList = nextProps.selectedNodeList;
        this.setState({
            votingList,
        })
    }

    componentDidMount() {
        let votingList = this.props.selectedNodeList;
        this.setState({
            votingList,
        })
    }


    render() {
        let { account_name, cpu_weight, net_weight } = this.props.accountInfo;
        let stake = parseFloat((net_weight + cpu_weight)/10000).toFixed(4);
        cpu_weight = parseFloat(cpu_weight/10000).toFixed(4);
        net_weight = parseFloat(net_weight/10000).toFixed(4);
        const CurrencyBalance = this.props.CurrencyBalance;

        const { intl } = this.props;
        const account = intl.formatMessage(messages.account);
        const balance = intl.formatMessage(messages.balance);
        const stakeN = intl.formatMessage(messages.stake);
        const cancel = intl.formatMessage(messages.cancel);
        const gotIt = intl.formatMessage(messages.gotIt);
        const confirm = intl.formatMessage(messages.confirm);
        const bpList = intl.formatMessage(messages.bpList);
        const submit = intl.formatMessage(messages.submit);
        const delegatebw = intl.formatMessage(messages.delegatebw);
        const notice = intl.formatMessage(messages.notice);
        const noticeC = intl.formatMessage(messages.noticeC);
        const RuleT = intl.formatMessage(messages.RuleT);
        const Rule1 = intl.formatMessage(messages.Rule1);
        const Rule2 = intl.formatMessage(messages.Rule2);
        const Rule3 = intl.formatMessage(messages.Rule3);
        const Rule4 = intl.formatMessage(messages.Rule4);

        // const VoteDescIntl = intl.formatMessage(messages.VoteDesc);
        // const UndelegatebwIntl = intl.formatMessage(messages.Undelegatebw);
        // const AddDelegatebwIntl = intl.formatMessage(messages.AddDelegatebw);
        // const RevoteIntl = intl.formatMessage(messages.Revote);
        // const VotedBpsIntl = intl.formatMessage(messages.VotedBps);

        this.account_name = account_name;


        return (
            <View style={styles.bodyBox}>
                {/*<View style={navStyles.navBox}>*/}
                    {/*<View style={navStyles.navItem}>*/}
                        {/*<TouchableOpacity onPress={() => {this.props.navigation.goBack();}}>*/}
                            {/*<Image style={{width: 24, height: 24,}}*/}
                                   {/*source={require("../../images/arrow-left-account.png")} />*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                    {/*<Text style={styles.pageTitle}>*/}
                        {/*Vote*/}
                    {/*</Text>*/}
                {/*</View>*/}


            <View style={styles.scrollBodyBox}>
                <ScrollView>

                <View style={styles.contentHeader}>
                    <View style={styles.contentHeaderAccountName}>
                        <Text style={styles.contentHeaderAccountNameLabel}>
                            {account}
                        </Text>
                        <Text style={styles.contentHeaderAccountNameValue}>
                            {account_name||'none'}
                        </Text>
                    </View>
                    <View style={styles.contentHeaderBalance}>
                        <Text style={styles.contentHeaderAccountNameLabel}>
                            {balance}
                        </Text>
                        <Text style={styles.contentHeaderBalanceValueContainer}>
                            <Text style={styles.contentHeaderBalanceValue}>
                                {CurrencyBalance||123345}
                            </Text>
                            <View style={styles.contentHeaderEOSSignContainer}>
                                <Text style={styles.contentHeaderEOSSign}>
                                    EOS
                                </Text>
                            </View>
                        </Text>
                    </View>
                    <View style={styles.contentHeaderStake}>
                        <Text style={styles.contentHeaderAccountNameLabel}>
                            {stakeN}
                        </Text>
                        <Text style={styles.contentHeaderBalanceValueContainer}>
                            <Text style={styles.contentHeaderBalanceValue}>
                                {stake||0}
                            </Text>
                            <View style={styles.contentHeaderEOSSignContainer}>
                                <Text style={styles.contentHeaderEOSSign}>
                                    EOS
                                </Text>
                            </View>
                        </Text>
                    </View>
                </View>

                <View style={styles.contentBodyStake}>
                    <View style={styles.contentBodyStakeHeader}>
                        <Text style={styles.contentBodyStakeHeaderName}>{delegatebw}</Text>
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
                                CPU
                            </Text>
                            <Text style={styles.contentBodyStakeBodyTextValue}>
                                {cpu_weight}
                            </Text>
                        </View>
                        <View style={styles.contentBodyStakeNetwork}>
                            <Text style={styles.contentBodyStakeBodyTextLabel}>
                                Network
                            </Text>
                            <Text style={styles.contentBodyStakeBodyTextValue}>
                                {net_weight}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contentBodyVotingList}>
                    <View style={styles.contentBodyVotingListHeader}>
                        <Text style={styles.contentBodyVotingListName}>
                            {bpList}
                            {/*Each node bellow will get {1234*2**((new Date().getTime() - new Date(2000,0,1).getTime())/1000/(3600*24*365))} votes*/}
                        </Text>
                    </View>
                    <View style={styles.contentBodyBPListContainer}>
                    {
                        this.state.votingList.map((votingC, index)=>{
                            return <View key = {index}
                                         style={styles.contentBodyBP}>
                                <Text style={styles.contentBodyBPName}>
                                    { votingC.owner }
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
                                {RuleT}
                            </Text>
                            <Text style={styles.ruleContentText}>
                                {Rule1}
                            </Text>
                            <Text style={styles.ruleContentText}>
                                {Rule2}
                            </Text>
                            <Text style={styles.ruleContentText}>
                                {Rule3}
                            </Text>
                            <Text style={styles.ruleContentText}>
                                {Rule4}
                            </Text>
                            <View style={styles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._setRuleModalVisible.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        {gotIt}
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
                                {notice}
                            </Text>
                            <Text style={styles.contentText}>
                                {noticeC}
                            </Text>
                            <View style={styles.horizontalLine} />
                            <View style={styles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._setNoticeModalVisible.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        {cancel}
                                    </Text>
                                </TouchableHighlight>
                                <View style={styles.verticalLine} />
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._submitList.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        {confirm}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style = {styles.footerView}>
                    <TouchableHighlight  style = {styles.footerViewTouchArea}
                                         onPress={this._setNoticeModalShow.bind(this)}>
                        <Text style={styles.footerSubmit}>
                            {submit}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }


    _setNoticeModalShow(){
        this.setState({
            noticeShow:true,
        });
    }

    _submitList() {

        let votingList = [];
        this.state.votingList.map((one)=>{
            votingList.push(one.owner)
        })
        let account_name = this.account_name;
        this.props.onDispatchVoteVotingList({account_name,votingList});
        this.setState({
            noticeShow:false,
        });
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
         onDispatchVoteVotingList: (data) => dispatch({ type: "VOTE_SUBMITLIST_POST", data }),
    };
}
function mapStateToProps(state) {
    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        CurrencyBalance: state.VoteIndexPageReducer.CurrencyBalance,
        BPs: state.VoteIndexPageReducer.BPs,
        selectedNodeList : state.NodeListPageReducer.selectedNodeList,

        votingList: state.VotePageReducer.votingList,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VotePage));