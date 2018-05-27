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
  bodyFooterBox: {
    position: "absolute",
    bottom: 115,
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
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
  refundingTime: {
    fontSize: 14,
    color: "#555",
  },
  itemValue: {
    color: "#222",
    fontSize: 20,
    lineHeight: 48,
  },
  itemValueUnit: {
    fontSize: 16,
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
    marginBottom: 15,
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 0,
    paddingTop: 15,
    paddingBottom: 10,
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
    backgroundColor: "#abc",
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
export {
  styles,
  assetStyles,
  voteStyles,
  voteBpsStales,
};
