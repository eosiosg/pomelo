/**
 * Created by dongjie on 24/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { injectIntl } from 'react-intl';
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions, Modal } from "react-native";
// 自定义组件
import { styles } from "./style";
import messages from './messages';

class VotePage extends Component {
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
            noticeShow:false,
            ruleShow:false,
            votingList : []
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
        const { account_name, cpu_weight, net_weight, total_resources, } = this.props.accountInfo;
        const { ram_bytes } = total_resources;
        const stake = net_weight + cpu_weight;
        const CurrencyBalance = this.props.CurrencyBalance;
        const BPs = this.props.BPs;
        const { intl } = this.props;
        const account = intl.formatMessage(messages.account);
        const balance = intl.formatMessage(messages.balance);
        const stakeN = intl.formatMessage(messages.stake);
        const cancel = intl.formatMessage(messages.cancel);
        const rule = intl.formatMessage(messages.rule);
        const delegatebw = intl.formatMessage(messages.delegatebw);

        // const VoteDescIntl = intl.formatMessage(messages.VoteDesc);
        // const UndelegatebwIntl = intl.formatMessage(messages.Undelegatebw);
        // const AddDelegatebwIntl = intl.formatMessage(messages.AddDelegatebw);
        // const RevoteIntl = intl.formatMessage(messages.Revote);
        // const VotedBpsIntl = intl.formatMessage(messages.VotedBps);



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
                            {account}
                        </Text>
                        <Text style={styles.contentHeaderAccountNameValue}>
                            {account_name||'default'}
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
                        <Text style={styles.contentBodyVotingListName}>Each node bellow will get {1234*2**((new Date().getTime() - new Date(2000,0,1).getTime())/1000/(3600*24*365))} votes</Text>
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
                                {rule}
                            </Text>
                            <View style={styles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._setRuleModalVisible.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        {cancel}
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
                                        {cancel}
                                    </Text>
                                </TouchableHighlight>
                                <View style={styles.verticalLine} />
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._submitList.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        OK
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
                            Submit
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
        this.props.onDispatchVoteVotingList(this.state.votingList);
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
         onDispatchGetAllVotingList: () => dispatch({ type: "VOTE_GETLIST_POST" ,data: [{id:1,title:'hi'}]}),
         onDispatchVoteVotingList: (data) => dispatch({ type: "VOTE_SUBMITLIST_POST", data }),
    };
}
function mapStateToProps(state) {
    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        CurrencyBalance: state.VoteIndexPageReducer.CurrencyBalance,
        Refunds: state.VoteIndexPageReducer.Refunds,
        BPs: state.VoteIndexPageReducer.BPs,
        USD: state.VoteIndexPageReducer.USD,

        votingList: state.VotePageReducer.votingList,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VotePage));