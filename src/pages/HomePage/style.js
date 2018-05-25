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
    paddingTop: 20,
  },
  contentBoxTitle :{
    fontSize: 18,
    color: "#000",
    lineHeight: 25,
    paddingTop : 15,
    paddingBottom : 10,
  },
  titleBox: {
    position: "relative",
    marginBottom: 15,
  },
  titleText: {
    fontSize: 22,
    color: "#222",
    textAlign: "center",
    lineHeight: 25,
    paddingTop : 15,
    paddingBottom : 10,
  },
  conItemTextInput: {
    flexGrow: 1,
    fontSize : 18,
    paddingTop : 5,
    paddingBottom : 5,
    backgroundColor: "#fff",
    color: "#000",
  },
  bottomContent  :{
    position : "absolute",
    bottom : 20,
    width : "100%",
  },
  buttonSubmit:{
    width : "90%",
    marginLeft : "5%",
    backgroundColor: "#000",
    color : "#fff",
    textAlign: "center",
    fontSize : 18,
    paddingBottom : 10,
    paddingTop  :10,
    borderRadius: 3
  }
});
export {
  styles
};
