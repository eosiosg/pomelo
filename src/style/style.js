/**
 * Created by dongjie on 29/5/18.
 */

import {Dimensions, StyleSheet} from "react-native";
import { getDpFromPx } from "./../utils/util";

const ModalYNStyles = StyleSheet.create({

    // modal的样式
    modalStyle: {
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:10,
        paddingBottom : 20,
        paddingTop  :10,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:1,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:1,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },

})


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
    commonStyles,
    ModalYNStyles
};
