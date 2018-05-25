import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  bodyBox: {
    position: "relative",
    flexBasis: "100%",
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#fafafa",
    paddingLeft : 10,
  },
  contentBox: {
    paddingTop: 25,
  },
  titleBox: {
    position: "relative",
    marginBottom: 15,
  },
  titleText: {
    fontSize: 18,
    color: "#222",
    textAlign: "right",
    lineHeight: 25,
    marginRight: 15,
  },
  contentMain :{
    width : "90%",
    marginLeft : "5%",
    paddingTop: 30,
  },
  ContentTitleText:{
    fontSize: 28,
    color: "#000",
    paddingBottom: 10,
  },
  ContentBg:{
    backgroundColor: "#000",
    borderRadius : 5,
    padding : 15
  },
  ContentBgTopText:{
    paddingTop: 20,
    color : "#fff",
    fontSize: 20,
  },
  ContentBgMid:{
    paddingTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ContentBgMidText:{
    color : "#fafafa",
    fontSize: 18,
  },
  ContentBgMidBack:{

  },
  ContentBgMidAccount :{
    color : "#fff",
    fontSize : 23,
  },
  ContentBgMidName :{
    color : "#fff",
    fontSize : 18,
  },
  ContentBgBottomText:{
    color : "#fafafa",
    fontSize : 18,
    textAlign: "right"
  }


});
export {
  styles
};
