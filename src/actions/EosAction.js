const chainId = '706a7ddd808de9fc2b8879904f3b392256c83104c1d544b38302cc07d9fca477';
let nodeAddress = 'http://13.229.70.163:8888';

// const nodeAddressList = [
//     'http://13.229.70.163:8888',
//     'http://52.74.197.107:8888',
//     'http://13.229.70.163:8888'
// ];
//
// function getNodeAddress(){
//     let randomNum = parseInt(10*Math.random())%nodeAddressList.length;
//     nodeAddress = randomNum;
// }
//
// getNodeAddress();

export function GetEOS( accountPrivateKey ) {
  try {
    const Eos = require( 'eosjs' );
    const config = {
      keyProvider: accountPrivateKey, // WIF string or array of keys..
      httpEndpoint: nodeAddress,
      expireInSeconds: 60,
      broadcast: true,
      debug: false,
      sign: true,
      chainId: chainId,
    };
    let eos = Eos.Testnet( config );
    return eos;
  } catch ( error ) {
    return null;
  }
}

export function EOSGetPublicKey( privateKey, callback ) {
    console.log( '============== EOSGetPublicKey ==================' );

    try {
        const Eos = require( 'eosjs' );

        const { ecc } = Eos.modules;

        // private key to public key
        let publicKey = ecc.privateToPublic( accountPrivateKey );

        const result = {
            publicKey: publicKey
        };

        console.log( 'EOSGetPublicKey result: ' + JSON.stringify( result ) );

        callback && callback( null, result );
    } catch ( error ) {
        console.log( 'EOSGetPublicKey error: ' + error.message );

        callback && callback( error, null );
    }
}

export function EOSInit( accountPrivateKey, callback ) {
    console.log( '============== EOSInit ==================' );

    try {
        const Eos = require( 'eosjs' );

        const { ecc } = Eos.modules;

        // private key to public key
        let publicKey = ecc.privateToPublic( accountPrivateKey );

        const config = {
            keyProvider: accountPrivateKey, // WIF string or array of keys..
            httpEndpoint: nodeAddress,
            expireInSeconds: 60,
            broadcast: true,
            debug: false,
            sign: true,
            chainId: chainId,
        };
        let eos = Eos.Testnet( config );

        EOSGetAccountNamesByPublicKey( eos, publicKey, ( error, result1 ) => {
            if ( !error ) {
                const result = {
                    eos: eos,
                    publicKey: publicKey,
                    accountNames: result1.account_names
                };

                console.log( 'EOSInit result: ' + JSON.stringify( result ) );

                callback && callback( null, result );
            } else {
                console.log( 'EOSInit error: ' + error.message );

                callback && callback( error, null );
            }
        } );

    } catch ( error ) {
        console.log( 'EOSInit error: ' + error.message );

        callback && callback( error, null );
    }
}

export function EOSGetBlock( eos, callback ) {
    console.log( '============== EOSGetBlock ==================' );
    try {
        eos.getBlock( '0004484ac4a859fd3c67005cfb1b31b9ad9180e03ab3c8307355fabd18694a72' )
            .then( function ( result ) {
                console.log( 'EOSGetBlock result: ' + JSON.stringify( result ) );

                callback && callback( null, result );
            } )
            .catch( function ( error ) {
                console.log( 'EOSGetBlock error: ' + error.message );

                callback && callback( error, null )
            } );
    } catch ( ignored ) {
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

export function EOSGetAccount( eos, callback ) {
    console.log( '============== EOSGetAccount ==================' );
    eos.getAccount( { 'account_name': 'meetone33333' } )
        .then( function ( result ) {
            console.log( 'EOSGetAccount result: ' + JSON.stringify( result ) );

            callback && callback( null, result );
        } )
        .catch( function ( error ) {
            console.log( 'EOSGetAccount error: ' + error.message );

            callback && callback( error, null )
        } );
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
            stake_net_quantity: '100.0000 SYS',
            stake_cpu_quantity: '100.0000 SYS',
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
        quantity: '1000.0000 SYS',
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
        stake_net_quantity: '10.0000 SYS',
        stake_cpu_quantity: '10.0000 SYS',
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
        unstake_net_quantity: "10.0000 SYS",
        unstake_cpu_quantity: "10.0000 SYS"
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
            "quant": "1.0000 SYS"
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
