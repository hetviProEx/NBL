import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Spin } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { PackageListStyle } from "./style";
import { Menu, Header, Input, Table } from "components/Form";
import { ButtonConst, RemoveConst } from "App/AppConstant";
import { PackListConst } from "./constant";
import { getPackageById, deleteProductPackage } from "redux/subscribe/action";
const { confirm } = Modal;
class PackageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      productId: 0,
      search: "",
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.name) {
        this.setState({ item: match.params.name });
      }
      if (match.params.id) {
        let id = window.atob(match.params.id);
        this.setState({ productId: id });
        await this.props.getPackageById(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  searchChange = async (e) => this.setState({ search: e.target.value.trim() });
  editRow = (id) => {
    try {
      const { item, productId } = this.state;
      this.props.history.push(
        `/package/${item}/edit/${window.btoa(productId)}/${window.btoa(id)}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  removeRow = (id) => {
    try {
      confirm({
        title: RemoveConst.header + PackListConst.package,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          PackListConst.package.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("delete_div"),
        onOk: () => {
          this.deleteCol(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = async (id) => {
    try {
      const { productId } = this.state;
      await this.props.deleteProductPackage(id);
      await this.props.getPackageById(productId);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { item, productId, search } = this.state;
    const { packages, loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <PackageListStyle id={"delete_div"}>
          <Menu />
          <div className="container">
            <Header title={"Package"} />
            <div className="allDiv">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{item + PackListConst.packList}</h2>
                  <div className="actDIV">
                    <div
                      className="addButton pointer"
                      onClick={() => this.props.history.push("/products")}
                    >
                      <ArrowLeftOutlined />
                    </div>
                    {packages.length < 6 && (
                      <div
                        className="addButton pointer"
                        onClick={() =>
                          this.props.history.push(
                            `/package/${item}/new/${window.btoa(productId)}`
                          )
                        }
                      >
                        <PlusOutlined />
                      </div>
                    )}
                  </div>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    {packages?.length > 0 && (
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
                      type="packageList"
                      data={packages}
                      size={10}
                      editRecord={this.editRow}
                      deleteRecord={this.removeRow}
                      search={search}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PackageListStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.subscribe.loading,
  packages: state.subscribe.packages,
});
const mapDispatchToProps = (dispatch) => ({
  getPackageById: (payload) => dispatch(getPackageById(payload)),
  deleteProductPackage: (payload) => dispatch(deleteProductPackage(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PackageList)
);
