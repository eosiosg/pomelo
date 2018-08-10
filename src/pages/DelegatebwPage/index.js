// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import {ScrollView, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, Linking } from "react-native";
// 自定义组件
import Toast from "react-native-root-toast";
import I18n from "../../../I18n";
import { styles, countStyles, stakeStyles, ruleStyles, btnStyles } from "./style";
import { decryptObject, storage } from "../../utils/storage";
import LoadingView from '../../commonComponents/loading'

const NoNegative = I18n.t("DelegatebwPage NoNegative");
const UseValidValue = I18n.t("DelegatebwPage UseValidValue");
const NoEnoughBW = I18n.t("DelegatebwPage NoEnoughBW");
const Available = I18n.t("DelegatebwPage Available");

import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

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
      const CurrencyBalance = (this.props.CurrencyBalance).toFixed(4);
      const refunds = (this.props.Refunds).toFixed(4);

      const availableBW = (Number(CurrencyBalance) + Number(refunds)).toFixed(4);

      const CPU_placeholder = `${(Number(this.props.CurrencyBalance) + Number(this.props.RefundMoneyDetail.cpu)).toFixed(4)} ${Available}`;
      const Network_placeholder = `${(Number(this.props.CurrencyBalance) + Number(this.props.RefundMoneyDetail.net)).toFixed(4)} ${Available}`;

      const BalanceIntl = I18n.t("DelegatebwPage availableBW");
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





      // return <View style={styles.container}>
      //   <RNCamera
      //     ref={ref => {
      //       this.camera = ref;
      //     }}
      //     style = {styles.preview}
      //     type={RNCamera.Constants.Type.back}
      //     flashMode={RNCamera.Constants.FlashMode.on}
      //     permissionDialogTitle={'Permission to use camera'}
      //     permissionDialogMessage={'We need your permission to use your camera phone'}
      //   />
      //   <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
      //     <TouchableOpacity
      //       onPress={this.takePicture.bind(this)}
      //       style = {styles.capture}
      //     >
      //       <Text style={{fontSize: 14}}> SNAP </Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>









      // const styless = StyleSheet.create({
      //   centerText: {
      //     flex: 1,
      //     fontSize: 18,
      //     padding: 32,
      //     color: '#777',
      //   },
      //   textBold: {
      //     fontWeight: '500',
      //     color: '#000',
      //   },
      //   buttonText: {
      //     fontSize: 21,
      //     color: 'rgb(0,122,255)',
      //   },
      //   buttonTouchable: {
      //     padding: 16,
      //   },
      // });

      // onSuccess(e){
      //   Linking
      //     .openURL(e.data)
      //     .catch(err => console.error('An error occured', err));
      // }


//       return (
//   <QRCodeScanner
//     // onRead={this.onSuccess.bind(this)}
//     topContent={
//       <Text style={styles.centerText}>
//         Go to <Text style={styless.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
//       </Text>
//     }
//     bottomContent={
//       <TouchableOpacity style={styless.buttonTouchable}>
//         <Text style={styless.buttonText}>OK. Got it!</Text>
//       </TouchableOpacity>
//     }
//   />
// )

        return (
            <SafeAreaView style={[{flex:1}]}>
                {
                    this.props.loading&&<LoadingView text="Waiting"/>
                }

            <View style={[styles.bodyBox, {flex:1,justifyContent:'space-between'}]}>
            <View>
              <ScrollView>
                <View style={countStyles.countBox}>
                  <View style={countStyles.countItem}>
                    <Text style={countStyles.countName}>{BalanceIntl}</Text>
                    <Text style={countStyles.countValue}>
                      {availableBW} <Text style={countStyles.countValueUnit}>EOS</Text>
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
            </View>
              <View style={btnStyles.btnBox}>
                <Text style={btnStyles.btn} onPress={() => this.DelegatebwConfirmFn()}>{ConfirmIntl}</Text>
              </View>
            </View>
            </SafeAreaView>
        );
    }

    IsStateCpuLegal = () => {

        if(this.state.CPU<0){
            Toast.show(NoNegative,{
                position: 30,
            });
            return false
        }else if(Number(this.props.CurrencyBalance) + Number(this.props.RefundMoneyDetail.cpu) < Number(this.state.CPU) ){
            Toast.show('CPU <' +(Number(this.props.CurrencyBalance) + Number(this.props.RefundMoneyDetail.cpu)).toFixed(4),{
                position: 30,
            });
            return false
        }else{
            return true
        }
    };

    IsStateNetworkLegal = () => {
        if(this.state.Network<0){
            Toast.show(NoNegative,{
                position: 30,
            });
            return false
        }else if(Number(this.props.CurrencyBalance) + Number(this.props.RefundMoneyDetail.net) < Number(this.state.Network) ){
            Toast.show('network <' +(Number(this.props.CurrencyBalance) + Number(this.props.RefundMoneyDetail.net)).toFixed(4),{
                position: 30,
            });
            return false
        }else{
            return true
        }
    };

    DelegatebwConfirmFn = () => {
        console.log(`use: `,(Number(this.state.CPU) + Number(this.state.Network)), 'have ', (Number(this.props.CurrencyBalance)+Number(this.props.Refunds)),(Number(this.state.CPU) + Number(this.state.Network)) > (Number(this.props.CurrencyBalance)+Number(this.props.Refunds)));
        if(!this.state.CPU && !this.state.Network){
            Toast.show(UseValidValue,{
                position: 30,
            });
            return
        }else if((Number(this.state.CPU) + Number(this.state.Network)) > (Number(this.props.CurrencyBalance)+Number(this.props.Refunds))){
            Toast.show(NoEnoughBW,{
                position: 30,
            });
            return
        }else if(!this.IsStateCpuLegal() || !this.IsStateNetworkLegal()){
            return
        }

      storage.load({key: "HomePageStorage"}).then((ret1) => {
        if (ret1) {
          const ret = decryptObject( ret1 );
          const accountPrivateKey = ret.accountPrivateKey;
          const accountName = ret.accountName;
          const data = {
            from: accountName,
            receiver: accountName,
            stake_net_quantity: Number(this.state.Network) + " EOS",
            stake_cpu_quantity: Number(this.state.CPU) + " EOS",
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
        BPs: state.VoteIndexPageReducer.BPs,
        USD: state.VoteIndexPageReducer.USD,
        Refunds: state.VoteIndexPageReducer.Refunds||0,
        RefundMoneyDetail: state.VoteIndexPageReducer.refundMoneyDetail,

        loading : state.DelegatebwPageReducer.loading,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegatebwPage);
