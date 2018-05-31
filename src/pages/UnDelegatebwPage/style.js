import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    bodyBox: {
        position: "relative",
        flexBasis: "100%",
        backgroundColor: "#eee",
        minHeight: Dimensions.get("window").height - 80,
    },
});
const countStyles = StyleSheet.create({
  countBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  countItem: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  countName: {
    color: "#222",
    fontSize: 16,
    lineHeight: 60,
  },
  countValue: {
    color: "#181818",
    fontSize: 20,
    fontWeight: "600",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  countValueUnit: {
    fontSize: 14,
    color: "#0c0c0c",
  },
  countInfoBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
  countInfo: {
    color: "#999",
    fontSize: 14,
    textAlign: "right",
  },
});
const stakeStyles = StyleSheet.create({
  stakeBox: {
    position: "relative",
    marginTop: 25,
  },
  titleTipBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  titleTip: {
    color: "#999",
    fontSize: 16,
  },
  stakeConBox: {
    position: "relative",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  stakeItem: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  stakeName: {
    color: "#222",
    fontSize: 16,
    lineHeight: 60,
  },
  stakeValue: {
    position: "relative",
  },
  stakeValueInput: {
    width: 160,
    height: 60,
    lineHeight: 60,
    color: "#222",
    textAlign: "right",
  },
});
const btnStyles = StyleSheet.create({
  btnBox: {
    position : "absolute",
    bottom : 5,
    width : "96%",
    left: "2%",
    backgroundColor: "#3D4144",
  },
  btn: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 44,
    textAlign: "center",
  },
});
export {
  styles,
  countStyles,
  stakeStyles,
  btnStyles,
};
