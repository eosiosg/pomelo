/**
 * Created by dongjie on 24/5/18.
 */


import { put, call} from "redux-saga/effects";

import { GetEOS, EOSVoteProducer,EOSGetInfo } from "../../actions/EosAction";

const accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';

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
        const response = yield call(getInfo);
        yield put({ type: "VOTE_GETLIST_REDUCER", data: [{id: 3, title: "eoscananda",}] });
    } catch (err) {}


    // try{
    //     EOSGetInfo(eos, function* (err, result){
    //         if(err){
    //             console.log('fail');
    //         }else{
    //             console.log('success');
    //             // 根据返回数据，渲染结果
    //         }
    //     })
    // }catch(err){
    //     console.log(err);
    // }

}

function getInfo() {
    let eos = GetEOS(accountPrivateKey);
    return eos.getInfo({}).then(( res ) => {
        console.log('res: ',res);
        return;
    });
}


export function* postVotingList(action) {
    try {
        console.log(action.data);
        let votingLis = action.data.length==0?votingList:action.data;
        const response = yield call(()=>votePorducers('eosiomeetone', ['eosiomeetone']));
        yield put({ type: "VOTE_GETLIST_REDUCER", data: votingList });
    } catch (err) {}

    // let eos = GetEOS('5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq');
    // try {
    //     yield call(EOSVoteProducer(eos, 'eosiomeetone', ['eosiomeetone'], function* (err, result){
    //         if(err){
    //             yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: [] });
    //         }else{
    //             // 根据返回数据，渲染结果
    //             yield put({ type: "VOTE_SUBMITLIST_REDUCER", data: [{id: 2, title: "canon",}] });
    //         }
    //     }));
    // } catch (err) {
    //
    // }

}


function votePorducers(accountName = 'eosiomeetone', producers = ['eosiomeetone']) {
    let eos = GetEOS(accountPrivateKey);
    eos.voteproducer( {
        voter: accountName,
        proxy: '',
        producers: producers
    }).then( function ( result ) {
        console.log( 'EOSVoteProducer result: ' + JSON.stringify( result ) );
    }).catch( function ( error ) {
        console.log( 'EOSVoteProducer error: ' + error.message );
    });
}
