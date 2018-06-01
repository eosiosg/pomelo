import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, SafeAreaView, Text, TouchableOpacity,ImageBackground, View, Image } from "react-native";
import { styles as style, styles } from "./style";
import { getDpFromPx } from "../../utils/util";
import Icon from "react-native-vector-icons/Ionicons";
import NodeListSelectedResultComponent from "./components/NodeListSelectedResultComponent";
import OperationBottomComponent from "./components/OperationBottomComponent";
import LoadingView from "./components/LoadingView";
import Spinner from 'react-native-loading-spinner-overlay';
import { decryptObject, encryptObjectToString, storage } from "../../utils/storage";
const developTeam = require('../../images/developTeamBackground.png');
import developmentTeamList from '../../../data/developmentTeam'
import I18n from "../../../I18n";

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
        this.state = {
            isOpenAccountSelect: false,
            selectData: 1,
            isRequesting: false,
            allAsset: [],
        };
    }

    componentDidMount() {
        let iVoterProducers = this.props.accountInfo.voter_info ? this.props.accountInfo.voter_info.producers : [];
        let allAsset = [].concat( this.props.allAsset );
        this.copyBpList( allAsset, iVoterProducers )
    }

    componentWillReceiveProps( nextProps ) {
        // console.log('hi， new prosp', nextProps);
        let allAsset = [].concat( nextProps.allAsset );
        let iVoterProducers = this.props.accountInfo.voter_info.producers;
        this.copyBpList( allAsset, iVoterProducers );
    }

    copyBpList = ( allAsset, iVoterProducers ) => {
        allAsset.map( ( bp ) => {
            if ( iVoterProducers.indexOf( bp.owner ) !== -1 ) {
                bp.voting = true;
            } else {
                bp.voting = false;
            }
        } );

        this.setState( {
            allAsset,
            iVoterProducers
        } );
    }


    onVote() {
        let selectedNodes = []
        this.state.allAsset.map( ( bp ) => {
            if ( bp.voting ) {
                selectedNodes.push( bp )
            }
        } );
        // if ( selectedNodes.length <= 0 ) {
        //     Toast.show( 'Please select Node' );
        //     return;
        // }
        this.props.onDispatchSetSelectedNodeListDataPost( selectedNodes );
        this.props.navigation.navigate( "VotePage", { selectedNodeList: selectedNodes } );
    }

    addNode( nodeItem, index ) {
        let allAsset = [].concat( this.state.allAsset );
        allAsset[ index ].voting = true;
        let selectedData = this.state.selectedData + 1;
        this.setState( {
            allAsset,
            selectedData
        } );
    }

    removeNode( nodeItem, index ) {
        let allAsset = [].concat( this.state.allAsset );
        allAsset[ index ].voting = false;
        let selectedData = this.state.selectedData - 1;

        this.setState( {
            allAsset,
            selectedData
        } );
    }

    renderItem( { item, index } ) {
        return (
            <View key={index}
                  style={[ {
                      flex: 1,
                      backgroundColor: '#fafafa',
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 10,
                      paddingBottom: 10,
                      flexDirection: 'row',
                  } ]}>
                <View style={[ {flex:2} ]}>
                    <Image source={{uri:this.props.accountDic[item.owner]?this.props.accountDic[item.owner].logo:'https://steemitimages.com/0x0/https://steemitimages.com/DQmWs93EuTs1CrgazwChGBqj7eygJoQ4HqB9ANWMN8TMHc8/eoosss1920_0023.jpg'}}
                           style={{width:46,height:46, borderRadius:23, marginTop:10}}/>
                </View>
                <View style={[ {flex:8,} ]}>
                    <Text numberOfLines={1}
                          style={[
                              style.commonTextColorStyle,
                              {
                                  fontWeight: 'bold',
                                  fontSize: 22,
                                  lineHeight: 35,
                                  fontFamily: 'PingFangSC-Semibold',
                                  color: '#323232',
                              } ]}>
                        {this.props.accountDic[item.owner]?this.props.accountDic[item.owner].organization_name:item.owner}

                    </Text>
                    <Text numberOfLines={1}
                          style={[
                              style.commonTextColorStyle,
                              {
                                  fontSize: 14,
                                  lineHeight: 22,
                                  fontFamily: 'PingFangSC-Semibold',
                                  color: '#323232',
                              } ]}>
                        {item.owner}
                    </Text>
                    <Text numberOfLines={1}
                          style={[
                              style.commonSubTextColorStyle,
                              {
                                  fontSize: 14,
                                  lineHeight: 28,
                                  fontFamily: 'PingFangSC-Regular',
                                  color: '#999999',
                                  letterSpacing: 0,
                              } ]
                          }>
                        {parseFloat(item.total_votes/this.props.totalVoteWeight*100).toFixed(2) + "%"} Voter Choise
                    </Text>
                </View>

                <View style={[ { paddingTop: 55,position:'relative',zIndex:0, } ]}>
                    {
                        this.props.contributors.indexOf(item.owner) !== -1 && <ImageBackground style={{
                            width: 130, height: 18,
                            position: 'absolute',
                            top: 6, right: -5,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}
                                                                                               source={developTeam}>
                            <Text style={{textAlign: "center", lineHeight: 18, fontSize:12, color: 'white'}}>
                                I18n.t("Global Development Team");
                            </Text>
                        </ImageBackground>
                    }

                    <TouchableOpacity
                        onPress={() => {
                            if ( item.voting ) {
                                this.removeNode( item, index )
                            } else {
                                this.addNode( item, index )
                            }
                        }}>
                        <Icon
                            style={[ {
                                marginLeft: 10,
                            } ]}
                            name={item.voting ? 'ios-remove-circle-outline' : 'md-add-circle'}
                            size={33}
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
                            data={this.state.allAsset}
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
                            totalData={this.state.allAsset}
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
                            onVote={() => {
                                this.onVote()
                            }}
                            onRemoveNode={( nodeItem, index ) => {
                                this.removeNode( nodeItem, index )
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
                        onVote={() => {
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
        onDispatchSetSelectedNodeListDataPost: ( data ) => dispatch( {
            type: "NODELIST_SETSELECTEDNODELISTDATA_REDUCER",
            data
        } ),
    };
}

function mapStateToProps( state ) {
    return {
        allAsset: state.VoteIndexPageReducer.BPs,
        accountInfo: state.VoteIndexPageReducer.accountInfo,
        testData2: state.NodeListPageReducer.testData2,
        totalVoteWeight: state.VoteIndexPageReducer.totalVoteWeight,

        accountDic: state.VoteIndexPageReducer.accountDic,
        contributors: state.VoteIndexPageReducer.contributors,

    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NodeListPage );
