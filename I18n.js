/**
 * https://github.com/Micjoyce/react-native-i18n-example
 */

import I18n from "react-native-i18n";
import en from "./data/locales/en";
import zh from "./data/locales/zh";

I18n.fallbacks = true;

I18n.translations = {
    en: en,
    zh: zh
};


/**
 * @function I18n.t
 */
export default I18n;