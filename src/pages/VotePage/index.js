/**
 * Created by dongjie on 24/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, Image, TouchableHighlight, SafeAreaView, TouchableOpacity, Dimensions, Modal } from "react-native";
// 自定义组件
import { styles } from "./style";
import messages from './messages';
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";
import LoadingView from '../../commonComponents/loading'

class VotePage extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: I18n.t('VotePage vote')
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
        });
      let IsSubmitSuccess = nextProps.IsSubmitSuccess;

      // console.log("is submit success value IsSubmitSuccess: ",IsSubmitSuccess, " this.props.IsSubmitSuccess: ",this.props.IsSubmitSuccess)
      if (IsSubmitSuccess && IsSubmitSuccess != this.props.IsSubmitSuccess) {
        // 投票成功，重新获取AccountInfo，重置IsSubmitSuccess

          this.props.onDispatchGetVoteBpsPost({...this.state.accountPri})
          this.props.getAccountInfo({...this.state.accountPri});
      }
    }

    componentDidMount() {
        let votingList = this.props.selectedNodeList;
        storage.load({key: "HomePageStorage"}).then( ( ret1 ) => {
            if ( ret1 ) {
                const ret = decryptObject( ret1 );
                const accountPrivateKey = ret.accountPrivateKey;
                const accountName = ret.accountName;
                data = {
                    accountPrivateKey,
                    accountName,
                };
                this.setState({
                    accountPri: data,
                    votingList
                })
            }else{
                this.setState({
                    accountPri: {},
                    votingList
                })
            }
        });
    }


    render() {
        let { account_name,total_resources } = this.props.accountInfo;
        total_resources = total_resources||{cpu_weight: '0 EOS', net_weight: '0 EOS'};
        let cpu_weight = total_resources.cpu_weight||'0 EOS';
        let net_weight = total_resources.net_weight||'0 EOS';
        cpu_weight = parseFloat(cpu_weight.replace(' EOS', ''));
        net_weight = parseFloat(net_weight.replace(' EOS', ''));
        let stake = parseFloat(net_weight + cpu_weight).toFixed(4);
        cpu_weight = parseFloat(cpu_weight).toFixed(4);
        net_weight = parseFloat(net_weight).toFixed(4);
        const CurrencyBalance = parseFloat(this.props.CurrencyBalance).toFixed(4);

        const account = I18n.t(messages.account.id);
        const balance = I18n.t(messages.balance.id);
        const stakeN = I18n.t(messages.stake.id);
        const cancel = I18n.t(messages.cancel.id);
        const gotIt = I18n.t(messages.gotIt.id);
        const confirm = I18n.t(messages.confirm.id);
        const bpList = I18n.t(messages.bpList.id);
        const submit = I18n.t(messages.submit.id);
        const delegatebw = I18n.t(messages.delegatebw.id);
        const notice = I18n.t(messages.notice.id);
        const noticeC = I18n.t(messages.noticeC.id);
        const RuleT = I18n.t(messages.RuleT.id);
        const Rule1 = I18n.t(messages.Rule1.id);
        const Rule2 = I18n.t(messages.Rule2.id);
        const Rule3 = I18n.t(messages.Rule3.id);
        // const Rule4 = I18n.t(messages.Rule4.id);

        // const VoteDescIntl = I18n.t(messages.VoteDesc);
        // const UndelegatebwIntl = I18n.t(messages.Undelegatebw);
        // const AddDelegatebwIntl = I18n.t(messages.AddDelegatebw);
        // const RevoteIntl = I18n.t(messages.Revote);
        // const VotedBpsIntl = I18n.t(messages.VotedBps);

        this.account_name = account_name;


        return (
            <SafeAreaView style={[{flex:1, backgroundColor:'#e8e8e8'},]}>

                {
                    this.props.isVoting&&<LoadingView text="Voting"/>
                }


            <ScrollView >
                <View style={[styles.bodyBox,{flex:1}]}>

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
                            <Text style={[styles.contentHeaderAccountNameLabel]}>
                                {balance}
                            </Text>
                            <Text style={[styles.contentHeaderBalanceValueContainer]}>
                                {CurrencyBalance} <Text style={styles.contentHeaderEOSSign}>EOS</Text>
                            </Text>
                        </View>
                        <View style={styles.contentHeaderStake}>
                            <Text style={[styles.contentHeaderAccountNameLabel]}>
                                {stakeN}
                            </Text>
                            <Text style={[styles.contentHeaderBalanceValueContainer]}>
                                {stake} <Text style={styles.contentHeaderEOSSign}>EOS</Text>
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

                    <View style={[styles.contentBodyVotingList,{marginBottom:50},]}>
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
                                        {this.props.accountDic[votingC.owner] ? this.props.accountDic[votingC.owner].organization_name:votingC.owner}
                                    </Text>
                                    {/*<View style={styles.contentBodyBPDeleteContainer}>*/}
                                        {/*<TouchableHighlight id={index}*/}
                                                            {/*onPress={()=>this._setDeleteBPC(index)}>*/}
                                            {/*<View style={styles.contentBodyBPDeleteButton}>*/}
                                                {/*<View style={styles.contentBodyBPDeleteButtonInner}></View>*/}
                                            {/*</View>*/}
                                        {/*</TouchableHighlight>*/}
                                    {/*</View>*/}
                                </View>
                            })
                        }
                        </View>
                    </View>

                </View>
            </ScrollView>

                <View style = {[styles.footerView,]}>
                    <Text style={styles.footerSubmit}
                          onPress={this._setNoticeModalShow.bind(this)}>
                        {submit}
                    </Text>
                </View>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.ruleShow}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={[styles.ruleModalStyle]}>
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
                            {/*<Text style={styles.ruleContentText}>*/}
                                {/*{Rule4}*/}
                            {/*</Text>*/}
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
            </SafeAreaView>
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
        });
        votingList.sort();
        this.props.onDispatchVoteVotingList({account:this.state.accountPri, votingList, nav: this.props.navigation});
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
        onDispatchGetVoteBpsPost: (data) => dispatch({ type: "VOTE_INDEX_BPS_POST", data }),
        getAccountInfo: (data) => dispatch({ type: "VOTE_INDEX_ACCOUNTINFO_POST", data }),

        onDispatchVoteVotingList: (data) => dispatch({ type: "VOTE_SUBMITLIST_POST", data }),
    };
}
function mapStateToProps(state) {
    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        CurrencyBalance: state.VoteIndexPageReducer.CurrencyBalance,
        BPs: state.VoteIndexPageReducer.BPs,
        selectedNodeList : state.NodeListPageReducer.selectedNodeList,
        accountDic: state.VoteIndexPageReducer.accountDic,

        IsSubmitSuccess : state.VotePageReducer.IsSubmitSuccess,
        votingList: state.VotePageReducer.votingList,

        isVoting: state.VotePageReducer.isVoting,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
