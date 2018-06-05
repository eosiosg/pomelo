/**
 * Created by dongjie on 24/5/18.
 */
import { put, call} from "redux-saga/effects";
import { GetEOS, EOSVoteProducer, EOSGetInfo } from "../../actions/EosAction";

export function* postVotingList(action) {
    try {
        yield put({ type: "VOTE_ONGOING_REDUCER"});
        const response = yield call(voteProducers, action.data.account, action.data.votingList);
        if(response.broadcast){
            yield put({ type: "VOTE_SUCCESS_REDUCER"});
            setTimeout(()=>action.data.nav.navigate('VoteIndexPage'),100);
        }else{
            yield put({ type: "VOTE_FAIL_REDUCER"});
        }
    } catch (err) {
        yield put({ type: "VOTE_FAIL_REDUCER"});
    }
}

async function voteProducers(account = {}, producers = ['eosiomeetone']) {
    let eos = await GetEOS(account.accountPrivateKey);
    return eos.voteproducer( {
        voter: account.accountName,
        proxy: '',
        producers: producers
    }).then( function ( result ) {
        // console.log( 'EOSVoteProducer result: ' + JSON.stringify( result ) );
        return result;
    }).catch( function ( error ) {
        // console.log( 'EOSVoteProducer error: ' + error.message );
        return [];
    });
}
