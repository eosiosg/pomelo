// 引入公共组件
import React, { PureComponent } from "react";
import {connect} from "react-redux";
import {IntlProvider} from 'react-intl';
import { translationMessages } from "./i18n"

class IntlProviderLanguage extends PureComponent {
    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            header: null
        };
    }

    constructor (props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
          <IntlProvider locale={this.props.Language} messages={translationMessages[this.props.Language]}>
            {React.Children.only(this.props.children)}
          </IntlProvider>
        );
    }
}

// 挂载中间件到组件；
const mapStateToProps = (state) => {
    return {
      Language: state.IntlProviderLanguageReducer.Language,
    };
};
export default connect(mapStateToProps)(IntlProviderLanguage);
