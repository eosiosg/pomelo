// // 引入公共组件
// import React, { Component } from "react";
// import { applyMiddleware, createStore } from "redux";
// import { Provider } from "react-redux";
// import createSagaMiddleware from "redux-saga";
// import { StackNavigator } from "react-navigation";
// // 引入自定义组件
// import saga from "./utils/saga";
// import reducers from "./utils/reducers";
// // 引入自定义组件
// import HomePage from "./pages/HomePage/index";
// import VotePage from "./pages/VotePage/index";
// import VoteIndexPage from "./pages/VoteIndexPage/index";
// import DelegatebwPage from "./pages/DelegatebwPage/index";
// import UnDelegatebwPage from "./pages/UnDelegatebwPage/index";
// import NodeListPage from "./pages/NodeListPage/index";
// import PasswordInputPage from "./pages/PasswordInputPage/index";
// import I18n from "../I18n";
// import { decryptObject, storage } from "./utils/storage";
// // Navigator
// const Navigator = StackNavigator(
//     {
//         PasswordInputPage: { screen: PasswordInputPage },
//         HomePage: { screen: HomePage },
//         VoteIndexPage: { screen: VoteIndexPage },
//         VotePage: { screen: VotePage },
//         NodeListPage: { screen: NodeListPage },
//         DelegatebwPage: { screen: DelegatebwPage },
//         UnDelegatebwPage: { screen: UnDelegatebwPage },
//     },
//     {
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#E8E8E8',
//                 borderBottomWidth: 0,
//                 elevation: 0,
//             },
//             headerTitleStyle: {
//                 color: '#323232',
//                 fontSize: 19,
//                 lineHeight: 26,
//                 fontWeight: 'bold'
//             },
//             headerTintColor: '#323232',
//             headerBackTitle: null,
//         }
//     }
// );
// // create SagaMiddleware
// const sagaMiddleware = createSagaMiddleware();
// const myStore = createStore(
//     reducers,
//     applyMiddleware( sagaMiddleware )
// );
// sagaMiddleware.run( saga );
//
// I18n.locale = 'en';
//
// // main component
// export default class App extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {};
//   }
//
//     componentWillMount() {
//
//     }
//
//   render() {
//     return (
//         <Provider store={myStore}>
//           <Navigator/>
//         </Provider>
//     );
//   }
// }
