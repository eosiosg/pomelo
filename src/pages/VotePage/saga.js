/**
 * Created by dongjie on 24/5/18.
 */


import { put, call} from "redux-saga/effects";

import { GetEOS, EOSVoteProducer,EOSGetInfo } from "../../actions/EosAction";

// 创建假数据
const votingList = [
    {
        id: 0,
        title: "eosio.sg",
    },
    {
        id: 1,
        title: "meet.one",
    },
    {
        id: 2,
        title: "canon",
    },
    {
        id: 3,
        title: "eoscananda",
    },
];


export function* getVotingList(action) {
    let eos = GetEOS('5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq');
    console.log('eos',eos);
    //
    // const Eos = require( 'eosjs' );
    // const config = {
    //     keyProvider: accountPrivateKey, // WIF string or array of keys..
    //     httpEndpoint: nodeAddress,
    //     expireInSeconds: 60,
    //     broadcast: true,
    //     debug: false,
    //     sign: true,
    //     chainId: chainId,
    // };
    // let eos = Eos.Testnet( config )



    // const Eos = require( 'eosjs' );
    //
    // let accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
    // let accountName = 'eosiomeetone';
    // let nodeAddress = 'http://13.229.70.163:8888';
    //
    // // let nodeAddress = 'http://52.77.224.13:8888';
    // const config = {
    //     keyProvider: accountPrivateKey,
    //     httpEndpoint: nodeAddress,
    //     expireInSeconds: 60,
    //     broadcast: true,
    //     debug: false,
    //     sign: true
    // };
    // let eos = Eos.Testnet( config );
    // console.log( '==============get account info==================' );
    // eos.getAccount( { 'account_name': accountName } ).then( result => {
    //     console.log( result );
    // } );




    try{
        EOSGetInfo(eos, function* (err, result){
            if(err){
                console.log('fail');
                yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: [{id: 3, title: "eoscananda",}] });
            }else{
                console.log('success');
                // 根据返回数据，渲染结果
                yield put({ type: "VOTE_GETLIST_REDUCER", data: votingList });
            }
        })
    }catch(err){
        console.log(err);
    }

    // try {
    //
    //     debugger
    //     yield call(EOSGetInfo(eos, function* (err, result){
    //         if(err){
    //             console.log('fail');
    //             yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: [] });
    //         }else{
    //             console.log('success');
    //             // 根据返回数据，渲染结果
    //             yield put({ type: "VOTE_GETLIST_REDUCER", data: votingList });
    //         }
    //     }));

    // } catch (err) {}
}

export function* postVotingList(action) {

    let eos = GetEOS('5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq');
    try {
        yield call(EOSVoteProducer(eos, 'eosiomeetone', ['eosiomeetone'], function* (err, result){
            if(err){
                yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: [] });
            }else{
                // 根据返回数据，渲染结果
                yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: [{id: 2, title: "canon",}] });
            }
        }));
    } catch (err) {

    }
}
