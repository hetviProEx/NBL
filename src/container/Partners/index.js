import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Spin } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import ViewApi from "./viewApi";
import { PartConst } from "./constant";
import { PartnersStyle } from "./style";
import { getAuthRole } from "modules/helper";
import { ButtonConst } from "App/AppConstant";
import { getPartners, deletePartner } from "redux/partner/action";
import {
  Menu,
  Header,
  Table,
  Input,
  Pagination,
  ExportModal,
} from "components/Form";
const { confirm } = Modal;
var role = getAuthRole();

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLength: 0,
      currentPage: 1,
      modelData: {},
      viewModel: false,
      prData: [],
      allprData: [],
      paramet: {
        page: "1",
        search: "",
        parameter: "",
        pageSize: "10",
        sortColumn: "id",
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      role = role ? role : getAuthRole();
      if (role === "partner") this.props.history.push("/dashboard");
      else {
        await this.props.getPartners(paramet);
        paramet.pageSize = "2000";
        this.setState({ paramet });
        await this.props.getPartners(paramet);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { partners } = this.props;
      if (partners !== prevProps.partners) {
        if (partners?.length > 0) {
          const { paramet } = this.state;
          let arr = [];
          partners?.forEach((a, i) => {
            a.no = i + 1;
            a.status = a.isActive ? "Deactive" : "Active";
            arr.push(a);
          });
          if (paramet.pageSize === "2000") {
            paramet.pageSize = "10";
            this.setState({ allprData: arr, paramet });
          } else this.setState({ dataLength: arr[0].totalLenght, prData: arr });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  setAdd = () => {
    try {
      if (role === "user") {
        let rights = window.atob(sessionStorage.rights);
        return rights.match("partnersadd");
      } else return true;
    } catch (error) {
      console.log(error);
    }
  };
  searchChange = async (e) => {
    try {
      let parameter = this.state.paramet;
      parameter.search = e.target.value.trim();
      parameter.page = "1";
      this.setState({ currentPage: 1 });
      await this.props.getPartners(parameter);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    let parameter = this.state.paramet;
    parameter.page = val.toString();
    await this.props.getPartners(parameter);
    this.setState({ currentPage: val });
  };
  deleteWarning = (id, val) => {
    try {
      let title = val === 1 ? PartConst.actPartner : PartConst.deactPartner;
      confirm({
        title: title,
        icon: <QuestionCircleOutlined />,
        content: PartConst.content + title.toLocaleLowerCase() + PartConst.qus,
        okText: PartConst.yes,
        okType: "danger",
        cancelText: PartConst.no,
        onOk: () => {
          this.activeDeactive(id, val);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  activeDeactive = async (id, val) => {
    try {
      const { paramet } = this.state;
      let actDeAct = val === 1 ? 0 : val === 0 ? 1 : null;
      await this.props.deletePartner(id + "/" + actDeAct);
      await this.props.getPartners(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  editPartnerApi = (id) => this.props.history.push(`partner/edit/${id}`);
  viewPartner = (data) => this.setState({ viewModel: true, modelData: data });
  close = () => this.setState({ viewModel: false });
  render() {
    const { loading } = this.props;
    const { dataLength, currentPage, viewModel, modelData, prData, allprData } =
      this.state;
    return (
      <Spin spinning={loading} size="large">
        <PartnersStyle>
          <Menu />
          <div className="container" id="partner-view">
            <Header title={"Partners"} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{PartConst.partners}</h2>
                  <div className="actDIV">
                    {this.setAdd() && (
                      <div
                        className="addButton pointer"
                        onClick={() => this.props.history.push("/partner/new")}
                      >
                        <PlusOutlined />
                      </div>
                    )}
                  </div>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    <div className="expoDiv">
                      {allprData.length > 0 && (
                        <ExportModal data={allprData} type="partners" />
                      )}
                    </div>
                    {prData?.length > 0 && (
                      <div className="srchDiv">
                        <Input
                          placeholder={ButtonConst.search}
                          suffix={<SearchOutlined />}
                          onChange={this.searchChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="tableDIV">
                    <Table
                      current={currentPage}
                      type="partners"
                      data={prData}
                      deleteRecord={this.deleteWarning}
                      editRecord={this.editPartnerApi}
                      viewRecord={this.viewPartner}
                    />
                    {dataLength > 10 && (
                      <div className="pagiDiv">
                        <Pagination
                          onChange={this.handlePagination}
                          current={currentPage}
                          total={dataLength}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {viewModel && (
              <ViewApi
                view={viewModel}
                data={modelData}
                modelCancel={this.close}
              />
            )}
          </div>
        </PartnersStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  partners: state.partner.partners,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  getPartners: (payload) => dispatch(getPartners(payload)),
  deletePartner: (id) => dispatch(deletePartner(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Partners)
);
