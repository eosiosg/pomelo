import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

// import Eos from 'eosjs';

export default class App extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {};

        const Eos = require( 'eosjs' );

        const { ecc } = Eos.modules;

        this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
        this.accountName = 'eosiomeetone';
        //        let accountName = 'meetonetest1';
        // private key to public key
        this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
        console.log( this.accountPublicKey );
        let nodeAddress = 'http://13.229.70.163:8888';
        config = {
            keyProvider: this.accountPrivateKey, // WIF string or array of keys..
            httpEndpoint: nodeAddress,
//    mockTransactions: () => 'pass', // or 'fail'
//    transactionHeaders: (expireInSeconds, callback) => {
//      callback(null/*error*/, headers)
//    },
            expireInSeconds: 60,
            broadcast: true,
            debug: false,
            sign: true
        };
        this.eos = Eos.Testnet( config );
        console.log( this.eos );
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    shouldComponentUpdate( nextProps, nextState ) {
        return false;
    }

    componentWillReceiveProps( nextProps ) {

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={[ { paddingTop: 20, paddingBottom: 20 } ]}>
                        <Button
                            onPress={() => {
                                this.getBlock();
                            }}
                            title="getBlock"
                        />

                        <Button
                            onPress={() => {
                                this.getInfo();
                            }}
                            title="getInfo"
                        />

                        <Button
                            onPress={() => {
                                this.getAccount();
                            }}
                            title="getAccount"
                        />

                        <Button
                            onPress={() => {
                                this.getCurrencyBalance();
                            }}
                            title="getCurrencyBalance"
                        />

                        <Button
                            onPress={() => {
                                this.newAccount();
                            }}
                            title="newAccount"
                        />

                        <Button
                            onPress={() => {
                                this.transfer();
                            }}
                            title="transfer"
                        />

                        <Button
                            onPress={() => {
                                this.voteProducer();
                            }}
                            title="voteProducer"
                        />

                        <Button
                            onPress={() => {
                                this.voteProxy();
                            }}
                            title="voteProxy"
                        />

                        <Button
                            onPress={() => {
                                this.getBlockProducerList();
                            }}
                            title="getBlockProducerList"
                        />

                        <Button
                            onPress={() => {
                                this.delegatebw();
                            }}
                            title="delegatebw"
                        />

                        <Button
                            onPress={() => {
                                this.undelegatebw();
                            }}
                            title="undelegatebw"
                        />

                        <Button
                            onPress={() => {
                                this.buyram();
                            }}
                            title="buyram"
                        />

                        <Button
                            onPress={() => {
                                this.sellram();
                            }}
                            title="sellram"
                        />

                        <Button
                            onPress={() => {
                                this.regproxy();
                            }}
                            title="regproxy 失败"
                        />

                        <Button
                            onPress={() => {
                                this.refund();
                            }}
                            title="refund 失败"
                        />

                        <Button
                            onPress={() => {
                                this.getActions();
                            }}
                            title="getActions 失败"
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }

    getBlock() {
        console.log( '==============get block==================' );
        this.eos.getBlock( '0004484ac4a859fd3c67005cfb1b31b9ad9180e03ab3c8307355fabd18694a72' ).then( ( res ) => {
            console.log( res );
        } );
    }

    getInfo() {
        console.log( '==============get info==================' );
        this.eos.getInfo( {} ).then( ( res ) => {
            console.log( res );
        } );
    }

    getAccount() {
        console.log( '==============get account info==================' );
        this.eos.getAccount( { 'account_name': this.accountName } ).then( result => {
            console.log( result );
        } );
    }

    getCurrencyBalance() {
        console.log( '==============get currency balance==================' );
        this.eos.getCurrencyBalance( {
            "code": "eosio.token",
            "account": this.accountName,
        } ).then( ( res ) => {
            // 4.1版本如果Balance为0,返回空数组
            console.log( res );
        } );
    }

    newAccount() {
        console.log( '==============new account==================' );
        var newAccountName = 'meetonetests';
        this.eos.transaction( tr => {
            tr.newaccount( {
                creator: 'eosiomeetone',
                name: newAccountName,
                owner: this.accountPublicKey,
                active: this.accountPublicKey
            } );
            tr.buyrambytes( {
                payer: 'eosiomeetone',
                receiver: newAccountName,
                bytes: 10000
            } );
            tr.delegatebw( {
                from: 'eosiomeetone',
                receiver: newAccountName,
                stake_net_quantity: '100.0000 EOS',
                stake_cpu_quantity: '100.0000 EOS',
                transfer: 0
            } );
        } ).then( function ( result ) {
            console.log( result );
        } ).catch( function ( error ) {
            if ( error ) {
                console.log( error );
            }
        } );
    }

    transfer() {
        console.log( '==============transfer ==================' );
        this.eos.transaction( tr => {
            tr.transfer( {
                from: this.accountName,
                to: "meetonetest1",
                quantity: "1000.0000 EOS",
                memo: "transfer test"
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    voteProducer() {
        console.log( '============== voteproducer ==================' );
        this.eos.transaction( tr => {
            tr.voteproducer( {
                voter: this.accountName,
                proxy: '',
                producers: [ 'eosiomeetone' ]
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    voteProxy() {
        console.log( '============== voteProxy ==================' );
        this.eos.transaction( tr => {
            // vote proxy
            tr.voteproducer( {
                voter: 'meetonetest1',
                proxy: 'eosiomeetone',
                producers: ''
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    getBlockProducerList() {
        console.log( '============== get block producer list==================' );
        this.eos.getProducers( { json: true } ).then( result => {
            console.log( result );
        } );
    }

    delegatebw() {
        console.log( '============== delegatebw ==================' );
        this.eos.transaction( tr => {
            tr.delegatebw( {
                from: this.accountName,
                receiver:this. accountName,
                stake_net_quantity: '10.0000 EOS',
                stake_cpu_quantity: '10.0000 EOS',
                transfer: 0
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    undelegatebw() {
        console.log( '============== undelegatebw ==================' );
        this.eos.transaction( tr => {
            tr.undelegatebw( {
                from: "eosiomeetone",
                receiver: "eosiomeetone",
                unstake_net_quantity: "100.0000 EOS",
                unstake_cpu_quantity: "100.0000 EOS"
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    buyram() {
        console.log( '============== buyram ==================' );
        this.eos.transaction( tr => {
            tr.buyram( {
                "payer":this. accountName,
                "receiver": this.accountName,
                "quant": "1.0000 EOS"
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    sellram() {
        console.log( '============== sellram ==================' );
        this.eos.transaction( tr => {
            tr.sellram( {
                "account":this. accountName,
                "bytes": "1000"
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    regproxy() {
        console.log( '============== regproxy ==================' );
        this.eos.transaction( tr => {
            tr.regproxy( {
                "proxy": this.accountName,
                "isproxy": 1
            } );
        } ).then( function ( result ) {
            console.log( result );
        } );
    }

    refund() {
        console.log( '============== refund ==================' );
        this.eos.transaction( tr => {
            tr.refund( {
                owner: "eosiomeetone"
            } );
        } ).then( function ( result ) {
            // https://github.com/EOSIO/eos/blob/032300df7f6e7277179018d76428a14109f3a48e/contracts/eosio.system/delegate_bandwidth.cpp#L411
            // eosio_assert( req->request_time + refund_delay <= now(), "refund is not available yet" );
            console.log( result );
        } ).catch( function ( error ) {
            if ( error ) {
                console.log( JSON.parse( error ) );
            }
        } );
    }

    getActions() {
        console.log( '============== getActions ==================' );
        this.eos.getActions( { 'account_name':this.accountName, 'pos': 1, 'offset': 1 } ).then( ( error, result ) => {
            console.log( '==============get account info==================' );
            console.log( error );
            console.log( result );
        } );
    }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
} );
