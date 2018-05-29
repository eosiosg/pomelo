/**
 * Created by dongjie on 29/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";
import { getDpFromPx } from "../../utils/util";




const commonStyles = StyleSheet.create({
    bottomButton : {
        fontSize : 16,
        lineHeight: 44,
        color : "#fff",
        textAlign: "center",
        backgroundColor: "#000",
        position : "absolute",
        bottom : 0,
        width : "94%",
        // left: "3%",
    }

});
export {
    commonStyles
};