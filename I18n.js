/**
 * https://github.com/Micjoyce/react-native-i18n-example
 */

import I18n from "react-native-i18n";
import en from "./data/locales/en";
import zh from "./data/locales/zh";
import ko from "./data/locales/ko";

I18n.fallbacks = true;

I18n.translations = {
    en: en,
    zh: zh,
    ko: ko,
};


/**
 * @function I18n.t
 */
export default I18n;