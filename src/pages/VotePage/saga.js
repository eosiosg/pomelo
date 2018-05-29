/**
 * Created by dongjie on 24/5/18.
 */
import { put, call} from "redux-saga/effects";
import { storage } from "../../utils/storage";
import { getWalletPageAccountInfoPost } from "../WalletPage/saga"

let accountName = ''

storage.load({key: "accountName"}).then((ret) => {
    if (ret) {
        accountName = ret
    } else {
        console.log("ret:",ret)
    }
}).catch(err => {
    console.log("err:",err)
});


import { GetEOS, EOSVoteProducer, EOSGetInfo } from "../../actions/EosAction";

const accountPrivateKey = '5K6g9pgX6QUqvNinK2CNAScNvq7dc9tqocTUq1X9HvtEj1xdjFq';

// 创建假数据
const votingList = [];


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
        const response = yield call(votePorducers, action.data.account_name, action.data.votingList);
        yield put({ type: "VOTE_GETLIST_REDUCER", data: response.broadcast });
    } catch (err) {}
}

function votePorducers(accountName = 'eosiomeetone', producers = ['eosiomeetone']) {
    let eos = GetEOS(accountPrivateKey);
    return eos.voteproducer( {
        voter: accountName,
        proxy: '',
        producers: producers
    }).then( function ( result ) {
        console.log( 'EOSVoteProducer result: ' + JSON.stringify( result ) );
        return result;
    }).catch( function ( error ) {
        console.log( 'EOSVoteProducer error: ' + error.message );
        return [];
    });
}
