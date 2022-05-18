import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Spin } from "antd";

import { WalletStyle } from "./style";
import Withdraw from "./Pages/Withdraw";
import Transaction from "./Pages/Transaction";
import { getAuthUserID } from "modules/helper";
import { getWalletDataById } from "redux/wallet/action";
import { WalletConst, TopRowData, TabsConst } from "./constatnt";
import { Menu, Header, DivTabUI ,CommentModel } from "components/Form";

var userId = getAuthUserID();

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      visible:false,
      remarek:"",
    };
  }
  async componentDidMount() {
    try {
      userId = userId ? userId : getAuthUserID();
      await this.props.getWalletDataById(userId);
    } catch (error) {
      console.log(error);
    }
  }
  countHandle = (i) => this.setState({ count: i });
  showComment=(remarek)=>{
    try {
      const{visible}=this.state;
      this.setState({visible:!visible,remarek:remarek?remarek:""})
    } catch (error) {
      console.log(error);
    }
  }
  topRowUi = () => {
    try {
      const { walletData } = this.props;      
      return TopRowData.map((a, i) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={6} key={i} className="anime">
          <div className="cardDiv" >
            <div className="report-box">
              <div className="box">
                <div className="flex">
                  <h1 className="mainTxt">{`₹  ${
                    i === 0
                      ? walletData.total
                      : i === 1
                      ? walletData.remain
                      : i === 2
                      ? walletData.paid
                      : walletData.available
                  }`}</h1>
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
  render() { 
    const { count ,visible,remarek } = this.state;
    const { walletData ,loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <WalletStyle id="wallet-Remove">
          <Menu />
          <div className="container">
            <Header title={"Wallet"} />
            <div className="allDiv anime">
              <h2 className="hrob">{"Anvit" + WalletConst.wallet} </h2>
              <Row className="top-row" gutter={24}>
                {this.topRowUi()}
              </Row>
              <div className="coverDiv">
                <div className="headerDiv">
                  <DivTabUI
                    count={count}
                    countHandle={this.countHandle}
                    TabsConst={TabsConst}
                  />
                  {/* {count === 1&&<div
                    className="addButton pointer"
                  >
                    <PlusOutlined />
                  </div>} */}
                </div>
                {count === 0 && <Transaction 
                  userId={userId}
                />}
                {count === 1 && <Withdraw 
                availAmo ={walletData.available?walletData.available:0}
                userId={userId}
                showComment={this.showComment}
                />}
              </div>
            </div>
              {visible && (
              <CommentModel
              remarek={remarek}
              visible={visible}
              onOk={this.showComment}
              onCancel={this.showComment}
              />
              )}
          </div>
        </WalletStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.wallet.loading,
  walletData: state.wallet.walletData,
});
const mapDispatchToProps = (dispatch) => ({
  getWalletDataById: (payload) => dispatch(getWalletDataById(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
