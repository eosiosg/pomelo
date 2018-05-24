import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
// 设置本地存储方法对象；
const storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    sync: () => null,

});
// 自定义存储对象
const localSave = {};
localSave.set = (key, data) => {
    storage.save({key, data,});
};
localSave.setLoginUserPhone = (phone) => {
    localSave.set("LoginUserPhone", phone);
};
localSave.setLoginUserId = (id) => {
    localSave.set("LoginUserId", id);
};
localSave.setLoginState = (state) => {
    localSave.set("LoginState", state);
};
localSave.setLoginAuthorization = (data) => {
    localSave.set("Authorization", data);
};
// localSave.setLoginState(false);
export {
    storage,
    localSave,
};
