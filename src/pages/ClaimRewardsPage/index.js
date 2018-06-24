/**
 * Created by dongjie on 20/6/18.
 */

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


class ClaimRewardsPage extends Component {
    static navigationOptions = ( props ) => {
        let title = I18n.t("ClaimRewards Title");
        return {
            title: title
        };
    };

    constructor( props ) {
        super(props);
        this.state = {
            countDownTime:0
        };
    }

    componentWillMount(){
        const { navigation } = this.props;
        const BPSelfInfo = navigation.getParam('BPSelfInfo');
        let [countDownTime, lastClaimTime] = calculateTime(BPSelfInfo.last_claim_time);
        this.setState({
            lastClaimTime,
            countDownTime
        })
    }

    componentDidMount(){
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
                })
            }else{
                this.setState({
                    accountPri: {},
                })
            }
        });
    }

    claim = () => {

        if(parseInt(this.state.countDownTime)<1000*60*60*24){
            Toast.show('You have claimed within 24 hours',{
                position: 36,
            });
        }else{
            this.props.onDispatchClaimRewards({...this.state.accountPri,nav: this.props.navigation})
        }
    }

    render() {

        const { navigation } = this.props;
        const BPSelfInfo = navigation.getParam('BPSelfInfo');


        return (
            <SafeAreaView style={[{flex:1}]}>
                {
                    this.props.isClaiming&&<LoadingView text="Waiting"/>
                }
                <ScrollView >

                    <View style={countStyles.countBox}>
                        <View style={countStyles.countItem}>
                            <Text style={countStyles.countName}>Total Votes</Text>
                            <Text style={countStyles.countValue}>
                                {parseFloat(BPSelfInfo.total_votes).toFixed(4)}
                            </Text>
                        </View>
                        <View style={[countStyles.countItem, {borderBottomWidth: 1,}]}>
                            <Text style={countStyles.countName}>Unpaid Blocks</Text>
                            <Text style={countStyles.countValue}>
                                {BPSelfInfo.unpaid_blocks}
                            </Text>
                        </View>
                        <View style={[countStyles.countItem, {borderBottomWidth: 0,}]}>
                            <Text style={countStyles.countName}>Last Claim Time</Text>
                            <Text style={countStyles.countValue}>
                                {this.state.lastClaimTime}
                            </Text>
                        </View>
                    </View>

                    <Text style={{marginTop:20,color:'grey',marginLeft:20}}>
                        Note: You can only claim once every 24 hours.
                    </Text>

                </ScrollView>

                <View style = {[styles.footerView]}>
                    <Text style={styles.footerSubmit}
                          onPress={this.claim}>
                        Claim Rewards
                    </Text>
                </View>
            </SafeAreaView>
        );
    }


}


const calculateTime = (lC) => {
    if(lC == 0){
        return [999999999, 'Never claimed before']
    }
    let nowTime = new Date();
    let CreatTime = new Date(lC/1000);
    CreatTime = CreatTime.getTime();
    let countDownTime = nowTime - CreatTime;

    console.log('time: ',lC, nowTime , CreatTime, countDownTime)

    if(countDownTime > 0 && countDownTime < 60000){
        return [countDownTime, '0h 1min ago']
    }

    const minutes = Math.floor(countDownTime/(1000*60)%(60));
    const hours = Math.floor(countDownTime/(1000*60*60)%24);
    const day = Math.floor(countDownTime/(1000*60*60*24));
    let cuntDownTimeStr = "";
    if(day == 0 && hours == 0 && minutes == 0){
        cuntDownTimeStr = "";
    }else if(day == 0){
        cuntDownTimeStr = hours + "h " + minutes + "m";
    }else if (day > 0) {
        cuntDownTimeStr= day + "d " + hours + "h";
    }

    return [countDownTime, cuntDownTimeStr + ' ago']

}

// 挂载中间件到组件；
function mapDispatchToProps( dispatch ) {
    return {
        onDispatchClaimRewards: (data) => dispatch({ type: "CLAIMREWARDS_CLAIM_POST", data }),
    };
}

function mapStateToProps( state ) {

    return {
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        isClaiming: state.ClaimRewardsReducer.isClaiming,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimRewardsPage);
