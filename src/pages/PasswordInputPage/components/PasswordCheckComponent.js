import React from "react";
import {
    BackHandler,
    Button,
    Dimensions,
    FlatList,
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
import { stakeStyles } from "../../DelegatebwPage/style";
import Toast from "react-native-root-toast";

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


    checkPassword() {
        if ( this.state.password !== this.props.password ) {
            this.setState( {
                errorText: 'Password is not correct'
            } );
            return;
        }

        this.closeModal();

        Toast.show( "密码验证正确" );
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isOpen}
            >

                <View style={[ {
                    backgroundColor: 'white',
                }, style.wrapper ]}>
                    <TextInput
                        style={stakeStyles.stakeValueInput}
                        placeholder={'请输入密码'}
                        placeholderTextColor={"#999"}
                        keyboardType="numeric"
                        onChangeText={( text ) => {
                            this.setState( {
                                password: text
                            } );
                        }}
                        underlineColorAndroid={"transparent"}
                    />

                    {
                        this.state.errorText.length > 0 ?
                            <Text style={[ {
                                fontSize: 12,
                                color: 'red'
                            } ]}>{this.state.errorText}</Text>
                            :
                            null
                    }

                    <Button
                        onPress={() => {
                            this.checkPassword()
                        }}
                        title="Check Password"
                        color="#841584"
                        accessibilityLabel=""
                    />

                </View>

            </Modal>
        );
    }
}

function select( store ) {
    return {
        password: store.PasswordInputPageReducer.password
    }
}

export default connect( select )( PasswordCheckComponent );
