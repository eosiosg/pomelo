import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    bodyBox: {
        position: "relative",
        flexBasis: "100%",
        minHeight: Dimensions.get("window").height,
        backgroundColor: "#eee",
      paddingTop: 35,
    },
    contentBox: {
      minHeight: Dimensions.get("window").height,
    },
    bodyFooterBox: {
      position: "absolute",
      bottom: 5,
      width: Dimensions.get("window").width,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
    },
    bodyFooterFlg: {
      flex: 0,
      height: 5,
      width: Dimensions.get("window").width/2.5,
      borderRadius: 3,
      backgroundColor: "#222",
    },
});
const navStyles = StyleSheet.create({
  navBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  navItem: {
      flex: 0,
  },
  navTitle: {
    color: "#222",
    fontSize: 18,
    fontWeight: "600",
  },
});
const countStyles = StyleSheet.create({
  countBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
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
  countStakeValue: {
    color: "#F65858",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 60,
  },
  countValueUnit: {
    fontSize: 16,
    color: "#222",
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
  checkBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
const ruleStyles = StyleSheet.create({
  ruleBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
  },
  ruleTitle: {
    marginBottom: 5,
    color: "#555",
    fontSize: 16,
  },
  ruleDesc: {
    color: "#555",
    fontSize: 14,
    lineHeight: 28,
  },
});
const btnStyles = StyleSheet.create({
  btnBox: {
    position: "absolute",
    bottom: 15,
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  btn: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 60,
  },
});
export {
  styles,
  navStyles,
  countStyles,
  stakeStyles,
  ruleStyles,
  btnStyles,
};
