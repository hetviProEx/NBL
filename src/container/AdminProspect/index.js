import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { AdmProStyle } from "./style";
import { AdminProCon } from "./constant";
import { ButtonConst } from "App/AppConstant";
import {
  Menu,
  Header,
  Input,
  Table,
  Pagination,
  ExportModal,
} from "components/Form";
import { getProspect } from "redux/crm/action";

class AdminProspect extends Component {
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
      await this.props.getProspect(paramet);
      paramet.pageSize = "2000";
      this.setState({ paramet });
      await this.props.getProspect(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { prospect } = this.props;
      if (prospect !== prevProps.prospect && prospect?.length > 0) {
        const { paramet } = this.state;
        let arr = [];
        prospect?.forEach((a, i) => {
          a.no = i + 1;
          a.status = a.leadID === 0 || !a.leadID ? "-" : "L";
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
      await this.props.getProspect(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getProspect(paramet);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { current, allprData } = this.state;
    const { prospect, loading } = this.props;
    let prospectLength = prospect?.length > 0 ? prospect[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <AdmProStyle>
          <Menu />
          <div className="container">
            <Header title={AdminProCon.pros} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{AdminProCon.pros}</h2>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    <div className="expoDiv">
                      {allprData.length > 0 && (
                        <ExportModal data={allprData} type="prospect" />
                      )}
                    </div>
                    {prospect?.length > 0 && (
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
                      data={prospect}
                      current={current}
                      type={AdminProCon.pros}
                    />
                    {prospectLength > 10 && (
                      <div className="pagiDiv">
                        <Pagination
                          onChange={this.handlePagination}
                          current={current}
                          total={prospectLength}
                          pageSize={10}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdmProStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.crm.loading,
  prospect: state.crm.prospect,
});
const mapDispatchToProps = (dispatch) => ({
  getProspect: (payload) => dispatch(getProspect(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminProspect)
);
