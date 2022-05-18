import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "antd/dist/antd.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import store from "redux/store";
import DashApp from "./App";
import { history } from "../history";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <DashApp />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
