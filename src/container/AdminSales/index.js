import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { AdmSelesStyle } from "./style";
import { AdmSalesConst } from "./constant";
import { getSales } from "redux/crm/action";
import { ButtonConst } from "App/AppConstant";
import {
  Menu,
  Header,
  Input,
  Table,
  Pagination,
  ExportModal,
} from "components/Form";

class AdminSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      allprData: [],
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
      const { paramet } = this.state;
      const { match } = this.props;
      paramet.parameter = window.atob(match.params.id);
      await this.props.getSales(paramet);
      paramet.pageSize = "2000";
      this.setState({ paramet });
      await this.props.getSales(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { sales } = this.props;
      if (sales !== prevProps.sales && sales?.length > 0) {
        const { paramet } = this.state;
        let arr = [];
        sales?.forEach((a, i) => {
          a.no = i + 1;
          arr.push(a);
        });
        if (paramet.pageSize === "2000") {
          paramet.pageSize = "10";
          this.setState({ allprData: arr, paramet });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
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
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getSales(paramet);
      this.setState({ currentPage: val });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { sales, loading } = this.props;
    const { current, allprData } = this.state;
    let dataLength = sales?.length > 0 ? sales[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <AdmSelesStyle>
          <Menu />
          <div className="container">
            <Header title={AdmSalesConst.sales} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{AdmSalesConst.sales}</h2>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    <div className="expoDiv">
                      {allprData.length > 0 && (
                        <ExportModal data={allprData} type="sales" />
                      )}
                    </div>
                    {sales?.length > 0 && (
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
                    <Table data={sales} current={current} type="sales" />
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
            </div>
          </div>
        </AdmSelesStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.crm.loading,
  sales: state.crm.sales,
});
const mapDispatchToProps = (dispatch) => ({
  getSales: (payload) => dispatch(getSales(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminSales)
);
