// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
// 自定义组件
import { styles, navStyles, countStyles, stakeStyles, btnStyles } from "./style";

class UnDelegatebwPage extends Component {
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
          Network: "",
          CPU: "",
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
    }

    render() {
      const Stake = Number(this.state.CPU) + Number(this.state.Network);
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
                  <Text style={navStyles.navTitle}>UnDelegatebwPage</Text>
                </View>
                <View style={navStyles.navItem}></View>
              </View>
              <ScrollView>
                <View style={countStyles.countBox}>
                  <View style={[countStyles.countItem, {borderBottomWidth: 0,}]}>
                    <Text style={countStyles.countName}>Stake count</Text>
                    <Text style={countStyles.countValue}>
                      {Stake} <Text style={countStyles.countValueUnit}>EOS</Text>
                    </Text>
                  </View>
                </View>
                <View style={countStyles.countInfoBox}>
                  <Text style={countStyles.countInfo}>* EOS will return to account 3 days later</Text>
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
                          maxLength={11}
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
                          maxLength={11}
                          onChangeText={(Network) => this.SetStateNetwork(Network)}
                          value={this.state.Network}
                          underlineColorAndroid={"transparent"}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View style={btnStyles.btnBox}>
                <Text style={btnStyles.btn} onPress={() => this.UnDelegatebwConfirmFn()}>Confirm</Text>
              </View>
              <View style={styles.bodyFooterBox}>
                <View style={styles.bodyFooterFlg}></View>
              </View>
            </View>
        );
    }

    SetStateCpu = (val) => {
    const CPU = String(Math.min(this.state.cpu_weight, val));
    this.setState({
      CPU,
    });
  };

    SetStateNetwork = (val) => {
    const Network = String(Math.min(this.state.net_weight, val));
    this.setState({
      Network,
    });
  };

    UnDelegatebwConfirmFn = () => {
    if (!this.state.CPU || !this.state.Network) {
      return;
    }
    const data = {
      from: "eosiomeetone",
      receiver:"eosiosg11111",
      unstake_net_quantity: this.state.Network + " SYS",
      unstake_cpu_quantity: this.state.CPU + " SYS",
    };
    const nav = this.props.navigation;
    this.props.onDispatchUnDelegateBwPost(data, nav);
  };
}

// 挂载中间件到组件；
function mapDispatchToProps(  dispatch  ) {
    return {
      onDispatchGetAccountInfoPost: () => dispatch({ type: "UNDELEGATEBW_ACCOUNTINFO_POST" }),
      onDispatchUnDelegateBwPost: (data, nav) => dispatch({ type: "UNDELEGATEBW_CONFIRM_POST", data, nav }),
    };
}

function mapStateToProps( state ) {
    return {
      state,
      accountInfo: state.UnDelegatebwPageReducer.accountInfo,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnDelegatebwPage);
