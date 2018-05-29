import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    bodyBox: {
        position: "relative",
        flexBasis: "100%",
        backgroundColor: "#eee",
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
    color: "#222",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 60,
  },
  countValueUnit: {
    fontSize: 16,
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
  },
});
const btnStyles = StyleSheet.create({
  btnBox: {
    position : "absolute",
    bottom : 22,
    width : "94%",
    left: "3%",
    backgroundColor: "#000",
  },
  btn: {
    color: "#fff",
    fontSize: 16,
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
