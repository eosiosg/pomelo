import { AppState, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { AppNavigator } from "./AppNavigator";
import PasswordCheckComponent from "./pages/PasswordInputPage/components/PasswordCheckComponent";

const styles = StyleSheet.create( {} );

class App extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            appState: AppState.currentState,
            previousAppStates: [],
            memoryWarnings: 0,
            isPasswordCheckOpen: this.props.password.length > 0
        };

        this._handleAppStateChange = this.handleAppStateChange.bind( this );
        this._handleMemoryWarning = this.handleMemoryWarning.bind( this );
    }

    componentWillMount() {

    }

    componentDidMount() {
        AppState.addEventListener( 'change', this._handleAppStateChange );
        AppState.addEventListener( 'memoryWarning', this._handleMemoryWarning );
    }


    componentWillUnmount() {
        AppState.removeEventListener( 'change', this._handleAppStateChange );
        AppState.removeEventListener( 'memoryWarning', this._handleMemoryWarning );
    }


    shouldComponentUpdate( nextProps, nextState ) {

        if ( nextState.appState !== this.state.appState ) {
            if ( nextState.previousAppStates.length > 0 && nextState.previousAppStates[ nextState.previousAppStates.length - 1 ] === 'background' && nextState.appState === 'active' ) {
                //the app from background to active

                if ( this.props.password.length > 0 ) {
                    this.setState( {
                        isPasswordCheckOpen: true
                    } );

                    return true;
                }
            }
        }

        return false;
    }

    componentWillReceiveProps( nextProps ) {

    }

    handleMemoryWarning() {
        this.setState( { memoryWarnings: this.state.memoryWarnings + 1 } );
    }

    handleAppStateChange( appState ) {
        const previousAppStates = this.state.previousAppStates.slice();
        previousAppStates.push( this.state.appState );
        this.setState( {
            appState: appState,
            previousAppStates: previousAppStates,
        } );
    }

    render() {
        return (
            <View style={[ { flex: 1 } ]}>
                <AppNavigator/>
                <PasswordCheckComponent
                    isOpen={this.state.isPasswordCheckOpen}
                    onClose={() => {
                        this.setState( {
                            isPasswordCheckOpen: false
                        } );
                    }}
                />
            </View>
        )
    }

}


function select( store ) {
    return {
        password: store.PasswordInputPageReducer.password
    };
}

export default connect( select )( App );
