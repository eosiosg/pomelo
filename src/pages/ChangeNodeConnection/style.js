/**
 * Created by dongjie on 31/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
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
    },

    image:{
        width:40,
        height:40
    },

    nodeContainer:{
        flexDirection:'row',
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor:'black',
    }


});
export {
    styles
};