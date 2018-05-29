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
            allAsset:[],
        };
    }

    componentDidMount() {
        let iVoterProducers = this.props.accountInfo.voter_info.producers;
        let allAsset = [].concat(this.props.allAsset);
        this.copyBpList(allAsset,iVoterProducers)
    }

    componentWillReceiveProps(nextProps){
        console.log('hi， new prosp', nextProps);
        let allAsset = [].concat(nextProps.allAsset);
        let iVoterProducers = this.props.accountInfo.voter_info.producers;
        this.copyBpList(allAsset,iVoterProducers);
    }

    copyBpList = (allAsset, iVoterProducers) =>{
        let selectedData = this.state.selectedData;
        allAsset.map((bp)=>{
            if(iVoterProducers.indexOf(bp.owner)!==-1){
                bp.voting = true;
                selectedData += 1;
            }else{
                bp.voting = false;
            }
        });

        this.setState({
            allAsset,
            selectedData,
            iVoterProducers
        });
    }


    onVote() {
        let selectedNodes = []
        this.state.allAsset.map((bp)=>{
            if(bp.voting){
                selectedNodes.push(bp)
            }
        });
        // if ( selectedNodes.length <= 0 ) {
        //     Toast.show( 'Please select Node' );
        //     return;
        // }
        this.props.onDispatchSetSelectedNodeListDataPost(selectedNodes);
        this.props.navigation.navigate("VotePage", {selectedNodeList: selectedNodes});
    }

    addNode( nodeItem, index ) {

        console.log('----addd   -=-=====');
        console.log(this.state.allAsset[index]);
        let allAsset = [].concat(this.state.allAsset);
        allAsset[index].voting = true;
        let selectedData = this.state.selectedData +1;
        this.setState( {
            allAsset,
            selectedData
        });
    }

    removeNode( nodeItem, index ) {

        console.log('----remove   -=-=====');
        console.log(this.state.allAsset[index]);

        let allAsset = [].concat(this.state.allAsset);
        allAsset[index].voting = false;
        let selectedData = this.state.selectedData - 1;

        this.setState( {
            allAsset,
            selectedData
        });
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
                <View style={[ {}, style.wrapper ]}>
                    <Text numberOfLines={1}
                          style={[
                              style.commonTextColorStyle,
                              { fontWeight: 'bold',
                                  fontSize: 20,
                                  lineHeight:28,
                                  fontFamily: 'PingFangSC-Semibold',
                                  color: '#323232',
                          } ]}>
                        {item.owner}
                    </Text>
                    <Text numberOfLines={1}
                          style={[
                              style.commonSubTextColorStyle,
                              {
                                  fontSize: 16,
                                  marginTop: 8,
                                  lineHeight:20,
                                  fontFamily: 'PingFangSC-Regular',
                                  color: '#999999',
                                  letterSpacing: 0,
                              }]
                          }>
                        http://{item.url}
                    </Text>
                    <Text numberOfLines={1}
                          style={[
                              style.commonSubTextColorStyle,
                              {
                                  fontSize: 14,
                                  marginTop: 10,
                                  lineHeight:20,
                                  fontFamily: 'PingFangSC-Regular',
                                  color: '#999999',
                                  letterSpacing: 0,
                              }]
                          }>
                        {item.total_votes} Voter Choise
                    </Text>
                </View>

                <View style={[ { marginBottom: 45 } ]}>
                    <TouchableOpacity
                        onPress={() => {
                            if(item.voting){
                                this.removeNode( item, index )
                            }else{
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

        console.log('selected tate',this.state.selectData);


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
                            onVote={()=>{
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
        accountInfo: state.VoteIndexPageReducer.accountInfo,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NodeListPage );
