import {Dimensions, StyleSheet} from "react-native";
import { getDpFromPx } from "../../utils/util";

const styles = StyleSheet.create({
  bodyBox: {
    position: "relative",
    flexBasis: "100%",
    backgroundColor: "#eee",
  },
  contentTitleBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  contentTitle: {
    fontSize: 32,
    fontWeight: "bold",
    // color: "#222",
  },

    footerView:{
        height:50,
        width:'100%',
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"#5d5d5d",
    },


    footerVersion:{
        width:'100%',
        color:'#686868',
        fontSize:14,
        lineHeight:20,
        // paddingTop:4,
        textAlign:'center',
    },
});
const assetStyles = StyleSheet.create({
  contentAssetBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  totalAssetBox: {
    position: "relative",
  },
  totalAssetBgImg: {
    position: "relative",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    height: 130,
    width: Dimensions.get("window").width - 30,
    backgroundColor: "#353535",
  },
  userNameBox: {
    position: "relative",
    marginBottom: 25,
  },
  userNameTip: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  userName: {
    fontSize: 18,
  },
  userTotalAssetBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  userTotalAssetTip: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  userTotalAssetValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  userTotalAssetValueUnit: {
    fontSize: 16,
  },
  userTotalAssetByUsd: {
    textAlign: "right",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  assetItemBox: {
    position: "relative",
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: {
    color: "#222",
    fontSize: 16,
    lineHeight: 48,
  },
  itemValue: {
    color: "#222",
    fontSize: 20,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  itemValueUnit: {
    fontSize: 14,
    color: "#555",
  },
  itemRefundBox: {
    height: 48,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemRefundName: {
    marginRight: 10,
    color: "#222",
    fontSize: 16,
  },
  refundingIcon: {
    width: 16,
    height: 16,
  },
  refundingTime: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
});
const voteStyles = StyleSheet.create({
  contentVoteBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 0,
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  voteTitle: {
    marginBottom: 5,
    color: "#222",
    fontSize: 22,
    fontWeight: "600",
  },
  voteDesc: {
    marginBottom: 15,
    color: "#999",
    fontSize: 14,
  },
  voteItemList: {
  },
  voteItem: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  voteItemName: {
    color: "#222",
    fontSize: 16,
    lineHeight: 48,
  },
  voteItemActionIcon: {
    width: 16,
  },
});
const voteBpsStales = StyleSheet.create({
  contentVoteBpsBox: {
    position: "relative",
    // marginBottom: 15,
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 0,
    paddingTop: 15,
    // paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  VoteBpsTitleBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  VoteBpsTitleFlg: {
    height: 12,
    width: 3,
    marginRight: 5,
    backgroundColor: "#1BCE9A",
  },
  VoteBpsTitle: {
    color: "#222",
    fontSize: 22,
    fontWeight: "600",
  },
  VoteBpsList: {
    paddingTop: 5,
  },
  VoteBpsItem: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  VoteBpsItemName: {
    marginBottom: 5,
    color: "#222",
    fontSize: 18,
    fontWeight: "600",
  },
  VoteBpsItemDesc: {
    color: "#999",
    fontSize: 14,
  },
});
const modalStyles = StyleSheet.create({
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
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  // 竖直的分割线
  verticalLine:{
    flex: 0,
    width:0.5,
    height:44,
    backgroundColor:'#ccc',
  },
  buttonStyle:{
    flex: 1,
    fontSize: 17,
    color: "#007AFF",
    lineHeight:44,
    textAlign: "center",
  },
});

const style = StyleSheet.create( {
    wrapper: {
        flex: 1
    },
    mgl_normal: {
        marginLeft: 15
    },
    justAlignCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    commonTextColorStyle: {
        color: '#323232'
    },
    commonSubTextColorStyle: {
        color: '#999999'
    },
    commonIntervalStyle: {
        height: getDpFromPx( 1 ),
        backgroundColor: '#e8e8e8'
    },

} );

export {
  styles,
  assetStyles,
  voteStyles,
  voteBpsStales,
  modalStyles,
    style
};
