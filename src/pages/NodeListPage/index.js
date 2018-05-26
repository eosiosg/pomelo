// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
// 自定义组件
import { styles } from "./style";
import { getDpFromPx } from "../../utils/util";

class NodeListPage extends Component {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: 'Node List',
        };
    };


    constructor( props ) {
        super( props );
        this.state = {};
    }

    componentWillReceiveProps( nextProps ) {
        console.log( nextProps.allAsset );
    }

    componentDidMount() {
        // 获取数据
        this.props.onDispatchGetAllAssetPost();
    }

    renderItem( { item, index } ) {
        return (
            <TouchableOpacity
                onPress={() => {
                }}>
                <View style={[ {
                    flex: 1,
                    backgroundColor: 'white',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                } ]}>
                    <View style={[ {}, ]}>

                    </View>
                    <View>
                        <
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const viewHeight = 64;
        const separatorHeight = getDpFromPx( 1 );

        return (
            <SafeAreaView>
                <View style={styles.bodyBox}>
                    <FlatList
                        data={this.props.allAsset}
                        keyExtractor={( item, index ) => {
                            return index;
                        }}
                        renderItem={( { item, index } ) => {
                            return this.renderItem( { item, index } );
                        }}
                        ItemSeparatorComponent={() => {
                            return <View style={[ {
                                height: getDpFromPx( 1 ),
                                backgroundColor: '#e8e8e8',
                                marginLeft: 15,
                            } ]}/>
                        }}
                        getItemLayout={( data, index ) => (
                            { length: viewHeight, offset: (viewHeight + separatorHeight) * index, index }
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

// 挂载中间件到组件；
function mapDispatchToProps( dispatch, ownProps ) {
    return {
        onDispatchGetAllAssetPost: () => dispatch( { type: "NODE_LIST_GET_ALL_ASSET_POST" } ),
    };
}

function mapStateToProps( state ) {
    return {
        allAsset: state.NodeListPageReducer.allAsset,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NodeListPage );
