import React from "react";
import {
    BackHandler,
    Button,
    Dimensions,
    FlatList,
    InteractionManager,
    Modal,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import PropTypes from 'prop-types';

class PasswordInputComponent extends React.Component {
    static propTypes = {
        password: PropTypes.string.isRequired,
        autoFocus: PropTypes.bool.isRequired,
        onPasswordChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
    };

    constructor( props ) {
        super( props );

        this.state = {
            password: props.password,
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps( nextProps ) {

    }

    shouldComponentUpdate( nextProps, nextState ) {
        if ( nextState.password !== this.state.password ) {
            if ( this.props.onPasswordChange ) {
                this.props.onPasswordChange( nextState.password );
            }
        }

        return true;
    }

    appendContent( content ) {
        let str = this.state.password + content;
        if ( str.length > 6 ) {
            str = str.substring( 0, 6 );
        }

        this.setState( {
            password: str
        } );
    }

    clearData() {
        this.setState( {
            password: ''
        } );
    }

    renderPasswordEffectItem( text ) {
        return (
            <View style={[ {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 60
            } ]}>
                <Text style={[ { fontSize: 40, color: '#323232' } ]}>
                    {text && text.length > 0 ? text : '-'}
                </Text>
            </View>
        )
    }

    renderPasswordEffect() {
        const textArray = [];
        for ( let index = 0; index < 6; index++ ) {
            if ( index < this.state.password.length ) {
                textArray.push( '' + this.state.password[ index ] )
            } else {
                textArray.push( '' )
            }
        }


        return (
            <View style={[ {
                height: 60, flexDirection: 'row',
                backgroundColor: '#fafafa',
                position: 'absolute', bottom: 0, top: 0,
                left: 0,
                right: 0,

            } ]}>
                <TouchableOpacity
                    onPress={() => {
                        this._textInput.focus()
                    }} style={[ { height: 60, flexDirection: 'row', flex: 1 } ]}>
                    <View style={[ {
                        height: 60, flexDirection: 'row', flex: 1
                    } ]}>
                        {
                            this.renderPasswordEffectItem( textArray[ 0 ] )
                        }
                        {
                            this.renderPasswordEffectItem( textArray[ 1 ] )
                        }
                        {
                            this.renderPasswordEffectItem( textArray[ 2 ] )
                        }
                        {
                            this.renderPasswordEffectItem( textArray[ 3 ] )
                        }
                        {
                            this.renderPasswordEffectItem( textArray[ 4 ] )
                        }
                        {
                            this.renderPasswordEffectItem( textArray[ 5 ] )
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    focus() {
        this._textInput.focus();
    }

    blur() {
        this._textInput.blur();
    }

    render() {
        return (
            <View style={[ {
                backgroundColor: '#fafafa'
            }, this.props.style ]}>
                <TextInput
                    ref={textInput => {
                        this._textInput = textInput
                    }}
                    style={[ { height: 60 } ]}
                    placeholderTextColor={"#999"}
                    maxLength={6}
                    keyboardType={'numeric'}
                    editable={this.props.editable}
                    onChangeText={( text ) => {
                        let newText = '';
                        for ( let index = 0; index < text.length; index++ ) {
                            if ( ('' + text[ index ]) !== '.' ) {
                                newText += ('' + text[ index ]);
                            } else {
                                newText += '';
                            }
                        }

                        this.setState( {
                            password: newText
                        } );
                    }}
                    value={this.state.password}
                    underlineColorAndroid={"transparent"}
                    autoFocus={this.props.autoFocus}
                />

                {
                    this.renderPasswordEffect()
                }

            </View>
        );
    }
}

export default PasswordInputComponent;
