import { chainId } from '../../config/configParams';
let nodeAddress = '';

import { nodeAddressList as nodes } from '../../config/configParams';
let nodeAddressList = [].concat(nodes);
nodeAddressList.sort(function(a, b){return 0.5 - Math.random()});

nodeAddress = nodeAddressList[0];

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

