import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { getDpFromPx } from "../../utils/util";
import Spinner from 'react-native-loading-spinner-overlay';

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
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillReceiveProps( nextProps ) {

    }


    render() {
        const viewHeight = 76;
        const separatorHeight = getDpFromPx( 1 );

        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={[ styles.wrapper, { backgroundColor: '#fafafa', } ]}>
                    <Text>asdasdadsd</Text>
                </View>

                <Spinner visible={this.state.isRequesting} children={<LoadingView/>}/>

            </SafeAreaView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        dispatch,
        onDispatchSetSelectedNodeListDataPost: ( data ) => dispatch( {
            type: "NODELIST_SETSELECTEDNODELISTDATA_REDUCER",
            data
        } ),
    };
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( PasswordInputPage );
