/**
 * Created by dongjie on 24/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    bodyBox: {
        position: "relative",
        flexBasis: "100%",
        minHeight: Dimensions.get("window").height,
        backgroundColor: "#fff",
    },
    contentBox: {
        paddingTop: 100,
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
    },
});
export {
    styles
};