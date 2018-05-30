/**
 * Created by dongjie on 29/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";
import { getDpFromPx } from "./../utils/util";




const commonStyles = StyleSheet.create({
    bottomButton : {
        fontSize : 18,
        lineHeight: 44,
        color : "#fff",
        textAlign: "center",
        backgroundColor: "#3D4144",
        position : "absolute",
        bottom : 5,
        width : "94%",
        left: "3%",
    }

});
export {
    commonStyles
};
