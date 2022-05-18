import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spin, notification, message } from "antd";

import Routes from "./routes";
import { setAuth } from "redux/login/actions";
import MobileMenu from "components/MobileMenu";
import GlobalStyle, { AppContainer } from "./app.style";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  async componentDidMount() {
    const auth = localStorage.auth;
    if (auth) {
      const session_id = JSON.parse(auth).sessionId;
      await this.props.setAuth(session_id);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { error, message } = this.props;
      if (error !== prevProps.error) {
        if (error) {
          if (window.innerWidth > 1000) {
            notification["error"]({
              message: "Error",
              description: message,
            });
          } else this.displaymsg(message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  displaymsg = (msg) => message.error(msg);
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    const { isAuthenticated, loading } = this.props;
    let user = localStorage.auth && JSON.parse(localStorage.auth).userId;
    return (
      <Spin spinning={loading} size="large">
        <AppContainer id="App">
          <GlobalStyle />
          {user ? <MobileMenu /> : ""}
          <Routes isAuthenticated={isAuthenticated} />
        </AppContainer>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.app.loading,
  error: state.app.error,
  message: state.app.message,
});
const mapStateToDispatch = (dispatch) => ({
  setAuth: (payload) => dispatch(setAuth(payload)),
});
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));
