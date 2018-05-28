// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions, Modal } from "react-native";
import {  storage } from "../../utils/storage";
import { injectIntl } from 'react-intl';

// 自定义组件
import { styles } from "./style";

class WalletPage extends Component {
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
        this.state = {
          show  :false,
          accountName : ""
        };
    }
    componentWillReceiveProps( nextProps ) {
      console.log(nextProps.allAsset);
    }
    componentDidMount() {
        // 获取数据
      this.props.onDispatchGetAccountInfoPost();
      this.props.onDispatchGetCurrencyBalancePost();
      this.props.onDispatchGetRefundsPost();
      this.props.onDispatchGetEOSPrice();
      storage.load({key: "accountName"}).then((ret) => {
        console.log("ret:",ret)
        if (ret) {
          this.setState({
            accountName : ret
        })
        } else {
          console.log("ret:",ret)
        }
      }).catch(err => {
        console.log("err:",err)
      });

    }
    render() {

//===============
// 缓存中获取  accountName

      const { account_name, cpu_weight, net_weight, total_resources, } = this.props.accountInfo;
      const { ram_bytes } = total_resources;
      const stake = net_weight + cpu_weight;
      const CurrencyBalance = this.props.CurrencyBalance;
      const Refunds = this.props.Refunds;
      const TotalAsset = stake + CurrencyBalance + Refunds;
      const TotalAssetByUsd = TotalAsset * this.props.EOSPrice;
        return (
            <View style={styles.bodyBox}>
              <View style={styles.contentBox}>
                <TouchableHighlight onPress={this._setModalVisible.bind(this)}>
                  <Text style={styles.titleTextTop}>Change Wallet</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.contentMain}>
                <Text style={styles.ContentTitleText}>EOS</Text>
                <View style={styles.ContentBg}>
                  <Text style={styles.ContentBgTopText}>{this.state.accountName}</Text>
                  <View style={styles.ContentBgMid}>
                    <Text style={styles.ContentBgMidText}>Total Assets</Text>
                    <View style={styles.ContentBgMidBack}>
                      <Text style={styles.ContentBgMidAccount}>{TotalAsset}&nbsp;
                        <Text style={styles.ContentBgMidName}>EOS</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ContentBgBottom}>
                    <Text style={styles.ContentBgBottomText}>= ${TotalAssetByUsd}</Text>
                  </View>
                </View>
              </View>


              <View style={styles.bottomContent}>
                <TouchableHighlight onPress={this.goVote} >
                  <Text style={styles.buttonSubmit}>Vote</Text>
                </TouchableHighlight>
              </View>
              <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.show}
                onShow={() => {}}
                onRequestClose={() => {}} >
                <View style={styles.modalStyle}>
                  <View style={styles.subView}>
                    <Text style={styles.titleText}>
                      Notice
                    </Text>
                    <Text style={styles.contentText}>
                        Please confirm that backup the EOS wallet before change it.
                    </Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.buttonView}>
                      <TouchableHighlight underlayColor='transparent'
                                          style={styles.buttonStyle}
                                          onPress={this._setModalVisible.bind(this)}>
                        <Text style={styles.buttonText}>
                          cancle
                        </Text>
                      </TouchableHighlight>
                      <View style={styles.verticalLine} />
                      <TouchableHighlight underlayColor='transparent'
                                          style={styles.buttonStyle}
                                          onPress={this.goImport}>
                        <Text style={styles.buttonText}>
                          ok
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal>

            </View>

        );
    }

  goImport= ()=>{
    this.props.navigation.replace("HomePage",{id:1});
  }
  // 显示/隐藏 modal
  _setModalVisible() {
    let isShow = this.state.show;
    this.setState({
      show:!isShow,
    });
  }

  goVote=()=>{
    this.props.navigation.replace("VoteIndexPage");
  }

}

// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
    return {
      onDispatchGetAccountInfoPost: () => dispatch({ type: "WALLET_ACCOUNTINFO_POST" }),
      onDispatchGetCurrencyBalancePost: () => dispatch({ type: "WALLET_CURRENCYBALANCE_POST" }),
      onDispatchGetRefundsPost: () => dispatch({ type: "WALLET_REFUNDS_POST" }),
      onDispatchGetEOSPrice: () => dispatch({ type: "EOS_PRICE_GET" }),
    };
}
function mapStateToProps(state) {
    return {
        allAsset: state.WalletPageReducer.allAsset,
        accountInfo: state.WalletPageReducer.accountInfo,
        CurrencyBalance: state.WalletPageReducer.CurrencyBalance,
        Refunds: state.WalletPageReducer.Refunds,
        EOSPrice: state.WalletPageReducer.EOSPrice,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletPage));
