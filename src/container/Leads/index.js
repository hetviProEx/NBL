import React, { Component } from "react";
import { Spin, Modal } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Demo from "./Pages/Demo";
import { LeadsStyle } from "./style";
import { LeadsConst } from "./constant";
import Prospect from "./Pages/Prospect";
import LeadsForm from "./Pages/LeadsForm";
import { configVar, crmConst } from "modules/config";
import { getProspect, getLeads, getDemo } from "redux/crm/action";
import { setProspect, setLead, setDemo } from "redux/setLeads/actions";
import { Menu, Header, ViewModal, TransferModal } from "components/Form";

const { confirm } = Modal;

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      title: "",
      show: false,
      showTransfer: false,
      viewdata: {},
      directData: {},
      creatDirect: false,
      todaySDate: "",
    };
  }
  componentDidMount() {
    try {
      let today = new Date();
      today =
        today.getFullYear() +
        "/" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(today.getDate()).padStart(2, "0");
      this.setState({ todaySDate: today });
    } catch (error) {
      console.log(error);
    }
  }
  // tabUI = () => {
  //   try {const { count } = this.state;let cls = "selectedTab ";
  //     return TabsConst?.map((a, i) => (
  //       <div className={`tabComp pointer ${i === count ? (i !== 2 ? cls + "selArrow " : cls) : ""
  //         } ${i === 1 ? "leadText " : ""} ${a.clsName}`} key={i} onClick={() => this.countHandle(i)}> {a.name}</div>));
  //   } catch (error) {console.log(error);}};
  countHandle = (i) => this.setState({ count: i });
  contentUI = () => {
    try {
      const { count, directData, todaySDate } = this.state;
      return (
        <>
          {count === 0 ? (
            <Prospect
              count={count}
              show={this.show}
              showTranModal={this.showTranModal}
              countHandle={this.countHandle}
              goToDirect={this.goToDirect}
              callSetLeads={this.callSetLeads}
              todaySDate={todaySDate}
            />
          ) : count === 1 ? (
            <LeadsForm
              count={count}
              show={this.show}
              countHandle={this.countHandle}
              goToDirect={this.goToDirect}
              callSetLeads={this.callSetLeads}
              directData={directData}
              todaySDate={todaySDate}
            />
          ) : (
            <Demo
              count={count}
              show={this.show}
              countHandle={this.countHandle}
              directData={directData}
              goToDirect={this.goToDirect}
              callSetLeads={this.callSetLeads}
              todaySDate={todaySDate}
            />
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  callSetLeads = (id, val, type, paramet) => {
    try {
      let title =
        val === 1 ? LeadsConst.active + type : LeadsConst.deActive + type;
      confirm({
        title: title,
        icon: <QuestionCircleOutlined />,
        content:
          LeadsConst.content + title.toLocaleLowerCase() + LeadsConst.qus,
        okText: LeadsConst.yes,
        okType: "danger",
        cancelText: LeadsConst.no,
        onOk: () => {
          this.setLeads(id, val, type, paramet);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  setLeads = async (id, val, type, paramet) => {
    try {
      let actDeAct = val === 1 ? 0 : val === 0 ? 1 : null;
      let pathVal = id + "/" + actDeAct;
      if (type === "Prospect") {
        await this.props.setProspect(pathVal);
        await this.props.getProspect(paramet);
      } else if (type === "Leads") {
        await this.props.setLead(pathVal);
        await this.props.getLeads(paramet);
      } else if (type === "Meetings") {
        await this.props.setDemo(pathVal);
        await this.props.getDemo(paramet);
      }
    } catch (error) {
      console.log(error);
    }
  };
  show = (data, title) => {
    try {
      const { show } = this.state;
      data && this.setState({ viewdata: data, title, show: !show });
    } catch (error) {
      console.log(error);
    }
  };
  showTranModal = () => {
    try {
      const { showTransfer } = this.state;
      this.setState({ showTransfer: !showTransfer });
    } catch (error) {
      console.log(error);
    }
  };
  download = () => {
    try {
      let url = configVar.BASE_URL + crmConst.GET_DOWNLOAD;
      url = url.replace(/[^\x00-\x7F]/g, "");
      var win = window.open(url, "_blank");
      win.focus();
      this.setState({ showTransfer: false });
    } catch (error) {
      console.log(error);
    }
  };
  goToDirect = (i, data) => {
    try {
      this.setState({ count: i, directData: data });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { show, viewdata, title, showTransfer } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <LeadsStyle>
          <Menu />
          <div className="container" id="crm-form">
            <Header title={"Leads"} />
            <div className="allDiv">
              {this.contentUI()}
              {show && (
                <ViewModal
                  data={viewdata}
                  title={title}
                  visible={show}
                  onCancel={this.show}
                  onOk={this.show}
                />
              )}
              {showTransfer && (
                <TransferModal
                  download={this.download}
                  title={LeadsConst.adiBul}
                  visible={showTransfer}
                  onCancel={this.showTranModal}
                  onOk={this.showTranModal}
                />
              )}
            </div>
          </div>
        </LeadsStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.crm.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getProspect: (payload) => dispatch(getProspect(payload)),
  setProspect: (id) => dispatch(setProspect(id)),
  setLead: (id) => dispatch(setLead(id)),
  getLeads: (payload) => dispatch(getLeads(payload)),
  setDemo: (id) => dispatch(setDemo(id)),
  getDemo: (payload) => dispatch(getDemo(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Leads));
