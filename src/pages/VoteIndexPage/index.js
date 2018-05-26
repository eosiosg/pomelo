// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
// import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";

// 自定义组件
import { styles, assetStyles, voteStyles, voteBpsStales } from "./style";

class VoteIndexPage extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps( nextProps ) {}

    componentDidMount() {}

    render() {
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
                  <View style={voteStyles.contentVoteBox}>
                    <Text style={voteStyles.voteTitle}>Vote</Text>
                    <Text style={voteStyles.voteDesc}>eosio.sg联合meet.one, eos cannon, eos nation, eos canada预计下周将推出带投票功能的开源EOS钱包 - Pomelo（柚子）。该钱包还将支持cpu和带宽的委托出租，RAM的买卖，代码正由2个独立的安全团队负责审计。</Text>
                    <View style={voteStyles.voteItemList}>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("NodeListPage")}}>
                        <Text style={voteStyles.voteItemName}>undelegatebw</Text>
                        <Image style={[voteStyles.voteItemActionIcon, {width: 16, height: 20,}]} source={require("./images/arrow-right-account.png")} />
                      </TouchableOpacity>
                      <TouchableOpacity style={voteStyles.voteItem} onPress={() => {this.props.navigation.navigate("NodeListPage")}}>
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
                      <View style={voteBpsStales.VoteBpsItem}>
                        <Text style={voteBpsStales.VoteBpsItemName}>EOSeco</Text>
                        <Text style={voteBpsStales.VoteBpsItemDesc}>20% Voter Choise</Text>
                      </View>
                      <View style={voteBpsStales.VoteBpsItem}>
                        <Text style={voteBpsStales.VoteBpsItemName}>EOSeco</Text>
                        <Text style={voteBpsStales.VoteBpsItemDesc}>20% Voter Choise</Text>
                      </View>
                      <View style={voteBpsStales.VoteBpsItem}>
                        <Text style={voteBpsStales.VoteBpsItemName}>EOSeco</Text>
                        <Text style={voteBpsStales.VoteBpsItemDesc}>20% Voter Choise</Text>
                      </View>
                      <View style={voteBpsStales.VoteBpsItem}>
                        <Text style={voteBpsStales.VoteBpsItemName}>EOSeco</Text>
                        <Text style={voteBpsStales.VoteBpsItemDesc}>20% Voter Choise</Text>
                      </View>
                      <View style={voteBpsStales.VoteBpsItem}>
                        <Text style={voteBpsStales.VoteBpsItemName}>EOSeco</Text>
                        <Text style={voteBpsStales.VoteBpsItemDesc}>20% Voter Choise</Text>
                      </View>
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
        onDispatchGetAllAssetPost: () => dispatch({ type: "HOME_GETALLASSET_POST" }),
    };
}
function mapStateToProps(state) {
    return {
        allAsset: state.HomePageReducer.allAsset,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteIndexPage);
