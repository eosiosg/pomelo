import { StackNavigator } from "react-navigation";
import PasswordInputPage from "./pages/PasswordInputPage";
import VoteIndexPage from "./pages/VoteIndexPage";
import HomePage from "./pages/HomePage";
import VotePage from "./pages/VotePage";
import DelegatebwPage from "./pages/DelegatebwPage";
import NodeListPage from "./pages/NodeListPage";
import ChangeNodeConnection from "./pages/ChangeNodeConnection";
import UnDelegatebwPage from "./pages/UnDelegatebwPage";
import ClaimRewardsPage from "./pages/ClaimRewardsPage";

export const AppNavigator = StackNavigator(
    {
        HomePage: { screen: HomePage },
        VoteIndexPage: { screen: VoteIndexPage },
        VotePage: { screen: VotePage },
        NodeListPage: { screen: NodeListPage },
        DelegatebwPage: { screen: DelegatebwPage },
        ChangeNodeConnection: { screen: ChangeNodeConnection },
        UnDelegatebwPage: { screen: UnDelegatebwPage },
        PasswordInputPage: { screen: PasswordInputPage },
        ClaimRewardsPage: { screen: ClaimRewardsPage },
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