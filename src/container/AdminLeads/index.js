import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { AdmLeadStyle } from "./style";
import { AdminLeadCon } from "./constant";
import { ButtonConst } from "App/AppConstant";
import {
  Menu,
  Header,
  Input,
  Table,
  Pagination,
  ExportModal,
} from "components/Form";
import { getLeads } from "redux/crm/action";

class AdminLeads extends Component {
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
      await this.props.getLeads(paramet);
      paramet.pageSize = "2000";
      this.setState({ paramet });
      await this.props.getLeads(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { leads } = this.props;
      if (leads !== prevProps.leads && leads?.length > 0) {
        const { paramet } = this.state;
        let arr = [];
        leads?.forEach((a, i) => {
          a.no = i + 1;
          a.status = a.meetingId === 0 || !a.meetingId ? "-" : "M";
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
      await this.props.getLeads(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getLeads(paramet);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { current, allprData } = this.state;
    const { leads, loading } = this.props;
    let leadsLength = leads?.length > 0 ? leads[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <AdmLeadStyle>
          <Menu />
          <div className="container">
            <Header title={""} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{AdminLeadCon.leads}</h2>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    <div className="expoDiv">
                      {allprData.length > 0 && (
                        <ExportModal data={allprData} type="leads" />
                      )}
                    </div>
                    {leads?.length > 0 && (
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
                      data={leads}
                      current={current}
                      type={AdminLeadCon.leads}
                      useractionUI={false}
                    />
                    {leadsLength > 10 && (
                      <div className="pagiDiv">
                        <Pagination
                          onChange={this.handlePagination}
                          current={current}
                          total={leadsLength}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdmLeadStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.crm.loading,
  leads: state.crm.leads,
});
const mapDispatchToProps = (dispatch) => ({
  getLeads: (payload) => dispatch(getLeads(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminLeads)
);
