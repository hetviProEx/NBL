import React, { Component } from "react";
import { Spin, Row, Col } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { ViewStyle } from "./style";
import { getLeadsMeeting } from "redux/crm/action";
import { LeViewConst } from "./constant";
import { Menu, Header, Label, Table } from "components/Form";

class LeadsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prosData: {},
      detailLoad: false,
      leadsData: [],
      meetingData: [],
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      let id = parseInt(window.atob(match.params.id));
      let data = localStorage.viewProspect
        ? JSON.parse(localStorage.viewProspect)
        : null;
      if (data) {
        this.setdefault(data);
        await this.props.getLeadsMeeting(id);
      } else {
        this.props.history.push("/leads");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { leadsMeeting } = this.props;
      if (leadsMeeting !== prevProps.leadsMeeting) {
        this.setState({
          leadsData: leadsMeeting.lead,
          meetingData: leadsMeeting.demo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setdefault = (data) => {
    try {
      this.setState({ prosData: data, detailLoad: true });
      setTimeout(() => {
        this.setState({ detailLoad: false });
      }, 1000);
      localStorage.removeItem("viewProspect");
    } catch (error) {
      console.log(error);
    }
  };
  fieldUI = (a, b) => {
    return (
      <Col
        xs={24}
        sm={24}
        md={a === "Address" ? 24 : 12}
        lg={a === "Address" ? 24 : 8}
        xl={a === "Address" ? 24 : 8}
        className="anime"
      >
        <Label title={a} />
        <div className="valueDiv">{b !== "" ? b : "---"}</div>
      </Col>
    );
  };
  render() {
    const { prosData, detailLoad, leadsData, meetingData } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={detailLoad ? detailLoad : loading} size="large">
        <ViewStyle>
          <Menu />
          <div className="container">
            <Header title={"Leads"} />
            <div className="allDiv anime">
              <div className="coverDiv">
                <div className="headerDiv">
                  <h2 className="hrob">{LeViewConst.pros}</h2>
                  <div className="actionDiv">
                    <div
                      className="addButton pointer"
                      onClick={() => this.props.history.push("/leads")}
                    >
                      <ArrowLeftOutlined />
                    </div>
                  </div>
                </div>
                <div className="contentDiv">
                  <div className="detailDiv">
                    <h2 className="hrob">{LeViewConst.dtl}</h2>
                    <Row gutter={24}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h1>{prosData?.customerName}</h1>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <h3>{LeViewConst.comName + LeViewConst.colon}</h3>
                          { prosData?.companyName}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <h3>{LeViewConst.mNum + LeViewConst.colon}</h3>
                          { prosData?.mobileNo?.split(", ")[0]?prosData?.mobileNo?.split(", ")[0]:"---"}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <h3>{LeViewConst.email + LeViewConst.colon}</h3>
                          { prosData?.mobileNo?.split(", ")[1]?prosData?.mobileNo?.split(", ")[1]:"---"}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <h3>{LeViewConst.src + LeViewConst.colon}</h3>
                          {prosData?.source !==""?prosData?.source:"---"}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <h3>{LeViewConst.prosDate + LeViewConst.colon}</h3>
                          {prosData?.prospectDate !== ""?
                           prosData?.prospectDate?.split("T")[0]:"---"}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <h3>{LeViewConst.add + LeViewConst.colon}</h3>
                          {prosData?.address !== ""?
                           prosData?.address:"---"}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                {leadsData.length > 0 && (
                  <div className="contentDiv">
                    <div className="tableDiv">
                      <h2 className="hrob">{LeViewConst.lds}</h2>
                      <Table
                        data={leadsData}
                        type={LeViewConst.lds}
                        pagiTF={leadsData.length > 10}
                      />
                    </div>
                  </div>
                )}
                {meetingData?.length > 0 && (
                  <div className="contentDiv">
                    <div className="tableDiv">
                      <h2 className="hrob">{LeViewConst.meet}</h2>
                      <Table
                        data={meetingData}
                        type={LeViewConst.meet}
                        pagiTF={meetingData.length > 10}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ViewStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.crm.loading,
  leadsMeeting: state.crm.leadsMeeting,
});
const mapDispatchToProps = (dispatch) => ({
  getLeadsMeeting: (payload) => dispatch(getLeadsMeeting(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsView)
);
