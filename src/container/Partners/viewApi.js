import React, { Component } from "react";
import { Modal, Tabs } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { PartConst, tabsTitle } from "./constant";
import { getPartnerById } from "redux/partner/action";
import { ComConst } from "App/AppConstant";

const { TabPane } = Tabs;
class View extends Component {
  constructor(props) {
    super(props);
    this.state = { count: "0" };
  }
  async componentDidMount() {
    try {
      await this.props.getPartnerById(this.props?.data?.partnerId);
    } catch (error) {
      console.log(error);
    }
  }
  viewData = (a, b) => (
    <tr>
      <td className="modelFront">{a}</td>
      <td className="tableData">{ComConst.colon}</td>
      <td>{b}</td>
    </tr>
  );
  tabPaneUI = () => {
    try {
      return tabsTitle?.map((a, i) => <TabPane tab={a} key={i}></TabPane>);
    } catch (error) {
      console.log(error);
    }
  };
  setTable = (i) => this.setState({ count: i });
  render() {
    const { data, partner, view, modelCancel } = this.props;
    const { count } = this.state;
    return (
      <Modal
        visible={view}
        onCancel={modelCancel}
        onOk={modelCancel}
        data={data}
        centered
        footer={false}
        title={
          <Tabs centered onChange={this.setTable}>
            {this.tabPaneUI()}
          </Tabs>
        }
        getContainer={() => document.getElementById("partner-view")}
      >
        {count === "0" ? (
          <div className="tableBody">
            <table>
              {this.viewData(PartConst.companyname, partner.companyName)}
              {this.viewData(PartConst.email, partner.emailId)}
              {this.viewData(PartConst.mobile, partner.mobile)}
              {partner.gstType !== 0 &&
                this.viewData(PartConst.gstno, partner.gstNumber)}
              {this.viewData(PartConst.pan, partner.pan)}
              {this.viewData(PartConst.aadhar, partner.aadharNumber)}
            </table>
          </div>
        ) : count === "1" ? (
          <div className="tableBody">
            <table>
              {this.viewData(PartConst.bank, partner.bankName)}
              {this.viewData(PartConst.branch, partner.branchName)}
              {this.viewData(PartConst.address, partner.address)}
              {this.viewData(PartConst.account, partner.accountNumber)}
              {this.viewData(PartConst.ifsc, partner.ifsc)}
              {this.viewData(PartConst.pincode, partner.pincode)}
              {this.viewData(PartConst.state, partner.state)}
              {this.viewData(PartConst.city, partner.city)}
            </table>
          </div>
        ) : (
          <div className="tableBody">
            {partner?.contactDetails?.map((d, i) => {
              return (
                <>
                  {i > 0 && <hr />}
                  <table key={i}>
                    {this.viewData(PartConst.contactname, d.contactName)}
                    {this.viewData(PartConst.mobile, d.mobile)}
                    {this.viewData(PartConst.email, d.emailId)}
                    {this.viewData(PartConst.designation, d.designation)}
                  </table>
                </>
              );
            })}
          </div>
        )}
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  getPartnerById: (id) => dispatch(getPartnerById(id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));
