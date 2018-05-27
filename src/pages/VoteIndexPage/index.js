// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { injectIntl } from 'react-intl'
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";

// 自定义组件
import { styles, assetStyles, voteStyles, voteBpsStales } from "./style";
import messages from './messages';

class VoteIndexPage extends Component {
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
        this.state = {};
    }

    componentWillReceiveProps( nextProps ) {}

    componentDidMount() {
      this.props.onDispatchGetAccountInfoPost();
      this.props.onDispatchGetCurrencyBalancePost();
      this.props.onDispatchGetRefundsPost();
      this.props.onDispatchGetVoteBpsPost();
      // 测试国际化语言
      const { intl } = this.props;
      const hello = intl.formatMessage(messages.Hello);
      console.log("======formatMessage======");
      console.log(hello);
    }

    render() {
      const { account_name, cpu_weight, net_weight, total_resources, } = this.props.accountInfo;
      const { ram_bytes } = total_resources;
      const stake = net_weight + cpu_weight;
      const CurrencyBalance = this.props.CurrencyBalance;
      const Refunds = this.props.Refunds;
      const TotalAsset = stake + CurrencyBalance + Refunds;
      const TotalAssetByUsd = TotalAsset * 12;
      const BPs = this.props.BPs;
        return (
            <View style={styles.bodyBox}>
                <ScrollView style={styles.contentBox}>
                  <View style={styles.contentTitleBox}>
                    <Text style={styles.contentTitle}>EOS</Text>
                  </View>
                  <View style={assetStyles.contentAssetBox}>
                    <View style={assetStyles.totalAssetBox}>
                      <View style={assetStyles.userNameBox}>
                        <Text style={assetStyles.userNameTip}>
                          userName:  <Text style={assetStyles.userName}>{account_name}</Text>
                        </Text>
                      </View>
                      <View style={assetStyles.userTotalAssetBox}>
                        <Text style={assetStyles.userTotalAssetTip}>Total Asset</Text>
                        <Text style={assetStyles.userTotalAssetValue}>
                          {TotalAsset} <Text style={assetStyles.userTotalAssetValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <Text style={assetStyles.userTotalAssetByUsd}>~${TotalAssetByUsd}</Text>
                    </View>
                    <View style={assetStyles.assetItemBox}>
                      <View style={assetStyles.itemBox}>
                        <Text style={assetStyles.itemName}>
                          Refunding <Text style={assetStyles.refundingTime}>2d23h</Text>
                        </Text>
                        <Text style={assetStyles.itemValue}>
                          {Refunds} <Text style={assetStyles.itemValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <View style={assetStyles.itemBox}>
                        <Text style={assetStyles.itemName}>Balance</Text>
                        <Text style={assetStyles.itemValue}>
                          {CurrencyBalance} <Text style={assetStyles.itemValueUnit}>EOS</Text>
                        </Text>
                      </View>
                      <View style={[assetStyles.itemBox, {borderBottomWidth: 0,}]}>
                        <Text style={assetStyles.itemName}>RAM bytes</Text>
                        <Text style={assetStyles.itemValue}>{ram_bytes}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={voteStyles.contentVoteBox}>
                    <Text style={voteStyles.voteTitle}>Vote</Text>
                    <Text style={voteStyles.voteDesc}>Undelegatebw will deduct corresponding votes from voted producers, and EOS will refund to account 3 days later.</Text>
                    <View style={voteStyles.voteItemList}>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("UnDelegatebwPage")}}>
                        <Text style={voteStyles.voteItemName}>undelegatebw</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("DelegatebwPage")}}>
                        <Text style={voteStyles.voteItemName}>add delegatebw</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("NodeListPage")}}>
                        <Text style={voteStyles.voteItemName}>revote</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={voteBpsStales.contentVoteBpsBox}>
                    <View style={voteBpsStales.VoteBpsTitleBox}>
                      <View style={voteBpsStales.VoteBpsTitleFlg}></View>
                      <Text style={voteBpsStales.VoteBpsTitle}>Voted Bps</Text>
                    </View>
                    <View style={voteBpsStales.VoteBpsList}>
                      {BPs.map((item) => (
                        <View key={item.producer_key} style={voteBpsStales.VoteBpsItem}>
                          <Text style={voteBpsStales.VoteBpsItemName}>{item.owner}</Text>
                          <Text style={voteBpsStales.VoteBpsItemDesc}>{item.total_votes} Voter Choise</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.bodyFooterBox}>
                    <View style={styles.bodyFooterFlg}></View>
                  </View>
                </ScrollView>
            </View>
        );
    }
}

// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
    return {
        onDispatchGetAccountInfoPost: () => dispatch({ type: "VOTE_INDEX_ACCOUNTINFO_POST" }),
        onDispatchGetCurrencyBalancePost: () => dispatch({ type: "VOTE_INDEX_CURRENCYBALANCE_POST" }),
        onDispatchGetRefundsPost: () => dispatch({ type: "VOTE_INDEX_REFUNDS_POST" }),
        onDispatchGetVoteBpsPost: () => dispatch({ type: "VOTE_INDEX_BPS_POST" }),
    };
}
function mapStateToProps(state) {
    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        CurrencyBalance: state.VoteIndexPageReducer.CurrencyBalance,
        Refunds: state.VoteIndexPageReducer.Refunds,
        BPs: state.VoteIndexPageReducer.BPs,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VoteIndexPage));
