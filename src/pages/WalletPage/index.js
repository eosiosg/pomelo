// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, View, Text, Image, TouchableHighlight, Dimensions, Modal } from "react-native";

// 自定义组件
import { styles } from "./style";

class WalletPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
          show  :false,
        };
    }
    componentWillReceiveProps( nextProps ) {
      console.log(nextProps.allAsset);
    }
    componentDidMount() {
        // 获取数据
        this.props.onDispatchGetAllAssetPost();
    }
    render() {
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
                  <Text style={styles.ContentBgTopText}>userName1213</Text>
                  <View style={styles.ContentBgMid}>
                    <Text style={styles.ContentBgMidText}>Total Assets</Text>
                    <View style={styles.ContentBgMidBack}>
                      <Text style={styles.ContentBgMidAccount}>3223.00&nbsp;
                        <Text style={styles.ContentBgMidName}>EOS</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ContentBgBottom}>
                    <Text style={styles.ContentBgBottomText}>= $23132</Text>
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
    this.props.navigation.replace("HomePage");
  }
  // 显示/隐藏 modal
  _setModalVisible() {
    let isShow = this.state.show;
    this.setState({
      show:!isShow,
    });
  }

  goVote=()=>{

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
export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);
