/**
 * Created by dongjie on 24/5/18.
 */


import { put, call} from "redux-saga/effects";
import request from "../../utils/request";
import service from "../../utils/service";

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

    try {
        // 以下是正式的请求方式，暂不使用
        // // 组装请求数据
        // const requestOption = {
        //     url: service.API.HomePageGetAllAsset,
        //     body: {
        //         method: "get",
        //     },
        // };
        // // 发起异步请求
        // const response = yield call(request, requestOption);
        // // 根据返回数据，渲染结果
        // if (response.code === 0) {
        //     yield put({ type: "HOME_GETALLASSET_REDUCER", response.data });
        // }
        yield put({ type: "VOTE_GETLIST_REDUCER", data: votingList });

    } catch (err) {}
}

export function* postVotingList(action) {

    try {
        // const response = yield call(request, requestOption);
        // // 根据返回数据，渲染结果
        // if (response.code === 0) {
        //     yield put({ type: "HOME_GETALLASSET_REDUCER", response.data });
        // }
        yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: action.data });

    } catch (err) {}
}

//
// export function* getVoteIndexPageBpsPost () {
//     try {
//         const response = yield call(getBps);
//         yield put({ type: "VOTEINDEX_SETBPS_REDUCER", data: response });
//     } catch (err) {}
// }
// function getBps() {
//     const Eos = require( 'eosjs' );
//     const { ecc } = Eos.modules;
//
//     this.accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';
//     this.accountName = 'eosiomeetone';
//     this.accountPublicKey = ecc.privateToPublic( this.accountPrivateKey );
//     let nodeAddress = 'http://52.77.224.13:8888';
//     const config = {
//         keyProvider: this.accountPrivateKey,
//         httpEndpoint: nodeAddress,
//         expireInSeconds: 60,
//         broadcast: true,
//         debug: false,
//         sign: true
//     };
//     this.eos = Eos.Testnet( config );
//     console.log( '============== get block producer list==================' );
//     return this.eos.getProducers( { json: true } ).then( result => {
//         console.log( result );
//         return result.rows;
//     } );
// }

function voteProducer() {
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
