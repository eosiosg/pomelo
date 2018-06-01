import React from "react";
import {
    AppState,
    BackHandler,
    Button,
    Dimensions,
    FlatList,
    Keyboard,
    Modal,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { styles as style } from "../style";
import PasswordInputComponent from "./PasswordInputComponent";
import NumberInputComponent from "./NumberInputComponent";
import { decryptObject, setStorageAESKey, storage } from "../../../utils/storage";
import { getEventEmitter } from "../../../setup";
import I18n from "../../../../I18n";


class PasswordCheckComponent extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    constructor( props ) {
        super( props );

        this.state = {
            isOpen: props.isOpen,
            password: '',
            errorText: '',
        };

        this._onBack = this.onBack.bind( this );
    }

    componentWillMount() {
        BackHandler.addEventListener( 'hardwareBackPress', this._onBack );
    }

    componentDidMount() {
        Keyboard.dismiss();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener( 'hardwareBackPress', this._onBack );
    }

    componentWillReceiveProps( nextProps ) {
        if (
            nextProps.isOpen !== this.state.isOpen
        ) {
            this.setState( {
                isOpen: nextProps.isOpen,
                password: nextProps.isOpen ? '' : this.state.password,
                errorText: nextProps.isOpen ? '' : this.state.errorText,
            } );
        }
    }

    onBack() {
        if ( this.state.isOpen ) {
            // this.closeModal();

            return true;
        }
        return false;
    }

    closeModal() {
        if ( this.props.onClose ) {
            this.props.onClose();
        }

        this.setState(
            {
                isOpen: false,
            }
        );
    }


    checkPassword( password ) {
        setStorageAESKey( password );

        storage.load( { key: "PasswordInputPage" } ).then( ( ret1 ) => {
            if ( ret1 ) {
                const ret = decryptObject( ret1 );
                if ( ret && ret.passwordCheck === 'passwordCheck' ) {
                    this.closeModal();

                    getEventEmitter().emit('checkPasswordSuccess', '');
                }
            }
        } ).catch( err => {
            this.setState( {
                errorText: 'Password is not correct'
            } );
          this._passwordInputComponent ? this._passwordInputComponent.clearData() : null;
        } );
    }


    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isOpen}
                onShow={() => {
                }}
                onRequestClose={() => {
                }}
            >

                <View style={[ {
                    backgroundColor: '#fafafa',
                }, style.wrapper ]}>
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
                            I18n.t("Password Verify")
                        }
                    </Text>

                    <PasswordInputComponent
                        ref={( passwordInputComponent ) => {
                            this._passwordInputComponent = passwordInputComponent;
                        }}
                        password={this.state.password}
                        style={[ { marginTop: 40, marginLeft: 50, marginRight: 50 } ]}
                        autoFocus={false}
                        editable={false}
                        onPasswordChange={( password ) => {
                            if ( password.length >= 6 ) {
                                this.checkPassword( password );
                            } else if ( password.length > 0 ) {
                                this.setState( {
                                    errorText: ''
                                } );
                            }
                            this.setState( {
                                password: password
                            } );
                        }}
                    />

                    <Text
                        style={[ {
                            fontSize: 12,
                            color: 'red',
                            marginTop: 10,
                            marginLeft: 20,
                            marginRight: 20,
                            textAlign: 'center'
                        } ]}>
                        {
                            this.state.errorText
                        }
                    </Text>

                    <NumberInputComponent
                        style={[ { flex: 1, marginLeft: 50, marginRight: 50, } ]}
                        onInput={( content ) => {
                            this._passwordInputComponent.appendContent( content );
                        }}
                    />

                    <Button
                        onPress={() => {
                            this._passwordInputComponent.clearData()
                        }}
                        title = {I18n.t("Password Clear")}
                        color="#007AFF"
                        accessibilityLabel=""
                        style={[ { marginTop: 100, marginBottom: 20 } ]}
                    />

                </View>

            </Modal>
        );
    }
}

function select( store ) {
    return {

    }
}

export default connect( select )( PasswordCheckComponent );
