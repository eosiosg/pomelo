// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
// 自定义组件
import { styles, navStyles, countStyles, stakeStyles, ruleStyles, btnStyles } from "./style";

class DelegatebwPage extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            header: null
        };
    };

    constructor( props ) {
        super( props );
        this.state = {
          CPU: "",
          Network: "",
          cpu_weight: 0,
          net_weight: 0,
        };
    }

    componentWillReceiveProps( nextProps ) {
      if (nextProps.accountInfo) {
        const { cpu_weight, net_weight, } = nextProps.accountInfo;
        this.setState({
          cpu_weight,
          net_weight,
        });
      }
    }

    componentDidMount() {
      this.props.onDispatchGetAccountInfoPost();
      this.props.onDispatchGetCurrencyBalancePost();
    }

    render() {
      const stake = Number(this.state.CPU) + Number(this.state.Network);
      const CurrencyBalance = this.props.CurrencyBalance;
      const CPU_placeholder = "MAX "+ this.state.cpu_weight+" Stake";
      const Network_placeholder = "MAX "+ this.state.net_weight+" Stake";
        return (
            <View style={styles.bodyBox}>
              <View style={navStyles.navBox}>
                <View style={navStyles.navItem}>
                  <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                    <Image style={{width: 24, height: 24,}} source={require("./images/arrow-left-account.png")} />
                  </TouchableOpacity>
                </View>
                <View style={navStyles.navItem}>
                  <Text style={navStyles.navTitle}>DelegatebwPage</Text>
                </View>
                <View style={navStyles.navItem}></View>
              </View>
              <View style={countStyles.countBox}>
                <View style={countStyles.countItem}>
                  <Text style={countStyles.countName}>Balance</Text>
                  <Text style={countStyles.countValue}>
                    {CurrencyBalance} <Text style={countStyles.countValueUnit}>EOS</Text>
                  </Text>
                </View>
                <View style={[countStyles.countItem, {borderBottomWidth: 0,}]}>
                  <Text style={countStyles.countName}>Stake count</Text>
                  <Text style={countStyles.countStakeValue}>
                    {stake} <Text style={countStyles.countValueUnit}>EOS</Text>
                  </Text>
                </View>
              </View>
              <View style={stakeStyles.stakeBox}>
                <View style={stakeStyles.titleTipBox}>
                  <Text style={stakeStyles.titleTip}>Stake quantity</Text>
                </View>
                <View style={stakeStyles.stakeConBox}>
                  <View style={stakeStyles.stakeItem}>
                    <Text style={stakeStyles.stakeName}>CPU</Text>
                    <View style={stakeStyles.stakeValue}>
                      <TextInput
                        style={stakeStyles.stakeValueInput}
                        placeholder={CPU_placeholder}
                        placeholderTextColor={"#999"}
                        onChangeText={(CPU) => this.SetStateCpu(CPU)}
                        value={this.state.CPU}
                        underlineColorAndroid={"transparent"}
                      />
                    </View>
                  </View>
                  <View style={stakeStyles.stakeItem}>
                    <Text style={stakeStyles.stakeName}>Network</Text>
                    <View style={stakeStyles.stakeValue}>
                      <TextInput
                        style={stakeStyles.stakeValueInput}
                        placeholder={Network_placeholder}
                        placeholderTextColor={"#999"}
                        onChangeText={(Network) => this.SetStateNetwork(Network)}
                        value={this.state.Network}
                        underlineColorAndroid={"transparent"}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={ruleStyles.ruleBox}>
                <Text style={ruleStyles.ruleTitle}>Rule*:</Text>
                <Text style={ruleStyles.ruleDesc}>· Vote will use a little CPU + Network stake;</Text>
                <Text style={ruleStyles.ruleDesc}>· Weight  = seconds_count_since_year_2000/ seconds_count_per_year，means increase by second;</Text>
                <Text style={ruleStyles.ruleDesc}>· Vote = (CPU stake + Network stake) * 2^weight;</Text>
                <Text style={ruleStyles.ruleDesc}>· Could undelegatebw anytime，whitch will deduct corresponding votes from voted producers, and EOS will refund to account 3 days later;</Text>
              </View>
              <View style={btnStyles.btnBox}>
                <Text style={btnStyles.btn} onPress={() => this.DelegatebwConfirmFn()}>Confirm</Text>
              </View>
              <View style={styles.bodyFooterBox}>
                <View style={styles.bodyFooterFlg}></View>
              </View>
            </View>
        );
    }

    SetStateCpu = (val) => {
      const CPU = String(Math.min(this.state.cpu_weight, val));
      console.log(CPU);
      this.setState({
        CPU,
      });
    };
    SetStateNetwork = (val) => {
      const Network = String(Math.min(this.state.net_weight, val));
      console.log(Network);
      this.setState({
        Network,
      });
    };
    DelegatebwConfirmFn = () => {
      if (!this.state.CPU || !this.state.Network) {
        return;
      }
      const data = {
        from: "eosiomeetone",
        receiver:"eosiosg11111",
        stake_net_quantity: this.state.Network + " SYS",
        stake_cpu_quantity: this.state.CPU + " SYS",
        transfer: 0,
      };
      const nav = this.props.navigation;
      this.props.onDispatchDelegateBwPost(data, nav);
    };
}

// 挂载中间件到组件；
function mapDispatchToProps(  dispatch  ) {
    return {
      onDispatchGetAccountInfoPost: () => dispatch({ type: "DELEGATEBW_ACCOUNTINFO_POST" }),
      onDispatchGetCurrencyBalancePost: () => dispatch({ type: "DELEGATEBW_CURRENCYBALANCE_POST" }),
      onDispatchDelegateBwPost: (data, nav) => dispatch({ type: "DELEGATEBW_CONFIRM_POST", data, nav }),
    };
}

function mapStateToProps( state ) {
    return {
      state,
      accountInfo: state.DelegatebwPageReducer.accountInfo,
      CurrencyBalance: state.DelegatebwPageReducer.CurrencyBalance,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegatebwPage);
