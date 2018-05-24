/**
 * 校验手机号
 * */
const isPhoneNumber = (phone) => {
    const regexp = new RegExp("^1[3|4|5|6|7|8][0-9]{9}$");
    let isTrue = false;
    if (phone && regexp.test(phone)) {
        isTrue = true;
    }
    return isTrue;
};
/**
 * 数字三分位
 * */
const numberStandard = (num) => {
    let newNum = Number(num).toFixed(2);
    newNum = newNum.replace(/\B(?=(?:\d{3})+\b)/g, ",").replace(/(.00)$/, "");
    return newNum;
};
const formatNum = (num) => {
    let newStr = "";
    let count = 0;
    let str = String(num);
    if (str.indexOf(".") === -1) {
        for (let i = str.length - 1; i >= 0; i -= 1) {
            if (count % 3 === 0 && count !== 0) {
                newStr = `${str.charAt(i)}, ${newStr}`;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count += 1;
        }
        // 自动补小数点后两位
        str = `${newStr}.00`;
    } else {
        for (let i = str.indexOf(".") - 1; i >= 0; i -= 1) {
            if (count % 3 === 0 && count !== 0) {
                newStr = `${str.charAt(i)}, ${newStr}`;
            } else {
                // 逐个字符相接起来
                newStr = str.charAt(i) + newStr;
            }
            count += 1;
        }
        str = newStr + (`${str}00`).substr((`${str}00`).indexOf("."), 3);
    }
    return str;
};
export {
    isPhoneNumber,
    numberStandard,
    formatNum,
};
