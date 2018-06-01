import React from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./utils/configure-store";
import App from "./App";
import SplashScreen from "rn-splash-screen";
import { storage } from "./utils/storage";

let _provider;
let _store;
let _isSetLocalStorageAESKey = false;

export function setup() {
    console.disableYellowBox = true;

    class Root extends React.Component {
        constructor() {
            super();
            // do stuff while splash screen is shown
            // After having done stuff (such as async tasks) hide the splash screen

            this.state = {
                isLoading: true,
                store: configureStore( () => {
                    storage.load( { key: "PasswordInputPage" } )
                        .then( ( ret ) => {
                            if ( ret && ret.length > 0 ) {
                                _isSetLocalStorageAESKey = true;

                                this.setState( { isLoading: false } );
                            } else {
                                this.setState( { isLoading: false } );
                            }
                        } )
                        .catch( function ( error ) {
                            console.log( 'EOSGetInfo error: ' + error.message );

                            this.setState( { isLoading: false } );
                        } );
                } )
            };

            _store = this.state.store;
        }

        componentDidMount() {
            if ( Platform.OS == "android" ) {
                setTimeout( () => {
                    SplashScreen.hide();
                }, 1000 );
            }
        }

        render() {
            if ( this.state.isLoading ) {
                return null;
            }
            return (
                <Provider store={this.state.store}>
                    <App/>
                </Provider>
            );
        }

    }

    return Root;
}

export function getProvider() {
    return _provider;
}

export function getStore() {
    return _store;
}

export function isSetLocalStorageAESKey() {
    return _isSetLocalStorageAESKey;
}

export function setIsSetLocalStorageAESKey( isSetLocalStorageAESKey ) {
    _isSetLocalStorageAESKey =;
}
