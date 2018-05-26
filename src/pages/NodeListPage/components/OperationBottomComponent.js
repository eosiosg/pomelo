import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { SlideAnimation } from 'react-native-popup-dialog';
import Icon from "react-native-vector-icons/Ionicons";
import { styles as style } from "../style";

const slideAnimation = new SlideAnimation( { slideFrom: 'bottom' } );


class OperationBottomComponent extends React.Component {
    static propTypes = {
        totalData: PropTypes.array.isRequired,
        selectData: PropTypes.array.isRequired,
        isOpenSelected: PropTypes.bool.isRequired,
        onShowSelected: PropTypes.func.isRequired,
        onVote: PropTypes.func.isRequired,
    };

    constructor( props ) {
        super( props );

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps( nextProps ) {

    }


    render() {
        return (
            <View style={[ { flexDirection: 'row', height: 44, backgroundColor: 'white' } ]}>
                <View style={[ { flex: 3, height: 44 } ]}>
                    <TouchableOpacity
                        onPress={() => {
                            if ( this.props.onShowSelected ) {
                                this.props.onShowSelected();
                            }
                        }}>
                        <View style={[ { flexDirection: 'row', height: 44, alignItems: 'center', paddingLeft: 15 } ]}>
                            <Text style={[ style.commonTextColorStyle, { fontSize: 14 } ]}>Choose</Text>
                            <Text style={[ style.commonSubTextColorStyle, {
                                fontSize: 14,
                                marginLeft: 10,
                            } ]}>{this.props.selectData.length + '/' + this.props.totalData.length}</Text>
                            <Icon
                                style={[ {
                                    marginLeft: 10,
                                } ]}
                                name={this.props.isOpenSelected ? 'ios-arrow-up' : 'ios-arrow-down'}
                                size={14}
                                color={'#999999'}>
                            </Icon>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[ { flex: 1, height: 44 } ]}>
                    <TouchableOpacity
                        onPress={() => {
                            if ( this.props.onVote ) {
                                this.props.onVote();
                            }
                        }}>
                        <View style={[ { backgroundColor: '#3c4144', height: 44 }, style.justAlignCenter ]}>
                            <Text style={[ { color: 'white' } ]}>Vote</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function select( store ) {
    return {}
}

export default connect( select )( OperationBottomComponent );
