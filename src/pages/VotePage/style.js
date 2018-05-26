/**
 * Created by dongjie on 24/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";

const leftFirstBase = 13;

const styles = StyleSheet.create({
    bodyBox: {
        position: "relative",
        flexBasis: "100%",
        minHeight: Dimensions.get("window").height,
        backgroundColor: "#f0f1f1",
    },
    contentHeader: {
        marginTop: 100,
        marginLeft:leftFirstBase,
        marginRight:leftFirstBase,
        borderRadius:2,
        backgroundColor: "#ffffff",
    },

    contentHeaderAccountName:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth: 0.5,
        borderBottomColor:'#ccc',
        marginLeft:8,
        marginRight:8,
    },


    contentHeaderAccountNameLabel: {
        width:'50%',
        fontSize:18,
        lineHeight: 45,
        color:'grey',
    },

    contentHeaderAccountNameValue: {
        width:'50%',
        textAlign:'right',
        fontSize:18,
        lineHeight: 45,
        color:'grey',
    },

    contentBodyStake : {
        marginTop:20,
    },

    contentBodyStakeHeader : {
        flexDirection:'row',
        flexWrap:'wrap',
        marginLeft:leftFirstBase,
        marginRight:leftFirstBase,
    },

    contentBodyStakeHeaderName:{
        color:'grey',
        width:'50%',
        fontSize:18,
        lineHeight:35,
    },
    contentBodyStakeHeaderQuestion:{
        textAlign:'right',
        color:'grey',
        width:'50%',
        fontSize:18,
        lineHeight:35,
    },

    contentBodyStakeBody : {
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor: "#ffffff",
    },

    contentBodyStakeCpu:{
        flexDirection:'row',
        flexWrap:'wrap',
        borderBottomWidth: 0.5,
        borderBottomColor:'#ccc',
    },

    contentBodyStakeBodyTextLabel:{
        width:'50%',
        fontSize:18,
        lineHeight: 45,
        paddingLeft: leftFirstBase,
    },

    contentBodyStakeBodyTextValue:{
        width:'50%',
        textAlign:'right',
        fontSize:18,
        lineHeight: 45,
        paddingRight: leftFirstBase,
    },

    contentBodyStakeNetwork:{
        flexDirection:'row',
        flexWrap:'wrap',
    },

    contentBodyVotingList:{
        marginTop:20,
    },

    contentBodyVotingListHeader:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginLeft:leftFirstBase,
        marginRight:leftFirstBase,
    },

    contentBodyVotingListName:{
        color:'grey',
        fontSize:18,
        lineHeight:35,
    },


    ruleModalStyle:{
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },

    ruleSubView:{
        marginLeft:leftFirstBase,
        marginRight:leftFirstBase,
        paddingTop:23,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:23,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },

    ruleContentText:{

    },



    // modal的样式
    modalStyle: {
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:10,
        paddingBottom : 20,
        paddingTop  :10,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },

});
export {
    styles
};




























