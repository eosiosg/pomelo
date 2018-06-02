// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import {ScrollView, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
// 自定义组件
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";
import { styles, countStyles, stakeStyles, ruleStyles, btnStyles } from "./style";
import { decryptObject, storage } from "../../utils/storage";
import LoadingView from '../../commonComponents/loading'

class DelegatebwPage extends Component {
    static navigationOptions = ( props ) => {
        let title = I18n.t("DelegatebwPage Title");
        return {
          title: title
        };
    };

    constructor( props ) {
        super( props );
        this.state = {
          CPU: "",
          Network: "",
        };
    }

    render() {
      const stake = Number(this.state.CPU) + Number(this.state.Network);
      const CurrencyBalance = (this.props.CurrencyBalance).toFixed(2);
      const CPU_placeholder = "CPU Stake";
      const Network_placeholder = "NetWork Stake";
      const BalanceIntl = I18n.t("DelegatebwPage Balance");
      const StakeCountIntl = I18n.t("DelegatebwPage StakeCount");
      const StakeQuantityIntl = I18n.t("DelegatebwPage StakeQuantity");
      const CPUIntl = I18n.t("DelegatebwPage CPU");
      const NetworkIntl = I18n.t("DelegatebwPage Network");
      const RuleIntl = I18n.t("DelegatebwPage Rule");
      const Rule1Intl = I18n.t("DelegatebwPage Rule1");
      const Rule2Intl = I18n.t("DelegatebwPage Rule2");
      const Rule3Intl = I18n.t("DelegatebwPage Rule3");
      // const Rule4Intl = I18n.t("DelegatebwPage Rule4");
      const ConfirmIntl = I18n.t("DelegatebwPage Confirm");
        return (
            <SafeAreaView style={[{flex:1}]}>
                {
                    this.props.loading&&<LoadingView text="Voting"/>
                }

            <View style={styles.bodyBox}>
              <ScrollView>
                <View style={countStyles.countBox}>
                  <View style={countStyles.countItem}>
                    <Text style={countStyles.countName}>{BalanceIntl}</Text>
                    <Text style={countStyles.countValue}>
                      {CurrencyBalance} <Text style={countStyles.countValueUnit}>EOS</Text>
                    </Text>
                  </View>
                  <View style={[countStyles.countItem, {borderBottomWidth: 0,}]}>
                    <Text style={countStyles.countName}>{StakeCountIntl}</Text>
                    <Text style={countStyles.countStakeValue}>
                      {stake} <Text style={countStyles.countValueUnit}>EOS</Text>
                    </Text>
                  </View>
                </View>
                <View style={stakeStyles.stakeBox}>
                  <View style={stakeStyles.titleTipBox}>
                    <Text style={stakeStyles.titleTip}>{StakeQuantityIntl}</Text>
                  </View>
                  <View style={stakeStyles.stakeConBox}>
                    <View style={stakeStyles.stakeItem}>
                      <Text style={stakeStyles.stakeName}>{CPUIntl}</Text>
                      <View style={stakeStyles.stakeValue}>
                        <TextInput
                          style={stakeStyles.stakeValueInput}
                          placeholder={CPU_placeholder}
                          placeholderTextColor={"#999"}
                          keyboardType="numeric"
                          returnKeyType="done"
                          onChangeText={(CPU) => this.setState({CPU})}
                          underlineColorAndroid={"transparent"}
                        />
                      </View>
                    </View>
                    <View style={stakeStyles.stakeItem}>
                      <Text style={stakeStyles.stakeName}>{NetworkIntl}</Text>
                      <View style={stakeStyles.stakeValue}>
                        <TextInput
                          style={stakeStyles.stakeValueInput}
                          placeholder={Network_placeholder}
                          placeholderTextColor={"#999"}
                          keyboardType="numeric"
                          returnKeyType="done"
                          onChangeText={(Network) => this.setState({Network})}
                          underlineColorAndroid={"transparent"}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={ruleStyles.ruleBox}>
                  <Text style={ruleStyles.ruleTitle}>{RuleIntl}:</Text>
                  <Text style={ruleStyles.ruleDesc}>{Rule1Intl}</Text>
                  <Text style={ruleStyles.ruleDesc}>{Rule2Intl}</Text>
                  <Text style={ruleStyles.ruleDesc}>{Rule3Intl}</Text>
                  {/*<Text style={ruleStyles.ruleDesc}>{Rule4Intl}</Text>*/}
                </View>
                <View style={{height: 50}}></View>
              </ScrollView>
              <View style={btnStyles.btnBox}>
                <Text style={btnStyles.btn} onPress={() => this.DelegatebwConfirmFn()}>{ConfirmIntl}</Text>
              </View>
            </View>
            </SafeAreaView>
        );
    }

    IsStateCpuLegal = () => {
      let IsLegal = true;
      const cpuSurplus = this.props.CurrencyBalance - Number(this.state.Network);
      if (Number(this.state.CPU) < 0 || cpuSurplus < 0 || Number(this.state.CPU) > cpuSurplus) {
        Toast.show("The CPU Number is illegal",{
          position: 20,
        });
        IsLegal = false;
      }
      return IsLegal;
    };

    IsStateNetworkLegal = () => {
      let IsLegal = true;
      const networkSurplus = this.props.CurrencyBalance - Number(this.state.CPU);
      if (Number(this.state.Network) < 0 || networkSurplus < 0 || Number(this.state.Network) > networkSurplus) {
        Toast.show("The Network Number is illegal",{
          position: 20,
        });
        IsLegal = false;
      }
      return IsLegal;
    };

    DelegatebwConfirmFn = () => {
      if ((!this.state.CPU && !this.state.Network) || !this.IsStateCpuLegal() || !this.IsStateNetworkLegal()) {
        return;
      }

      storage.load({key: "HomePageStorage"}).then((ret1) => {
        if (ret1) {
          const ret = decryptObject( ret1 );
          const accountPrivateKey = ret.accountPrivateKey;
          const accountName = ret.accountName;
          const data = {
            from: accountName,
            receiver: accountName,
            stake_net_quantity: Number(this.state.Network) + " SYS",
            stake_cpu_quantity: Number(this.state.CPU) + " SYS",
            transfer: 0,
          };
          const nav = this.props.navigation;
          this.props.onDispatchDelegateBwPost(data, nav, accountPrivateKey);
        }
      }).catch( err => {
        console.log(err);
      });
    };
}

// 挂载中间件到组件；
function mapDispatchToProps( dispatch ) {
    return {
      onDispatchDelegateBwPost: (data, nav, accountPrivateKey) => dispatch({ type: "DELEGATEBW_CONFIRM_POST", data, nav, accountPrivateKey }),
    };
}

function mapStateToProps( state ) {
    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        CurrencyBalance: state.VoteIndexPageReducer.CurrencyBalance,
        Refunds: state.VoteIndexPageReducer.Refunds,
        BPs: state.VoteIndexPageReducer.BPs,
        USD: state.VoteIndexPageReducer.USD,

        loading : state.DelegatebwPageReducer.loading,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegatebwPage);
