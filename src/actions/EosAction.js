import { chainId } from '../../config/configParams';
let nodeAddress = 'http://13.251.3.82:8888';
import { storage } from "../utils/storage";
import { put, call} from "redux-saga/effects";



import { nodeAddressList as nodes } from '../../config/configParams';
let nodeAddressList = [].concat(nodes);


async function getConfig(accountPrivateKey){

    console.log('===========: get storage');
    let config = await storage.load({key: "HomePageNetStorage"}).then( ( ret ) => {
        if ( ret ) {
            console.log('===========: ', ret);
            if ( ret && ret.netURL ) {
                return {
                    keyProvider: accountPrivateKey, // WIF string or array of keys..
                    httpEndpoint: ret.netURL,
                    expireInSeconds: 60,
                    broadcast: true,
                    debug: false,
                    sign: true,
                    chainId: ret.chain_id,
                };

            }
        }
    }).catch( err => {
        console.log(err);
    });
    return config
}

export async function GetEOS( accountPrivateKey ) {

    try {
        const Eos = require( 'eosjs' );
        let config = await getConfig(accountPrivateKey);
        let eos = Eos.Testnet( config );
        return eos;

  } catch ( error ) {
    return null;
  }
}


export function EOSGetInfo( eos, callback ) {
    console.log( '============== EOSGetInfo ==================' );
    try {
        eos.getInfo( {} )
            .then( function ( result ) {
                console.log( 'EOSGetInfo result: ' + JSON.stringify( result ) );

                callback && callback( null, result );
            } )
            .catch( function ( error ) {
                console.log( 'EOSGetInfo error: ' + error.message );

                callback && callback( error, null )
            } );
    } catch ( ignored ) {
    }
}



export function EOSGetCurrencyBalance( eos, accountName, callback ) {
    console.log( '============== EOSGetCurrencyBalance ==================' );
    eos.getCurrencyBalance( {
        "code": "eosio.token",
        "account": accountName,
    } )
        .then( function ( result ) {
            // 4.1版本如果Balance为0,返回空数组
            console.log( 'EOSGetCurrencyBalance result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSGetCurrencyBalance error: ' + error.message );

            callback && callback( error, null )
        } );
}

export function EOSNewAccount( eos, newAccountName, publicKey, callback ) {
    console.log( '============== EOSNewAccount ==================' );

    eos.transaction( tr => {
        tr.newaccount( {
            creator: 'eosiomeetone',
            name: newAccountName,
            owner: publicKey,
            active: publicKey
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
    } )
        .then( function ( result ) {
            console.log( 'EOSNewAccount result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSNewAccount error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSTransfer( eos, fromAccountName, toAccountName, callback ) {
    console.log( '============== EOSTransfer ==================' );
    eos.transfer( {
        from: fromAccountName,
        to: toAccountName,
        quantity: '1000.0000 EOS',
        memo: ''
    }, true )
        .then( function ( result ) {
            console.log( 'EOSTransfer result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSTransfer error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSVoteProducer( eos, accountName, producers, callback ) {
    console.log( '============== EOSVoteProducer ==================' );
    eos.voteproducer( {
        voter: accountName,
        proxy: '',
        producers: producers
    } )
        .then( function ( result ) {
            console.log( 'EOSVoteProducer result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSVoteProducer error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSVoteProxy( eos, voterAccountName, proxyAccountName, callback ) {
    console.log( '============== EOSVoteProxy ==================' );
    eos.transaction( tr => {
        // vote proxy
        tr.voteproducer( {
            voter: voterAccountName,
            proxy: proxyAccountName,
            producers: ''
        } );
    } )
        .then( function ( result ) {
            console.log( 'EOSVoteProxy result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSVoteProxy error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSGetBlockProducerList( eos, callback ) {
    console.log( '============== get block producer list==================' );
    eos.getProducers( { json: true } )
        .then( function ( result ) {
            console.log( 'EOSGetBlockProducerList result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSGetBlockProducerList error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSDelegatebw( eos, fromAccountName, receiverAccountName, callback ) {
    console.log( '============== EOSDelegatebw ==================' );
    eos.delegatebw( {
        from: fromAccountName,
        receiver: receiverAccountName,
        stake_net_quantity: '10.0000 EOS',
        stake_cpu_quantity: '10.0000 EOS',
        transfer: 0
    } )
        .then( function ( result ) {
            console.log( 'EOSDelegatebw result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSDelegatebw error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSUndelegatebw( eos, fromAccountName,receiveAccountName, callback ) {
    console.log( '============== EOSUndelegatebw ==================' );
    eos.undelegatebw( {
        from: fromAccountName,
        receiver: receiveAccountName,
        unstake_net_quantity: "10.0000 EOS",
        unstake_cpu_quantity: "10.0000 EOS"
    } )
        .then( function ( result ) {
            console.log( 'EOSUndelegatebw result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSUndelegatebw error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSBuyram( eos, accountName, callback ) {
    console.log( '============== EOSBuyram ==================' );
    eos.transaction( tr => {
        tr.buyram( {
            "payer": accountName,
            "receiver": accountName,
            "quant": "1.0000 EOS"
        } );
    } )
        .then( function ( result ) {
            console.log( 'EOSBuyram result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSBuyram error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSSellram( eos, accountName, callback ) {
    console.log( '============== EOSSellram ==================' );
    eos.transaction( tr => {
        tr.sellram( {
            "account": accountName,
            "bytes": "1000"
        } );
    } )
        .then( function ( result ) {
            console.log( 'EOSSellram result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSSellram error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSRegproxy( eos, accountName, callback ) {
    console.log( '============== EOSRegproxy ==================' );
    eos.transaction( tr => {
        tr.regproxy( {
            "proxy": accountName,
            "isproxy": 1
        } );
    } )
        .then( function ( result ) {
            console.log( 'EOSRegproxy result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSRegproxy error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSRefund( eos, accountName, callback ) {
    console.log( '============== EOSRefund ==================' );
    eos.transaction( tr => {
        tr.refund( {
            owner: accountName
        } );
    } )
        .then( function ( result ) {
            // https://github.com/EOSIO/eos/blob/032300df7f6e7277179018d76428a14109f3a48e/contracts/eosio.system/delegate_bandwidth.cpp#L411
            // eosio_assert( req->request_time + refund_delay <= now(), "refund is not available yet" );
            console.log( 'EOSRefund result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSRefund error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSRefunding( eos, accountName, callback ) {
    console.log( '============== EOSRefunding ==================' );

    eos.getTableRows( {
        'json': true,
        'code': 'eosio',
        'scope': accountName,
        'table': 'refunds',
        'table_key': 'owner'
    } )
        .then( function ( result ) {
            console.log( 'EOSRefunding result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSRefunding error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSGetActions( eos, accountName, callback ) {
    console.log( '============== EOSGetActions ==================' );
    eos.getActions( { 'account_name': accountName, 'pos': 1, 'offset': 1 } )
        .then( function ( result ) {
            console.log( 'EOSGetActions result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSGetActions error: ' + error.message );

            callback && callback( error, null );
        } );
}

export function EOSGetAccountNamesByPublicKey( eos, publicKey, callback ) {
    console.log( '============== EOSGetAccountNamesByPublicKey ==================' );

    eos.getKeyAccounts( { 'public_key': publicKey } )
        .then( function ( result ) {
            console.log( 'EOSGetAccountNamesByPublicKey result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSGetAccountNamesByPublicKey error: ' + error.message );

            callback && callback( error, null );
        } );
}
