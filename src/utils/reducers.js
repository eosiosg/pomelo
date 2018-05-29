import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import createEncryptor from 'redux-persist-transform-encrypt'

import HomePageReducer from "../pages/HomePage/reducer";
import VotePageReducer from "../pages/VotePage/reducer";
import NodeListPageReducer from "../pages/NodeListPage/reducer";
import VoteIndexPageReducer from "../pages/VoteIndexPage/reducer";
import DelegatebwPageReducer from "../pages/DelegatebwPage/reducer";
import UnDelegatebwPageReducer from "../pages/UnDelegatebwPage/reducer";
import storage from 'redux-persist/es/storage'

const baseReducers = combineReducers( {
    HomePageReducer,
    NodeListPageReducer,
    VotePageReducer,
    VoteIndexPageReducer,
    DelegatebwPageReducer,
    UnDelegatebwPageReducer,
} );

const encryptor = createEncryptor( {
    secretKey: 'eos_wallet_yuegyugdsaghsgd',
    onError: function ( error ) {
        // Handle the error.
    }
} )

const reducers = persistReducer(
    {
        key: 'primary',
        storage,
        transforms: [ encryptor ]
    },
    baseReducers
)

export default reducers;
