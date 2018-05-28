import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles as style, styles } from "./style";
import { getDpFromPx } from "../../utils/util";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-root-toast";
import NodeListSelectedResultComponent from "./components/NodeListSelectedResultComponent";
import OperationBottomComponent from "./components/OperationBottomComponent";
import LoadingView from "./components/LoadingView";
import Spinner from 'react-native-loading-spinner-overlay';

class NodeListPage extends Component {
    static navigationOptions = ( props ) => {
        console.log('=----node lsit-=-=');
        console.log(props);
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: 'Node List',
        };
    };

    constructor( props ) {
        super( props );
        this.state = {
            isOpenAccountSelect: false,
            selectData: [],
            isRequesting: false
        };
    }
    componentDidMount() {}


    onVote() {
        if ( this.state.selectData.length <= 0 ) {
            Toast.show( 'Please select Node' );
            return;
        }
        this.props.onDispatchSetSelectedNodeListDataPost(this.state.selectData);
        this.props.navigation.navigate("VotePage", {selectedNodeList: this.state.selectData});
    }

    addNode( nodeItem ) {
        for ( let index = 0; index < this.state.selectData.length; index++ ) {
            if ( nodeItem.id === this.state.selectData[ index ].id ) {
                return;
            }
        }

        const selectData = this.state.selectData.slice();

        selectData.push( nodeItem );

        this.setState( {
            selectData: selectData
        } );
    }

    removeNode( nodeItem ) {
        const selectData = this.state.selectData.slice();

        for ( let index = 0; index < this.state.selectData.length; index++ ) {
            if ( nodeItem.id === this.state.selectData[ index ].id ) {
                selectData.splice( index, 1 );

                break;
            }
        }

        this.setState( {
            selectData: selectData
        } );
    }

    renderItem( { item, index } ) {
        return (
            <View style={[ {
                flex: 1,
                backgroundColor: '#fafafa',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                height: 76
            } ]}>
                <View style={[ {}, style.wrapper ]}>
                    <Text numberOfLines={1} style={[ style.commonTextColorStyle, { fontWeight: 'bold', fontSize: 18 } ]}>{item.owner}</Text>
                    <Text numberOfLines={1} style={[ style.commonSubTextColorStyle, { fontSize: 14 } ]}>http://{item.url}</Text>
                    <Text numberOfLines={1} style={[ style.commonSubTextColorStyle, { fontSize: 14 } ]}>{item.total_votes} Voter Choise</Text>
                </View>

                <View style={[ { marginTop: 25 } ]}>
                    <TouchableOpacity
                        onPress={() => {
                            if ( this.state.selectData.indexOf( item ) !== -1 ) {
                                this.removeNode( item );
                            } else {
                                this.addNode( item )
                            }
                        }}>
                        <Icon
                            style={[ {
                                marginLeft: 10,
                            } ]}
                            name={this.state.selectData.indexOf( item ) !== -1 ? 'ios-remove-circle-outline' : 'md-add-circle'}
                            size={30}
                            color={'#3c4144'}>
                        </Icon>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        const viewHeight = 76;
        const separatorHeight = getDpFromPx( 1 );

        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={[ styles.wrapper, { backgroundColor: '#fafafa', } ]}>
                    <View style={styles.wrapper}>
                        <FlatList
                            data={this.props.allAsset}
                            keyExtractor={( item, index ) => {
                                return index + '';
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

                        <NodeListSelectedResultComponent
                            totalData={this.props.allAsset}
                            selectData={this.state.selectData}
                            navigation={this.props.navigation}
                            isOpen={this.state.isOpenAccountSelect}
                            isSupportImport={true}
                            defaultAddress={''}
                            onResult={( item ) => {

                            }}
                            onImportWallet={() => {

                            }}
                            onClose={() => {
                                this.setState( {
                                    isOpenAccountSelect: false
                                } );
                            }}
                            onVote={()=>{
                                this.onVote()
                            }}
                            onRemoveNode={( nodeItem ) => {
                                this.removeNode( nodeItem )
                            }}
                        />
                    </View>

                    <OperationBottomComponent
                        totalData={this.props.allAsset}
                        selectData={this.state.selectData}
                        isOpenSelected={false}
                        onShowSelected={() => {
                            this.setState( {
                                isOpenAccountSelect: true
                            } );
                        }}
                        onVote={()=>{
                            this.onVote()
                        }}
                    />
                </View>

                <Spinner visible={this.state.isRequesting} children={<LoadingView/>}/>

            </SafeAreaView>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return {
      dispatch,
      onDispatchSetSelectedNodeListDataPost: (data) => dispatch({ type: "NODELIST_SETSELECTEDNODELISTDATA_REDUCER", data }),
    };
}

function mapStateToProps( state ) {
    return {
        allAsset: state.VoteIndexPageReducer.BPs,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NodeListPage );
