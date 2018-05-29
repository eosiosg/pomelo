import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({

  bodyBox: {
    position: "relative",
    flexBasis: "100%",
    backgroundColor: "#fafafa",

  },
  contentBox: {
    paddingTop: 40,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems : "center",
  },
  contentBoxTitle :{
    fontSize: 18,
    color: "#000",
    lineHeight: 25,
    paddingTop : 15,
    paddingBottom : 10,
    paddingLeft: 10,
  },
  titleBox: {
    position: "relative",
    marginBottom: 15,
  },
  contentBoxImg :{
    height :20,
  },
  titleTextTop: {
    fontSize: 22,
    color: "#222",
    textAlign: "center",
    lineHeight: 25,
  },
  conItemTextInput: {
    flexGrow: 1,
    fontSize : 18,
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  bottomContent  :{
    position : "absolute",
    bottom : 0,
    width : "100%",
    backgroundColor: "#000",
  },
  buttonSubmit:{
    fontSize : 16,
    lineHeight: 44,
    color : "#fff",
    textAlign: "center",
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
    margin:8,
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
  //item
  contentItem:{
    borderBottomColor: '#eee',
    borderBottomWidth :  1 ,
    //fontSize : 18,
    paddingTop : 15,
    paddingBottom : 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems : "center"
  },
  contentItemBox:{
    backgroundColor:'#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentItemTitle:{
    paddingBottom : 15,
    paddingTop : 25,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize:18,
    color : "#323232",
  },
  contentItemNo:{
    fontSize : 22,
    paddingTop : 30,
    paddingBottom : 30,
    textAlign : "center",
  },
  contentItemText:{
    fontSize:18,
  },
});
export {
  styles
};
