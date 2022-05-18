import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AdmProductStyle } from "./style";
import { partConst, StepsName } from "./constant";
import { Menu, Header, StepsPage } from "components/Form";
import { getPartnerById } from "redux/partner/action";
import BasicDetails from "./pages/BasicDetails";
import ContactDetails from "./pages/ContactDetails";
import FinancialDetails from "./pages/FinancialDetails";

class AdminPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      partData: {},
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.path !== "/partner/new") {
        if (match?.params?.id) await this.props.getPartnerById(match.params.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { partner } = this.props;
      if (partner !== prevProps.partner) {
        this.setState({ partData: partner });
      }
    } catch (error) {
      console.log(error);
    }
  }
  savePartner = (data) => {
    try {
      const { count } = this.state;
      this.setState({ count: count + 1, partData: data });
    } catch (error) {
      console.log(error);
    }
  };
  previous = () => {
    const { count } = this.state;
    this.setState({ count: count - 1 });
  };
  pageUI = () => {
    try {
      const { count, partData } = this.state;
      return count === 0 ? (
        <BasicDetails partData={partData} savePartner={this.savePartner} />
      ) : count === 1 ? (
        <FinancialDetails
          partData={partData}
          savePartner={this.savePartner}
          previous={this.previous}
        />
      ) : count === 2 ? (
        <ContactDetails partData={partData} previous={this.previous} />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  // setPage = (c) => this.setState({ count: c });
  render() {
    const { count } = this.state;
    const { match, loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <AdmProductStyle>
          <Menu />
          <div className="container">
            <Header
              title={"Partner"}
              child={match.path === "/partner/new" ? "New" : "Edit"}
              id={match?.params?.id}
            />
            <div className="allDiv anime">
              <h2 className="hrob">
                {match.path === "/partner/new" ? partConst.add : partConst.edit}
              </h2>
              <div className="detailDiv">
                <StepsPage
                  stepCount={count}
                  StepsName={StepsName}
                  // setPage={match?.params?.id && this.setPage}
                />
                {this.pageUI()}
              </div>
            </div>
          </div>
        </AdmProductStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  getPartnerById: (id) => dispatch(getPartnerById(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPartner)
);
