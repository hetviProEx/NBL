import React, { Component } from "react";
import { Row, Col, Image, Spin, Modal } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { SelesStyle } from "./style";
import { ButtonConst, RemoveConst } from "App/AppConstant";
import { getAuthUserID } from "modules/helper";
import { topRowData, salesConstant } from "./constant";
import {
  getSalesDashboard,
  getSales,
  deleteSales,
  getSalesById,
  getProdSubscript,
} from "redux/crm/action";
import { license, exhaustedLicense, expires } from "components/Images";
import {
  Menu,
  Header,
  Table,
  Pagination,
  ViewModal,
  Input,
} from "components/Form";
var userId = getAuthUserID();

const { confirm } = Modal;
class Sales extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      pageSize: 10,
      current: 1,
      dataLength: 0,
      show: false,
      viewdata: {},
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
    };
  }
  async componentDidMount() {
    try {
      userId = userId ? userId : getAuthUserID();
      const { paramet } = this.state;
      paramet.parameter = userId.toString();
      await this.props.getSalesDashboard(userId);
      await this.props.getSales(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { sales } = this.props;
      if (sales !== prevProps.sales) {
        if (sales?.length > 0)
          this.setState({ dataLength: sales[0]?.totalLenght });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getSales(paramet);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  viewModal = async (id) => {
    try {
      const { show } = this.state;
      id && (await this.props.getSalesById(id));
      id && this.setView(id);
      this.setState({ show: !show });
    } catch (error) {}
  };
  setView = async (id) => {
    try {
      const { sales, sale } = this.props;
      let tabData = sales.find((x) => x.salesId === id);
      let vdata = {};
      vdata = sale;
      vdata.customerName = tabData.customerName;
      vdata.productName = tabData.productName;
      vdata.subscription = tabData.subscription;
      let url = `${sale.pId}/${sale.stype}`;
      await this.props.getProdSubscript(url);
      this.addViewData(vdata);
    } catch (error) {
      console.log(error);
    }
  };
  addViewData = (vdata) => {
    try {
      const { productSubscript } = this.props;
      if (productSubscript) {
        let timepri = productSubscript?.proTimePeriod?.find(
          (x) => x.tId === vdata.timePeriod
        );
        let packag = productSubscript?.sales?.find(
          (x) => x.packageId === vdata.pcId
        );
        vdata.timePri = timepri.timePeriod;
        vdata.packag = packag.package;
        vdata.packagPri = packag.price;
        this.setState({ viewdata: vdata });
      }
    } catch (error) {
      console.log(error);
    }
  };
  topRowUi = () => {
    try {
      const { salesDash } = this.props;
      return topRowData?.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i} className="anime">
          <div className="cardDiv">
            <div className="report-box">
              <div className="box">
                <div className="flex">
                  <h1 className="number">
                    {i === 0
                      ? salesDash[0]?.activeLicense
                      : i === 1
                      ? salesDash[0]?.exhaustedLicence
                      : i === 2
                      ? salesDash[0]?.expiresinNext30days
                      : ""}
                  </h1>
                  <Image
                    width={50}
                    src={
                      i === 0
                        ? license
                        : i === 1
                        ? exhaustedLicense
                        : i === 2
                        ? expires
                        : ""
                    }
                    preview={false}
                    className="topImg"
                  />
                </div>
                <h3 className="name">{a.name}</h3>
              </div>
            </div>
          </div>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  editCall = (id) => {
    try {
      this.props.history.push(`/sales/new/${window.btoa(id)}`);
    } catch (error) {
      console.log(error);
    }
  };
  removeCall = (id) => {
    try {
      confirm({
        title: RemoveConst.remove + salesConstant.record,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          RemoveConst.remove.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("sales_delete"),
        onOk: () => {
          this.remove(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  remove = async (id) => {
    try {
      const { paramet } = this.state;
      await this.props.deleteSales(id);
      await this.props.getSales(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  searchChange = async (e) => {
    try {
      const { paramet } = this.state;
      paramet.search = e.target.value.trim();
      paramet.page = "1";
      this.setState({ current: 1 });
      await this.props.getSales(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { sales, loading } = this.props;
    const { dataLength, current, show, viewdata } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <SelesStyle id="sales_delete">
          <Menu />
          <div className="container">
            <Header title={"Sales"} />
            <div className="allDiv">
              <Row gutter={40}>{this.topRowUi()}</Row>
              <div className="coverDiv">
                <div className="headerDiv">
                  <h2 className="hrob">{salesConstant.saleslist}</h2>
                  <div className="actionDiv">
                    <div
                      className="addButton pointer"
                      onClick={() => this.props.history.push("/sales/new")}
                    >
                      <PlusOutlined />
                    </div>
                  </div>
                </div>
                <div className="contentDiv">
                  {sales?.length > 0 && (
                    <div className="srchDiv">
                      <Input
                        placeholder={ButtonConst.search}
                        suffix={<SearchOutlined />}
                        onChange={this.searchChange}
                      />
                    </div>
                  )}
                  <div className="tableDiv">
                    <Table
                      current={current}
                      type="sales"
                      data={sales}
                      size={10}
                      showModal={this.viewModal}
                      editRecord={this.editCall}
                      deleteRecord={this.removeCall}
                      useractionUI={true}
                    />
                    {dataLength > 10 && (
                      <div className="pagiDiv">
                        <Pagination
                          onChange={this.handlePagination}
                          current={current}
                          total={dataLength}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {show && (
                <ViewModal
                  data={viewdata}
                  visible={show}
                  title={salesConstant.sale}
                  onCancel={this.viewModal}
                  onOk={this.viewModal}
                />
              )}
            </div>
          </div>
        </SelesStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.crm.loading,
  salesDash: state.crm.salesDash,
  sales: state.crm.sales,
  sale: state.crm.sale,
  productSubscript: state.crm.productSubscript,
});
const mapDispatchToProps = (dispatch) => ({
  getSalesDashboard: (payload) => dispatch(getSalesDashboard(payload)),
  getSales: (payload) => dispatch(getSales(payload)),
  deleteSales: (payload) => dispatch(deleteSales(payload)),
  getSalesById: (payload) => dispatch(getSalesById(payload)),
  getProdSubscript: (payload) => dispatch(getProdSubscript(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sales));
