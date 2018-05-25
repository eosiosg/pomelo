// 引入公共组件
import React, { Component } from "react";
import {createStore, compose, applyMiddleware } from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import { StackNavigator } from "react-navigation";
//import { persistStore, autoRehydrate } from "redux-persist";
//import createEncryptor from "redux-persist-transform-encrypt";

// 引入自定义组件
import saga from "./src/utils/saga";
import reducers from "./src/utils/reducers";

// 引入自定义组件
import HomePage from "./src/pages/HomePage";
import NodeListPage from "./src/pages/NodeListPage";
import WalletPage from "./src/pages/WalletPage";


// Navigator
const Navigator = StackNavigator(
  {
    HomePage: { screen: HomePage },
    WalletPage: { screen: WalletPage },
  },
    {
        NodeListPage: { screen: NodeListPage },
    },
  {
    navigationOptions: {
      header: null,
    },
  }
);
// create SagaMiddleware
const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(saga);

// main component
export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={myStore}>
        <Navigator/>
      </Provider>
    );
  }
}
