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
import PropTypes from 'prop-types';

class NumberInputComponent extends React.Component {
    static propTypes = {
        onInput: PropTypes.func.isRequired,
    };

    constructor( props ) {
        super( props );

        this.state = {};
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps( nextProps ) {

    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }

    onPressItem( content ) {
        this.props.onInput && this.props.onInput( content );
    }

    renderItem( content, onPress ) {
        return (
            <View style={[ {
                flex: 1, alignItems: 'center',
                justifyContent: 'center'
            } ]}>
                {
                    content.length > 0 ?
                        <TouchableHighlight
                            underlayColor='#cccccc'
                            onPress={() => {
                                onPress && onPress( content );
                            }}
                            style={[ { width: 76, height: 76, borderRadius: 38 } ]}>
                            <View
                                style={[ {
                                    width: 76,
                                    height: 76,
                                    borderRadius: 38,
                                    backgroundColor: '#eeeeee',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                } ]}>
                                <Text style={[ {
                                    fontSize: 32, fontWeight: 'bold',
                                } ]}>{content}</Text>
                            </View>
                        </TouchableHighlight>
                        :
                        null
                }
            </View>
        )
    }

    renderLinearGroup( contentArray ) {
        return (
            <View style={[ { flexDirection: 'row', flex: 1 } ]}>
                {
                    this.renderItem( contentArray[ 0 ], ( content ) => {
                        this.onPressItem( content );
                    } )
                }

                {
                    this.renderItem( contentArray[ 1 ], ( content ) => {
                        this.onPressItem( content );
                    } )
                }

                {
                    this.renderItem( contentArray[ 2 ], ( content ) => {
                        this.onPressItem( content );
                    } )
                }
            </View>
        )
    }

    render() {
        return (
            <View style={[ {
                backgroundColor: '#fafafa'
            }, this.props.style ]}>
                {this.renderLinearGroup( [ '1', '2', '3' ] )}
                {this.renderLinearGroup( [ '4', '5', '6' ] )}
                {this.renderLinearGroup( [ '7', '8', '9' ] )}
                {this.renderLinearGroup( [ '', '0', '' ] )}

            </View>
        );
    }
}

export default NumberInputComponent;
