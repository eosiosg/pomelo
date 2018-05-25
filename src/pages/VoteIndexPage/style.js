import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  bodyBox: {
    position: "relative",
    flexBasis: "100%",
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#eee",
  },
  contentBox: {
    paddingTop: 25,
  },
  contentTitleBox: {
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  contentTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
  },
});
const assetStyles = StyleSheet.create({
  assetBox: {
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#555",
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
    borderBottomColor: "#aaa",
  },
  itemName: {
    color: "#222",
    fontSize: 16,
    lineHeight: 48,
  },
  refundingTime: {},
  itemValue: {
    color: "#222",
    fontSize: 16,
    lineHeight: 48,
  },
  itemValueUnit: {},
});
export {
  styles,
  assetStyles,
};
