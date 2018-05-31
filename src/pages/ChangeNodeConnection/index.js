/**
 * Created by dongjie on 31/5/18.
 */

// 引入公共组件
import React, { Component } from "react";
import {connect} from "react-redux";
import { ScrollView, View, Text, Image, TouchableHighlight, SafeAreaView, TouchableOpacity, Dimensions, Modal } from "react-native";
// 自定义组件
import { styles } from "./style";
import I18n from "../../../I18n";
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
import LoadingView from '../../commonComponents/loading'

class ChangeNodeConnection extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Change Node'
        };
    };

    constructor (props) {
        super(props);

        this.state = {
        };


    }

    componentWillReceiveProps( nextProps ) {}

    componentDidMount() {

    }


    render() {

        // const VoteDescIntl = I18n.t(messages.VoteDesc);
        // const UndelegatebwIntl = I18n.t(messages.Undelegatebw);
        // const AddDelegatebwIntl = I18n.t(messages.AddDelegatebw);
        // const RevoteIntl = I18n.t(messages.Revote);
        // const VotedBpsIntl = I18n.t(messages.VotedBps);



        return (
            <SafeAreaView style={[{flex:1}]}>

                <ScrollView>
                    <Text>
                        Eos Network
                    </Text>
                    <View style={[styles.nodeContainer]}>
                        <View style={{flex:2}}>
                            <Image style={[styles.image]} source={{uri:'https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png'}}/>
                        </View>
                        <View style={{flex:8}}>
                            <Text style={{flex:1}}>
                                Meet.ONE
                            </Text>
                            <Text style={{flex:1}}>
                                http://meet.one
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.nodeContainer]}>
                        <View style={{flex:2}}>
                            <Image style={[styles.image]} source={{uri:'https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png'}}/>
                        </View>
                        <View style={{flex:8}}>
                            <Text style={{flex:1}}>
                                Meet.ONE
                            </Text>
                            <Text style={{flex:1}}>
                                http://meet.one
                            </Text>
                        </View>
                    </View>
                    <Text>
                        EOS Testnet
                    </Text>
                    <View style={[styles.nodeContainer]}>
                        <View style={{flex:2}}>
                            <Image style={[styles.image]} source={{uri:'https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png'}}/>
                        </View>
                        <View style={{flex:8}}>
                            <Text style={{flex:1}}>
                                Meet.ONE
                            </Text>
                            <Text style={{flex:1}}>
                                http://meet.one
                            </Text>
                        </View>
                    </View>

                </ScrollView>



            </SafeAreaView>
        );
    }



}

// 挂载中间件到组件；
function mapDispatchToProps(dispatch) {
    return {

    };
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeNodeConnection);
