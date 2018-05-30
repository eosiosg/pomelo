import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { stakeStyles } from "../DelegatebwPage/style";
import Toast from "react-native-root-toast";
import PasswordCheckComponent from "./components/PasswordCheckComponent";

class PasswordInputPage extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: 'Set Password',
        };
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

    setPassword() {
        if ( this.state.password.length !== 6 ) {
            Toast.show( "密码长度不正确" );

            return;
        }

        this.props.onDispatchSetPassword( this.state.password );
        Toast.show( "密码设置成功" );
    }

    checkPassword() {
        if ( this.props.password.length <= 0 ) {
            Toast.show( "请先设置密码" );

            return;
        }

        this.setState( {
            isPasswordCheckOpen: true
        } );
    }

    render() {
        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={[ styles.wrapper, { backgroundColor: '#fafafa', } ]}>
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

                    <Button
                        onPress={() => {
                            this.setPassword()
                        }}
                        title="保存密码"
                        color="#841584"
                        accessibilityLabel=""
                    />

                    <Button
                        onPress={() => {
                            this.checkPassword()
                        }}
                        title="Check Password"
                        color="#841584"
                        accessibilityLabel=""
                    />

                    <Button
                        onPress={() => {
                            this.props.onDispatchSetPassword( '' );
                        }}
                        title="Clear Password"
                        color="#841584"
                        accessibilityLabel=""
                    />
                </View>

                <PasswordCheckComponent
                    isOpen={this.state.isPasswordCheckOpen}
                    onClose={() => {
                        this.setState( {
                            isPasswordCheckOpen: false
                        } );
                    }}
                />
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        dispatch,
        onDispatchSetPassword: ( password ) => dispatch( {
            type: "PASSWORD_SET_REDUCER",
            password
        } ),
    };
}

function mapStateToProps( state ) {
    return {
        password: state.PasswordInputPageReducer.password
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PasswordInputPage );
