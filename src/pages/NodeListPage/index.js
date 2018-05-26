// 引入公共组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View } from "react-native";
// 自定义组件
import { styles } from "./style";

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

    render() {
        return (
            <View style={styles.bodyBox}>
                <ScrollView style={styles.contentBox}>
                    {this.props.allAsset ? this.props.allAsset.map( ( item ) => (
                        <View style={styles.titleBox} key={item.id}>
                            <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                    ) ) : null}
                </ScrollView>
            </View>
        );
    }
}

// 挂载中间件到组件；
function mapDispatchToProps(  dispatch, ownProps  ) {
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
