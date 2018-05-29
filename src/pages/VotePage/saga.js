/**
 * Created by dongjie on 24/5/18.
 */
import { put, call} from "redux-saga/effects";
import { GetEOS, EOSVoteProducer, EOSGetInfo } from "../../actions/EosAction";

export function* postVotingList(action) {
    if(action.data && action.data.account){
        try {
            const response = yield call(votePorducers, action.data.account, action.data.votingList);
            yield put({ type: "VOTE_SUBMITLIST_REDUCER", data:{ submitSuccess: response.broadcast }});
            if(response){
                action.data.nav.navigate('VoteIndexPage');
            }
        } catch (err) {}
    }else{
        yield put({ type: "VOTE_SUBMITLIST_REDUCER", data:{ submitSuccess:false }});
    }
}

function votePorducers(account = {}, producers = ['eosiomeetone']) {
    let eos = GetEOS(account.accountPrivateKey);
    return eos.voteproducer( {
        voter: account.accountName,
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
