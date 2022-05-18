import React, { Component } from "react";
import { Spin, Image, Tabs } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ProfileStyle } from "./style";
import { getAuthUserID } from "modules/helper";
import BasicDetails from "./Pages/BasicDetails";
import ContactDetails from "./Pages/ContactDetails";
import { configVar } from "modules/config";
import { getPartnerById } from "redux/partner/action";
import FinancialDetails from "./Pages/FinancialDetails";
import { Menu, Header } from "components/Form";
import { profileAvatar } from "components/Images";
const { TabPane } = Tabs;
var userId = getAuthUserID();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, partData: {} };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      userId = userId ? userId : getAuthUserID();
      this.props.getPartnerById();
      if (match?.path !== "/partner/new")
        await this.props.getPartnerById(userId);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    const { partner } = this.props;
    if (partner !== prevProps.partner) {
      this.setState({ partData: partner });
    }
  }
  saveData = (data) => {
    try {
      const { count } = this.state;
      this.setState({ count: count + 1, partData: data });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { partData } = this.state;
    let pr = "Profile";
    return (
      <Spin spinning={loading} size="large">
        <ProfileStyle>
          <Menu />
          <div className="container">
            <Header title={pr} />
            <div className="allDiv anime">
              <div>
                <Image
                  className="avatar"
                  src={
                    partData?.companyLogo
                      ? configVar.BASE_URL.slice("/", -1) + partData.companyLogo
                      : profileAvatar
                  }
                  preview={false}
                  width={120}
                />
                <h2 className="header hrob">{partData?.companyName}</h2>
              </div>
              <Tabs defaultActiveKey="1">
                {/* <TabPane tab="Dashboard" key="1">
                  Happy New Year
                </TabPane> */}
                <TabPane tab="Basic Details" key="1">
                  <BasicDetails
                    partData={partData}
                    userId={userId}
                    savePartner={this.saveData}
                  />
                </TabPane>
                <TabPane tab="Financial Details" key="2">
                  <FinancialDetails
                    partData={partData}
                    userId={userId}
                    savePartner={this.saveData}
                  />
                </TabPane>
                <TabPane tab="Contact Details" key="3">
                  <ContactDetails
                    partData={partData}
                    userId={userId}
                    savePartner={this.saveData}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </ProfileStyle>
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
  getPartnerById: (userId) => dispatch(getPartnerById(userId)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
