// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
// 自定义组件
import I18n from "../../../I18n";
import { styles, countStyles, stakeStyles, btnStyles } from "./style";
import { decryptObject, storage } from "../../utils/storage";
import Toast from "react-native-root-toast";

class UnDelegatebwPage extends Component {
    static navigationOptions = ( props ) => {
      return {
        title: 'UnDelegatebw'
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

    render() {

        const { delegated_bandwidth } = this.props.accountInfo;
        let { cpu_weight, net_weight } = delegated_bandwidth ? delegated_bandwidth : { cpu_weight: "0 SYS", net_weight: "0 SYS"};
        this.cpu_weight = cpu_weight.replace(" SYS", "");
        this.net_weight = net_weight.replace(" SYS", "");
        const Stake = Number(this.cpu_weight) + Number(this.net_weight);

        const CPU_placeholder = "Max "+ this.cpu_weight +" Stake";
        const Network_placeholder = "Max "+ this.net_weight +" Stake";

        const StakeCountIntl = I18n.t("UnDelegatebwPage StakeCount");
        const StakeCountInfoIntl = I18n.t("UnDelegatebwPage StakeCountInfo");
        const StakeQuantityIntl = I18n.t("UnDelegatebwPage StakeQuantity");
        const CPUIntl = I18n.t("UnDelegatebwPage CPU");
        const NetworkIntl = I18n.t("UnDelegatebwPage Network");
        const ConfirmIntl = I18n.t("UnDelegatebwPage Confirm");
        return (
            <SafeAreaView style={[{flex:1}]}>
            <View style={styles.bodyBox}>
              <ScrollView>
                <View style={countStyles.countBox}>
                  <View style={[countStyles.countItem, {borderBottomWidth: 0,}]}>
                    <Text style={countStyles.countName}>{StakeCountIntl}</Text>
                    <Text style={countStyles.countValue}>
                      {Stake} <Text style={countStyles.countValueUnit}>EOS</Text>
                    </Text>
                  </View>
                </View>
                <View style={countStyles.countInfoBox}>
                  <Text style={countStyles.countInfo}>{StakeCountInfoIntl}</Text>
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
                          maxLength={11}
                          keyboardType="numeric"
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
                          maxLength={11}
                          keyboardType="numeric"
                          onChangeText={(Network) => this.setState({Network})}
                          underlineColorAndroid={"transparent"}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{height: 100}}></View>
              </ScrollView>
              <View style={btnStyles.btnBox}>
                <Text style={btnStyles.btn} onPress={() => this.UnDelegatebwConfirmFn()}>{ConfirmIntl}</Text>
              </View>
            </View>
            </SafeAreaView>
        );
    }

  IsStateCpuLegal = () => {
    let IsLegal = true;
    if (Number(this.state.CPU) > Number(this.cpu_weight) || Number(this.state.CPU) < 0) {
      Toast.show("The CPU Number is illegal",{
        position: 20,
      });
      IsLegal = false;
    }
    return IsLegal;
  };

  IsStateNetworkLegal = () => {
    let IsLegal = true;
    if (Number(this.state.Network) > Number(this.net_weight) || Number(this.state.Network) < 0) {
      Toast.show("The Network Number is illegal",{
        position: 20,
      });
      IsLegal = false;
    }
    return IsLegal;
  };

    UnDelegatebwConfirmFn = () => {
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
          unstake_net_quantity: Number(this.state.Network) + " SYS",
          unstake_cpu_quantity: Number(this.state.CPU) + " SYS",
        };
        const nav = this.props.navigation;
        this.props.onDispatchUnDelegateBwPost(data, nav, accountPrivateKey);
      }
    }).catch( err => {
      console.log(err);
    });
  };
}

// 挂载中间件到组件；
function mapDispatchToProps(  dispatch  ) {
    return {
      onDispatchUnDelegateBwPost: (data, nav, accountPrivateKey) => dispatch({ type: "UNDELEGATEBW_CONFIRM_POST", data, nav, accountPrivateKey }),
    };
}

function mapStateToProps( state ) {
    return {
      state,
      accountInfo: state.VoteIndexPageReducer.accountInfo,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnDelegatebwPage);
