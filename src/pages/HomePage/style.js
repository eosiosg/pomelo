import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({

  bodyBox: {
    position: "relative",
    flexBasis: "100%",
    backgroundColor: "#fafafa",
    // minHeight: Dimensions.get("window").height - 80,
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
    fontSize: 16,
    color: "#323232",
    lineHeight: 25,
    paddingTop : 15,
    paddingBottom : 10,
    paddingLeft: 10,
  },
  titleBox: {
    position: "relative",
    marginBottom: 15,
  },

    netContainer:{
        flex:1, flexDirection:'row',
      paddingTop:13,
        paddingBottom:10,
        paddingLeft:12,
        paddingRight:12,
    },
    netButtonContainer:{
        flexDirection:'row',
      flex:1,
        backgroundColor:'#fff',
        justifyContent: "space-between",
      borderColor:'#000',
        height:80,
    },
    netNameContainer:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-start',
        paddingLeft:10,
        paddingBottom:10,
        flex:7,
    },
    netName:{
      fontSize:18,
    },
    netImageContainer:{
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
        // alignItems:'stretch',
        paddingBottom:15,
        paddingTop:15,
    },
    netImg:{
      flex:1,
        resizeMode: 'contain',
        // height:'100%',
        // width:40,
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
    fontSize : 16,
    paddingTop : 15,
    paddingBottom : 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  bottomContent  :{
    position : "absolute",
    bottom : 25,
    width : "94%",
    left : "3%",
    borderRadius: 5,
    backgroundColor: "#3D4144",
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
    paddingTop:10,
    marginBottom:5,
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    color : "#030303",
  },
  // 内容
  contentText:{
    margin:10,
    paddingBottom : 20,
    paddingTop  :10,
    fontSize:13,
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
    fontSize:17,
    color:'#007AFF',
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
    fontSize: 14,
    color: "#323232",
    lineHeight: 25,
    paddingTop : 15,
    paddingBottom : 10,
    paddingLeft: 10,
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
