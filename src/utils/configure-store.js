import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from "redux-thunk";
import { persistCombineReducers, persistStore, } from "redux-persist";
import reducers from "./reducers";
import storage from 'redux-persist/es/storage'
import createEncryptor from "redux-persist-transform-encrypt";

const middlewares = [];

// const a = middleware;

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push( sagaMiddleware );
middlewares.push( thunk );

/* global __DEV__  */
// if ( __DEV__ ) {
//     middlewares.push( logger );
// }
const createStoreWithMiddleware = applyMiddleware( ...middlewares );

const encryptor = createEncryptor( {
    secretKey: 'eos_wallet_yuegyugdsaghsgd',
    onError: function ( error ) {
        // Handle the error.
    }
} );

export default function configureStore( onComplete ) {
    const config = {
        key: 'primary',
        storage,
        transform: [ encryptor ],
        //whitelist: ['userStore'],,
    };

    let reducer = persistCombineReducers( config, reducers );

    const store = createStore(
        reducer,
        undefined,
        compose(
            createStoreWithMiddleware,
        )
    );

    persistStore( store, null, onComplete );

    // install saga run
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch( END );

    return store;
}
