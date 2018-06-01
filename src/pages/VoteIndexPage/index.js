// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, Image, TouchableOpacity, TouchableHighlight,SafeAreaView, Modal, ImageBackground } from "react-native";

// 自定义组件
import I18n from "../../../I18n";
import { styles, assetStyles, voteStyles, voteBpsStales, modalStyles, style } from "./style";
import { decryptObject, storage } from "../../utils/storage";
const developTeam = require('../../images/developTeamBackground.png');


class VoteIndexPage extends Component {
    static navigationOptions = ( props ) => {

        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
          title: 'Total Asset',
          headerBackImage: null,
          headerRight: (
            <Text style={{paddingRight: 10}} onPress={() => {props.navigation.state.params.navigatePress()}}>Change Wallet</Text>
          )
        };
    };

    constructor (props) {
        super(props);
        this.state = {
          cuntDownTime: "00d00h",
          IsModalShow: false,
            needUpdate:false,
        };


    }

    componentWillReceiveProps( nextProps ) {
        if(nextProps.needGetUserInfo&&nextProps.needGetUserInfo!==this.props.needGetUserInfo){
            this.props.setNeedGetUserInfoFalse();
            storage.load({key: "HomePageStorage"}).then((ret1) => {
                if (ret1) {
                    const ret = decryptObject( ret1 );
                    const accountPrivateKey = ret.accountPrivateKey;
                    const accountName = ret.accountName;
                    const data = {
                        accountPrivateKey,
                        accountName,
                    };
                    this.props.onDispatchGetAccountInfoPost(data);
                    this.props.onDispatchGetRefundsPost(data);
                    this.props.onDispatchGetCurrencyBalancePost(data);
                }
            }).catch( err => {
              console.log(err);
            });
        }

        if (nextProps.RefundsTime) {
          this.RefundingCountdown(nextProps.RefundsTime);
        }
    }

    componentDidMount() {

      this.props.getNodesIDInfo();

      storage.load({key: "HomePageStorage"}).then( ( ret1 ) => {
          if ( ret1 ) {
            const ret = decryptObject( ret1 );
            const accountPrivateKey = ret.accountPrivateKey;
            const accountName = ret.accountName;
            const data = {
              accountPrivateKey,
              accountName,
            };
            this.props.onDispatchGetAccountInfoPost(data);
            this.props.onDispatchGetCurrencyBalancePost(data);
            this.props.onDispatchGetRefundsPost(data);
            this.props.onDispatchGetVoteBpsPost(data);
            this.props.onDispatchGetVoteUsdPost();
          }
      }).catch( err => {
        console.log(err);
      });

      this.props.navigation.setParams({navigatePress: () => {this.setState({IsModalShow: true})}})
    }

    renderItem( { item, index } ) {
    return (
        <View key={index}
              style={[ {
                  flex: 1,
                  backgroundColor: '#ffffff',
                  paddingRight: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: 'row',
                  borderTopWidth:1,
                  borderTopColor: "#eee",
                  justifyContent: "space-between",
              } ]}>
            <View style={[ {flex:2} ]}>
                <Image source={{uri:this.props.accountDic[item.owner]?this.props.accountDic[item.owner].logo:'https://steemitimages.com/0x0/https://steemitimages.com/DQmWs93EuTs1CrgazwChGBqj7eygJoQ4HqB9ANWMN8TMHc8/eoosss1920_0023.jpg'}}
                       style={{width:46,height:46, borderRadius:23, marginTop:10}}/>
            </View>
            <View style={[ {flex:8,} ]}>
                <Text numberOfLines={1}
                      style={[
                          style.commonTextColorStyle,
                          {
                              fontWeight: 'bold',
                              fontSize: 21,
                              lineHeight: 35,
                              fontFamily: 'PingFangSC-Semibold',
                              color: '#323232',
                          } ]}>
                    {this.props.accountDic[item.owner]?this.props.accountDic[item.owner].organization_name:item.owner}

                </Text>
                <Text numberOfLines={1}
                      style={[
                          style.commonTextColorStyle,
                          {
                              fontSize: 14,
                              lineHeight: 22,
                              fontFamily: 'PingFangSC-Semibold',
                              color: '#323232',
                          } ]}>
                    {item.owner}
                </Text>
                <Text numberOfLines={1}
                      style={[
                          style.commonSubTextColorStyle,
                          {
                              fontSize: 14,
                              lineHeight: 28,
                              fontFamily: 'PingFangSC-Regular',
                              color: '#999999',
                              letterSpacing: 0,
                          } ]
                      }>
                    {parseFloat(item.total_votes/this.props.totalVoteWeight*100).toFixed(2) + "%"} Voter Choise
                </Text>
            </View>

            <View style={[ { paddingTop: 55,position:'relative',zIndex:-1 } ]}>
                {
                    this.props.contributors.indexOf(item.owner) !== -1 && <ImageBackground style={{
                        width: 130, height: 18,
                        position: 'absolute',
                        top: 6, right: -5,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                                                                                           source={developTeam}>
                        <Text style={{textAlign: "center", lineHeight: 18, fontSize:12, color: 'white'}}>

                            I18n.t("Global Development Team");
                        </Text>
                    </ImageBackground>
                }
            </View>
        </View>
    );
}


    render() {
        const votedByMeProducers = this.props.accountInfo.voter_info ? this.props.accountInfo.voter_info.producers : []

      const { account_name, total_resources, delegated_bandwidth } = this.props.accountInfo;
      const { ram_bytes } = total_resources;
      const { cpu_weight, net_weight } = delegated_bandwidth ? delegated_bandwidth : { cpu_weight: "0 SYS", net_weight: "0 SYS"};
      const stake = Number(net_weight.replace(" SYS", "")) + Number(cpu_weight.replace(" SYS", ""));
      const CurrencyBalance = (this.props.CurrencyBalance).toFixed(2);
      const Refunds = this.props.Refunds;
      const TotalAsset = (stake + this.props.CurrencyBalance + Refunds).toFixed(4);
      const TotalAssetByUsd = (TotalAsset * this.props.USD).toFixed(2);
      const BPs = this.props.BPs;
      const userNameIntl = I18n.t("VoteIndexPage userName");
      const TotalAssetIntl = I18n.t("VoteIndexPage TotalAsset");
      const RefundingIntl = I18n.t("VoteIndexPage Refunding");
      const BalanceIntl = I18n.t("VoteIndexPage Balance");
      const RAMBytesIntl = I18n.t("VoteIndexPage RAMBytes");
      const VoteIntl = I18n.t("VoteIndexPage Vote");
      const VoteDescIntl = I18n.t("VoteIndexPage VoteDesc");
      const UndelegatebwIntl = I18n.t("VoteIndexPage Undelegatebw");
      const AddDelegatebwIntl = I18n.t("VoteIndexPage AddDelegatebw");
      const RevoteIntl = I18n.t("VoteIndexPage Revote");
      const VotedBpsIntl = I18n.t("VoteIndexPage VotedBps");

        return (
            <SafeAreaView style={[{flex:1}]}>
            <View style={styles.bodyBox}>
                <ScrollView>
                  <View style={styles.contentTitleBox}>
                    <Text style={styles.contentTitle}>EOS</Text>
                  </View>
                  <View style={assetStyles.contentAssetBox}>
                    <View style={assetStyles.totalAssetBox}>
                      <ImageBackground style={assetStyles.totalAssetBgImg} source={require("./images/wallet_img_background.png")}>
                        <View style={assetStyles.userNameBox}>
                          <Text style={assetStyles.userNameTip}>
                            {userNameIntl}:  <Text style={assetStyles.userName}>{account_name}</Text>
                          </Text>
                        </View>
                        <View style={assetStyles.userTotalAssetBox}>
                          <Text style={assetStyles.userTotalAssetTip}>{TotalAssetIntl}</Text>
                          <Text style={assetStyles.userTotalAssetValue}>
                            {TotalAsset} <Text style={assetStyles.userTotalAssetValueUnit}>EOS</Text>
                          </Text>
                        </View>
                        <Text style={assetStyles.userTotalAssetByUsd}>≈ ${TotalAssetByUsd}</Text>
                      </ImageBackground>
                    </View>
                    <View style={assetStyles.assetItemBox}>
                      <View style={assetStyles.itemBox}>
                        <View style={assetStyles.itemRefundBox}>
                          <Text style={assetStyles.itemRefundName}>{RefundingIntl}</Text>
                          <Image style={assetStyles.refundingIcon} source={require("./images/wallet_icon_countdown.png")} />
                          <Text style={assetStyles.refundingTime}>{this.state.cuntDownTime}</Text>
                        </View>
                        <Text style={assetStyles.itemValue}>
                          {Refunds} <Text style={assetStyles.itemValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <View style={assetStyles.itemBox}>
                        <Text style={assetStyles.itemName}>{BalanceIntl}</Text>
                        <Text style={assetStyles.itemValue}>
                          {CurrencyBalance} <Text style={assetStyles.itemValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <View style={[assetStyles.itemBox, {borderBottomWidth: 0,}]}>
                        <Text style={assetStyles.itemName}>{RAMBytesIntl}</Text>
                        <Text style={assetStyles.itemValue}>{ram_bytes}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={voteStyles.contentVoteBox}>
                    <Text style={voteStyles.voteTitle}>{VoteIntl}</Text>
                    <Text style={voteStyles.voteDesc}>{VoteDescIntl}</Text>
                    <View style={voteStyles.voteItemList}>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("UnDelegatebwPage")}}>
                        <Text style={voteStyles.voteItemName}>{UndelegatebwIntl}</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("DelegatebwPage")}}>
                        <Text style={voteStyles.voteItemName}>{AddDelegatebwIntl}</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("NodeListPage")}}>
                        <Text style={voteStyles.voteItemName}>{RevoteIntl}</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={voteBpsStales.contentVoteBpsBox}>
                    <View style={voteBpsStales.VoteBpsTitleBox}>
                      <View style={voteBpsStales.VoteBpsTitleFlg}></View>
                      <Text style={voteBpsStales.VoteBpsTitle}>{VotedBpsIntl}</Text>
                    </View>
                    <View style={voteBpsStales.VoteBpsList}>
                      {BPs.map((item,index) => {
                          if(votedByMeProducers.indexOf(item.owner)==-1){
                              return
                          }else{
                              return this.renderItem({item,index});
                          }
                      })}
                    </View>
                  </View>
                  <View style={{height: 50}}></View>
                </ScrollView>
            </View>
              <Modal animationType='slide' transparent={true} visible={this.state.IsModalShow} onRequestClose={() => {}}>
                <View style={modalStyles.modalStyle}>
                  <View style={modalStyles.subView}>
                    <Text style={modalStyles.titleText}>Notice</Text>
                    <Text style={modalStyles.contentText}>Please confirm that backup the EOS wallet before change it.</Text>
                    <View style={modalStyles.horizontalLine} />
                    <View style={modalStyles.buttonView}>
                      <Text style={modalStyles.buttonStyle} onPress={() => {this.setState({IsModalShow: false})}}>Cancel</Text>
                      <View style={modalStyles.verticalLine} />
                      <Text style={modalStyles.buttonStyle} onPress={() => {this.setState({IsModalShow: false});this.props.navigation.navigate("HomePage", {aaa:"aaa"})}}>OK</Text>
                    </View>
                  </View>
                </View>
              </Modal>

            </SafeAreaView>
        );
    }

    RefundingCountdown = (RefundsTime) => {
      const totalTime = 3*24*60*60*1000;
      let nowTime = new Date();
      nowTime = nowTime.getTime();
      let CreatTime = new Date(RefundsTime);
      CreatTime = CreatTime.getTime();
      let cuntDownTime = totalTime - (nowTime - CreatTime);
      const hours = Math.ceil(cuntDownTime/(1000*60*60)%24);
      const day = Math.floor(cuntDownTime/(1000*60*60*24));
      this.setState({
        cuntDownTime: day + "d " + hours + "h",
      });
    };
}

// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
    return {
      dispatch,
        setNeedGetUserInfoFalse : () => dispatch({type:"VOTEINDEX_GETINFO_FALSE_REDUCER"}),
        onDispatchGetAccountInfoPost: (data) => dispatch({ type: "VOTE_INDEX_ACCOUNTINFO_POST", data }),
        onDispatchGetCurrencyBalancePost: (data) => dispatch({ type: "VOTE_INDEX_CURRENCYBALANCE_POST", data }),
        onDispatchGetRefundsPost: (data) => dispatch({ type: "VOTE_INDEX_REFUNDS_POST", data }),
        onDispatchGetVoteBpsPost: (data) => dispatch({ type: "VOTE_INDEX_BPS_POST", data }),
        onDispatchGetVoteUsdPost: () => dispatch({ type: "VOTE_INDEX_GETUSDPRICE_POST" }),
        getNodesIDInfo: () => dispatch({ type: "GET_NODESIDINFO_POST" }),
    };
}

function mapStateToProps(state) {
    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        CurrencyBalance: state.VoteIndexPageReducer.CurrencyBalance,
        Refunds: state.VoteIndexPageReducer.Refunds,
        RefundsTime: state.VoteIndexPageReducer.RefundsTime,
        BPs: state.VoteIndexPageReducer.BPs,
        totalVoteWeight: state.VoteIndexPageReducer.totalVoteWeight,
        USD: state.VoteIndexPageReducer.USD,
        needGetUserInfo: state.VoteIndexPageReducer.needGetUserInfo,

        accountDic: state.VoteIndexPageReducer.accountDic,
        contributors: state.VoteIndexPageReducer.contributors,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteIndexPage);
