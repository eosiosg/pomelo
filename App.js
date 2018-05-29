// 引入公共组件
import React, { Component } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { StackNavigator } from "react-navigation";
// 引入自定义组件
import saga from "./src/utils/saga";
import reducers from "./src/utils/reducers";
// 引入自定义组件
import HomePage from "./src/pages/HomePage";
import VotePage from "./src/pages/VotePage";
import VoteIndexPage from "./src/pages/VoteIndexPage";
import DelegatebwPage from "./src/pages/DelegatebwPage";
import UnDelegatebwPage from "./src/pages/UnDelegatebwPage";
import NodeListPage from "./src/pages/NodeListPage";
//import { persistStore, autoRehydrate } from "redux-persist";
//import createEncryptor from "redux-persist-transform-encrypt";
import I18n from "./I18n";
// Navigator
const Navigator = StackNavigator(
    {
        HomePage: { screen: HomePage },
        VoteIndexPage: { screen: VoteIndexPage },
        VotePage: { screen: VotePage },
        NodeListPage: { screen: NodeListPage },
        DelegatebwPage: { screen: DelegatebwPage },
        UnDelegatebwPage: { screen: UnDelegatebwPage },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#E8E8E8',
                borderBottomWidth: 0,
                elevation: 0,
            },
            headerTitleStyle: {
                color: '#323232',
                fontSize: 19,
                lineHeight: 26,
                fontWeight: 'bold'
            },
            headerTintColor: '#323232',
            headerBackTitle: null,
        }
    }
);
// create SagaMiddleware
const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(
    reducers,
    applyMiddleware( sagaMiddleware )
);
sagaMiddleware.run( saga );

I18n.locale = 'en';

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
