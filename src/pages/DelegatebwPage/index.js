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
          Balance: 0,
        };
    }

    componentWillReceiveProps( nextProps ) {}

    componentDidMount() {}

    render() {
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
                    233,434 <Text style={countStyles.countValueUnit}>EOS</Text>
                  </Text>
                </View>
                <View style={[countStyles.countItem, {borderBottomWidth: 0,}]}>
                  <Text style={countStyles.countName}>Stake count</Text>
                  <Text style={countStyles.countValue}>
                    233,434 <Text style={countStyles.countValueUnit}>EOS</Text>
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
                        placeholder="MAX 12233 Stake"
                        autoFocus={false}
                        placeholderTextColor={"rgba(245, 203, 72, .4)"}
                        maxLength={11}
                        onChangeText={(CPU) => this.setState({CPU})}
                        underlineColorAndroid={"transparent"}
                      />
                    </View>
                  </View>
                  <View style={stakeStyles.stakeItem}>
                    <Text style={stakeStyles.stakeName}>Network</Text>
                    <View style={stakeStyles.stakeValue}>
                      <TextInput
                        style={stakeStyles.stakeValueInput}
                        placeholder="MAX 12233 Stake"
                        autoFocus={false}
                        placeholderTextColor={"rgba(245, 203, 72, .4)"}
                        maxLength={11}
                        onChangeText={(Network) => this.setState({Network})}
                        underlineColorAndroid={"transparent"}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={ruleStyles.ruleBox}>
                <Text style={ruleStyles.ruleTitle}>Rule*:</Text>
                <Text style={ruleStyles.ruleDesc}>·Vote Will use a little CPU + Network Stake;</Text>
                <Text style={ruleStyles.ruleDesc}>·Vote Will use a little CPU + Network Stake;</Text>
                <Text style={ruleStyles.ruleDesc}>·Vote Will use a little CPU + Network Stake;</Text>
                <Text style={ruleStyles.ruleDesc}>·Vote Will use a little CPU + Network Stake;</Text>
                <Text style={ruleStyles.ruleDesc}>·Vote Will use a little CPU + Network Stake;</Text>
              </View>
              <View style={btnStyles.btnBox}>
                <Text style={btnStyles.btn} onPress={() => {}}>Confirm</Text>
              </View>
              <View style={styles.bodyFooterBox}>
                <View style={styles.bodyFooterFlg}></View>
              </View>
            </View>
        );
    }
}

// 挂载中间件到组件；
function mapDispatchToProps(  dispatch  ) {
    return {
        onDispatchGetAllAssetPost: () => dispatch( { type: "NODE_LIST_GET_ALL_ASSET_POST" } ),
    };
}

function mapStateToProps( state ) {
    return {
      state,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegatebwPage);
