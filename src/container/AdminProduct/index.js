import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AdminProStyle } from "./style";
import { getProduct } from "redux/product/action";
import { ProductConst, StepsName } from "./constant";
import { Menu, Header, StepsPage } from "components/Form";
import ProductBasicInfo from "./pages/BasicInfo";
import ProductDocuments from "./pages/ProductDocuments";

class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, data: {} };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.id) {
        let id = window.atob(match.params.id);
        await this.props.getProduct(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { products } = this.props;
      if (products !== prevProps.products) {
        products && products[0] && this.setState({ data: products[0] });
      }
    } catch (error) {
      console.log(error);
    }
  }
  countInc = (data) =>
    this.setState({ count: this.state.count + 1, data: data });
  pageUI = () => {
    try {
      const { count, data } = this.state;
      return count === 0 ? (
        <ProductBasicInfo countInc={this.countInc} data={data} />
      ) : (
        count === 1 && <ProductDocuments data={data} />
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { count } = this.state;
    const { loading, match } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <AdminProStyle>
          <Menu />
          <div className="container">
            <Header title={"Product"} />
            <div className="allDiv anime">
              <h2 className="hrob">
                {match.params.id
                  ? ProductConst.addEditPro
                  : ProductConst.addNewPro}
              </h2>
              <div className="formDiv anime">
                <StepsPage stepCount={count} StepsName={StepsName} />
                {this.pageUI()}
              </div>
            </div>
          </div>
        </AdminProStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.product.loading,
  products: state.product.products,
});
const mapDispatchToProps = (dispatch) => ({
  getProduct: (payload) => dispatch(getProduct(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminProduct)
);
