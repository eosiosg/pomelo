/**
 * Created by dongjie on 24/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";

const leftFirstBase = 13;
const deleteButtonRadius = 12;
const voteItemHeight = 45;
const footerHeight = 66;
const spaceTop = 40;

const navStyles = StyleSheet.create({
    navBox: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop:spaceTop,
        paddingLeft: 15,
        paddingRight: 15,
        position:'absolute',
    },
    navItem: {
        position:'absolute',
        top:spaceTop,
        left:leftFirstBase,
        flex: 0,
    },
    navTitle: {
        color: "#222",
        fontSize: 18,
        fontWeight: "600",
    },
});

const styles = StyleSheet.create({


    bodyBox: {
        position: "relative",
        flexBasis: "100%",
        minHeight: Dimensions.get("window").height,
        backgroundColor: "#f0f1f1",
    },

    header:{
        position:"absolute",
        height:50,
        width:'100%',
    },

    pageTitle:{
        width:'100%',
        fontSize:17,
        lineHeight:23,
        textAlign:'center',
    },

    scrollBodyBox:{
        paddingTop:spaceTop+20,
        paddingBottom:footerHeight,
        overflow:'hidden',
    },

    contentHeader: {
        marginTop: 20,
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

    contentHeaderBalance:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth: 0.5,
        borderBottomColor:'#ccc',
        marginLeft:8,
        marginRight:8,
    },

    contentHeaderStake:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft: 5,
        paddingRight: 5,
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

    contentHeaderBalanceValueContainer:{
        width:'50%',
        textAlign:'right',
        // fontSize:18,
        // lineHeight: 45,
        // color:'grey',
    },

    contentHeaderBalanceValue:{
        fontSize:22,
        lineHeight: 45,
    },

    contentHeaderEOSSignContainer:{
        // paddingTop:2.5,
        paddingLeft:3,
    },

    contentHeaderEOSSign:{
        fontSize:14,
        lineHeight:35,
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
        lineHeight:42,
    },

    contentBodyStakeHeaderQuestionContainer:{
        width:'50%',
        alignItems:'flex-end',
    },

    contentBodyStakeHeaderQuestionBox:{
        backgroundColor:'#dcdcdc',
        width:24,
        height:24,
        borderRadius:12,
        marginTop:9,
    },

    contentBodyStakeHeaderQuestion:{
        textAlign:'center',
        color:'black',
        fontSize:16,
        lineHeight:24,
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

    contentBodyBPListContainer:{
        backgroundColor: "#ffffff",
    },

    contentBodyBP:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginLeft: leftFirstBase,
        marginRight: leftFirstBase,
        borderBottomWidth:0.5,
        borderBottomColor:'#ccc',
    },

    contentBodyBPName:{
        width:'50%',
        fontSize:18,
        lineHeight: 45,
    },

    contentBodyBPDeleteContainer:{
        alignItems: 'flex-end',
        width:'50%',
    },

    contentBodyBPDeleteButton:{
        width:deleteButtonRadius*2,
        height: deleteButtonRadius*2,
        borderRadius: deleteButtonRadius,
        borderWidth: deleteButtonRadius/10,
        borderColor:'#000',
        marginTop:voteItemHeight/2-deleteButtonRadius,
        marginRight:0,
    },

    contentBodyBPDeleteButtonInner:{
        marginTop:deleteButtonRadius/10*8.5,
        marginLeft:deleteButtonRadius/10*2,
        width:deleteButtonRadius/10*14,
        borderBottomWidth: deleteButtonRadius/10*2,
        borderColor:'#000',
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
        marginBottom:5,
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



    footerView:{
        position:'absolute',
        height:footerHeight,
        width:'100%',
        backgroundColor:'#736d75',
        bottom:0,
    },

    footerViewTouchArea:{
        height:footerHeight,
    },

    footerSubmit:{
        width:'100%',
        color:'#ffffff',
        fontSize:20,
        paddingTop:4,
        textAlign:'center',
    },
});
export {
    styles, navStyles
};




























