import React from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./utils/configure-store";
import App from "./App";
import SplashScreen from "rn-splash-screen";

let _provider;
let _store;

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
                    this.setState( { isLoading: false } );
                } )
            };

            _store = this.state.store;
        }

      componentDidMount() {
          if (Platform.OS == "android") {
            setTimeout(() => {
              SplashScreen.hide();
            }, 1000);
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
