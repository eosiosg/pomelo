import React, { Component } from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";
import {
    EOSBuyram,
    EOSDelegatebw,
    EOSGetAccount,
    EOSGetAccountNamesByPublicKey,
    EOSGetActions,
    EOSGetBlock,
    EOSGetBlockProducerList,
    EOSGetCurrencyBalance,
    EOSGetInfo,
    EOSInit,
    EOSNewAccount,
    EOSRefunding,
    EOSRegproxy,
    EOSSellram,
    EOSTransfer,
    EOSUndelegatebw,
    EOSVoteProducer,
    EOSVoteProxy
} from "../../actions/EosAction";
import Toast from "react-native-root-toast";

class TestPage extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: 'EOS Wallet Test',
        };
    };


    constructor( props ) {
        super( props );
        this.state = {};
    }

    componentWillReceiveProps( nextProps ) {

    }

    componentDidMount() {

    }


    doGetBlock() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                EOSGetBlock( result.eos, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doGetBlock Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doGetInfo() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                EOSGetInfo( result.eos, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doGetInfo Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doGetAccount() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                EOSGetAccount( result.eos, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doGetAccount Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doGetCurrencyBalance() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                let accountName = 'eosiomeetone';

                EOSGetCurrencyBalance( result.eos, accountName, ( error, result ) => {
                    if ( error ) {
                        Toast.show( "doGetCurrencyBalance Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doNewAccount() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                let accountName = 'eosiomeet345';

                EOSNewAccount( result.eos, accountName, result.publicKey, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doNewAccount Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doTransfer() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                let accountName = 'eosiomeetone';

                EOSTransfer( result.eos, accountName, "meetone33333", ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doTransfer Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doVoteProducer() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                let accountName = 'eosiomeetone';

                EOSVoteProducer( result.eos, accountName, [ 'eosiomeetone' ], ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doVoteProducer Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doVoteProxy() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                EOSVoteProxy( result.eos, "meetone33333", "meetone11111", ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doVoteProxy Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doGetBlockProducerList() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                EOSGetBlockProducerList( result.eos, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doGetBlockProducerList Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doDelegatebw() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSDelegatebw( result.eos, accountName, "meetone33333", ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doDelegatebw Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doUndelegatebw() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSUndelegatebw( result.eos, accountName, "eosiomeetone", ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doUndelegatebw Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doBuyram() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSBuyram( result.eos, accountName, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doBuyram Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doSellram() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSSellram( result.eos, accountName, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doSellram Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doRegproxy() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSRegproxy( result.eos, accountName, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doRegproxy Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }


    doRefunding() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSRefunding( result.eos, accountName, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doRefunding Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doGetActions() {

        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {

                let accountName = 'eosiomeetone';
                EOSGetActions( result.eos, accountName, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doGetActions Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    doGetAccountNameByPublicKey() {
        const privateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        EOSInit( privateKey, ( error, result ) => {
            if ( !error ) {
                EOSGetAccountNamesByPublicKey( result.eos, result.publicKey, ( error, result ) => {
                    if ( !error ) {
                        Toast.show( "doGetAccountNameByPublicKey Success" )
                    } else {
                        Toast.show( error.message );
                    }
                } )
            } else {
                Toast.show( error.message );
            }
        } )
    }

    render() {

        return (
            <SafeAreaView style={[ { flex: 1 } ]}>
                <View style={[ { flex: 1 } ]}>
                    <ScrollView>
                        <View style={[ { paddingTop: 20, paddingBottom: 20 } ]}>
                            <Button
                                onPress={() => {
                                    this.doGetBlock();
                                }}
                                title="getBlock"
                            />

                            <Button
                                onPress={() => {
                                    this.doGetInfo();
                                }}
                                title="getInfo"
                            />

                            <Button
                                onPress={() => {
                                    this.doGetAccount();
                                }}
                                title="getAccount"
                            />

                            <Button
                                onPress={() => {
                                    this.doGetAccountNameByPublicKey();
                                }}
                                title="getAccountNameByPublicKey"
                            />

                            <Button
                                onPress={() => {
                                    this.doGetCurrencyBalance();
                                }}
                                title="getCurrencyBalance"
                            />

                            <Button
                                onPress={() => {
                                    this.doNewAccount();
                                }}
                                title="newAccount"
                            />

                            <Button
                                onPress={() => {
                                    this.doTransfer();
                                }}
                                title="transfer"
                            />

                            <Button
                                onPress={() => {
                                    this.doVoteProducer();
                                }}
                                title="voteProducer"
                            />

                            <Button
                                onPress={() => {
                                    this.doVoteProxy();
                                }}
                                title="voteProxy"
                            />

                            <Button
                                onPress={() => {
                                    this.doGetBlockProducerList();
                                }}
                                title="getBlockProducerList"
                            />

                            <Button
                                onPress={() => {
                                    this.doDelegatebw();
                                }}
                                title="delegatebw"
                            />

                            <Button
                                onPress={() => {
                                    this.doUndelegatebw();
                                }}
                                title="undelegatebw"
                            />

                            <Button
                                onPress={() => {
                                    this.doBuyram();
                                }}
                                title="buyram"
                            />

                            <Button
                                onPress={() => {
                                    this.doSellram();
                                }}
                                title="sellram"
                            />

                            <Button
                                onPress={() => {
                                    this.doRegproxy();
                                }}
                                title="regproxy"
                            />

                            <Button
                                onPress={() => {
                                    this.doRefunding();
                                }}
                                title="refunding"
                            />

                            <Button
                                onPress={() => {
                                    this.doGetActions();
                                }}
                                title="getActions"
                            />
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default TestPage;
