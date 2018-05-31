import React, { Component } from "react";
import {
    Button,
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./style";
import PasswordInputComponent from "./components/PasswordInputComponent";
import PropTypes from 'prop-types';

class PasswordInputPageItem extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: 'Set Password',
        };
    };

    static propTypes = {
        onPasswordSet: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        isSupportClear: PropTypes.bool.isRequired,
        autoFocus: PropTypes.bool.isRequired,
    };

    constructor( props ) {
        super( props );
        this.state = {
            password: '',
            isPasswordCheckOpen: false
        };
    }

    componentDidMount() {


    }

    componentWillReceiveProps( nextProps ) {

    }

    clearPassword() {
        this._passwordInputComponent.clearData();
    }

    focus() {
        this._passwordInputComponent.focus();
    }

    blur() {
        this._passwordInputComponent.blur();
    }

    render() {
        return (
            <SafeAreaView style={[ styles.wrapper, { width: Dimensions.get( 'window' ).width }, this.props.style ]}>
                <View
                    style={[ styles.wrapper, { backgroundColor: '#fafafa', width: Dimensions.get( 'window' ).width } ]}>
                    <Text
                        style={[ {
                            fontSize: 18,
                            color: '#323232',
                            marginTop: 100,
                            marginLeft: 20,
                            marginRight: 20,
                            textAlign: 'center'
                        } ]}>
                        {
                            this.props.title
                        }
                    </Text>

                    <PasswordInputComponent
                        ref={( passwordInputComponent ) => {
                            this._passwordInputComponent = passwordInputComponent;
                        }}
                        password={this.state.password}
                        style={[ { marginTop: 40, marginLeft: 50, marginRight: 50 } ]}
                        autoFocus={this.props.autoFocus}
                        editable={true}
                        onPasswordChange={( password ) => {
                            this.setState( {
                                password: password
                            } );

                            if ( password.length >= 6 ) {
                                this.props.onPasswordSet && this.props.onPasswordSet( password );
                            }
                        }}
                    />

                    {
                        this.props.isSupportClear ?
                            <Button
                                onPress={() => {
                                    this._passwordInputComponent.clearData()
                                }}
                                title="Clear Password"
                                color="#007AFF"
                                accessibilityLabel=""
                                style={[ { marginTop: 100 } ]}
                            />
                            :
                            null
                    }
                </View>
            </SafeAreaView>
        );
    }
}

export default PasswordInputPageItem;
