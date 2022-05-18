import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { Input, Table ,Pagination } from "components/Form";
import { WalletConst } from "../constatnt";
import {
  getPartnerTransaction
} from "redux/wallet/action";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
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
      const{paramet}=this.state;
      const {userId} =this.props;
      paramet.parameter= userId.toString();
      await this.props.getPartnerTransaction(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getPartnerTransaction(paramet);
      this.setState({ current: val });
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
      await this.props.getPartnerTransaction(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {current}=this.state;
    const {PartTransaction}=this.props;
    let traLength = PartTransaction?.length > 0 ? PartTransaction[0].totalLenght : 0;
    return (
      <div className="contentDiv anime">
        <div className="search_div">
          <Input
            placeholder={WalletConst.search}
            suffix={<SearchOutlined />}
            onChange={this.searchChange}
          />
        </div>
        <div className="tableDiv">
          <Table
            data={PartTransaction}
            type="transaction"
            current={current}
          />
           {traLength > 10 && (
                  <div className="pagiDiv">
                    <Pagination
                      onChange={this.handlePagination}
                      current={current}
                      total={traLength}
                      pageSize={10}
                    />
                  </div>
                )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PartTransaction: state.wallet.PartTransaction,
});
const mapDispatchToProps = (dispatch) => ({
  getPartnerTransaction: (payload) =>
  dispatch(getPartnerTransaction(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Transaction)
);
