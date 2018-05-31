import { StyleSheet } from "react-native";
import { getDpFromPx } from "../../utils/util";

const styles = StyleSheet.create( {
    wrapper: {
        flex: 1
    },
    mgl_normal: {
        marginLeft: 15
    },
    justAlignCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    commonTextColorStyle: {
        color: '#323232'
    },
    commonSubTextColorStyle: {
        color: '#999999'
    },
    commonIntervalStyle: {
        height: getDpFromPx( 1 ),
        backgroundColor: '#e8e8e8'
    },
} );
export {
    styles
};
