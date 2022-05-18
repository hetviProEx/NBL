import React, { Component } from "react";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  Carousel,
  message,
  Empty,
  Spin,
  List,
} from "antd";

import { DashbordStyle } from "./style";
import { configVar } from "modules/config";
import { TopRowData, DashConst } from "./constant";
import { user } from "components/Images";
import { getDashBoard } from "redux/dashBoard/action";
import { getPoc } from "redux/poc/action";
import { getUsers } from "redux/user/action";
import { getOfferList, getTestimonial } from "redux/cms/action";
import { ComConst, Days, Months } from "App/AppConstant";
import { Menu, Header, ShareModal } from "components/Form";
import { getAuthRole, getAuthUserID } from "modules/helper";

var userId = getAuthUserID();
var role = getAuthRole();

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referCode: "00-00000",
      copyDisable: false,
      graphData: [],
      showShare: false,
      transaction: {},
      paramet: {
        parameter: "",
        pageSize: "2000",
        page: "1",
        sortColumn: "id",
        search: "",
      },
    };
  }
  async componentDidMount() {
    try {
      role = role ? role : getAuthRole();
      userId = userId ? userId : getAuthUserID();
      const { paramet } = this.state;
      if (role !== "partner") this.props.history.push("/partners");
      else {
        await this.props.getDashBoard(userId);
        await this.props.getUsers(paramet);
        await this.props.getPoc();
        await this.props.getOfferList();
        await this.props.getTestimonial(paramet);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { dashBordDetail, poc, userList } = this.props;
      if (dashBordDetail !== prevProps.dashBordDetail) {
        let data = [["", "NumberOfCustomer"]];
        dashBordDetail?.dashchart?.forEach((a) => {
          data.push([a.current_Month, a.numberOfCustomer]);
        });
        this.setState({
          graphData: data,
          referCode: dashBordDetail?.refferalCode
            ? dashBordDetail.refferalCode
            : "00-00000",
        });
      }
      if (poc !== prevProps.poc) {
        const alredyIN = [];
        poc?.forEach((e) => {
          if (e.status === 0) {
            let splitPart = e.partner?.split(",");
            splitPart?.forEach((x) => {
              alredyIN.push({ id: parseInt(x), user: e.user });
            });
          }
        });
        if (userList) {
          let findID = alredyIN.find((x) => x.id === userId);
          findID &&
            this.setState({
              transaction: userList.find((x) => x.userId === findID.user),
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  copyCode = () => {
    try {
      const { referCode, copyDisable } = this.state;
      if (!copyDisable) {
        navigator.clipboard.writeText(referCode);
        message.success("Code Copied");
        this.setState({ copyDisable: true });
        setTimeout(() => {
          this.setState({ copyDisable: false });
        }, 4500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  topRowUi = () => {
    try {
      const { dashBordDetail } = this.props;
      return TopRowData?.map((a, i) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={6} key={i} className="anime">
          <div className="cardDiv">
            <div className="report-box">
              <div className="box">
                <div className="flex">
                  <h1 className="mainTxt">
                    {i === 0
                      ? a.value
                      : i === 1
                      ? dashBordDetail.leads
                      : i === 2
                      ? dashBordDetail.monthlySales
                      : dashBordDetail.activeCustomer}
                  </h1>
                  <Image
                    width={50}
                    src={a.img}
                    preview={false}
                    className="topImg"
                    alt="img"
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
  currDateUI = () => {
    try {
      let today = new Date();
      let currDate = today.getDate();
      let monthName = " " + Months[today.getMonth()];
      let dayName = today.getDay();
      let weekday = Days[dayName];
      let txt = currDate + this.suffix_of(currDate) + monthName;
      return (
        <div className="dateUI anime" key={"date"}>
          <h3 className="dateTxt">
            {`${txt},${today.getFullYear()} - ${weekday}`}
          </h3>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  suffix_of = (i) => {
    try {
      let j = i % 10,
        k = i % 100;
      if (j === 1 && k !== 11) return "st";
      else if (j === 2 && k !== 12) return "nd";
      else if (j === 3 && k !== 13) return "rd";
      return "th";
    } catch (error) {
      console.log(error);
    }
  };
  hotSellProd = () => {
    try {
      const { dashBordDetail } = this.props;
      let url = configVar.BASE_URL.slice("/", -1);
      return (
        <List
          key={"list"}
          grid={{ gutter: 10, column: window.innerWidth < 1000 ? 2 : 4 }}
          dataSource={dashBordDetail?.sproduct}
          renderItem={(item,i) => (
            <List.Item key={i}>
              <Card hoverable className="features">
                <div
                  className={"zoom-in " + item.product}
                  onClick={() => this.props.history.push("/products")}
                >
                  <Image
                    height={50}
                    src={url + item.logo}
                    preview={false}
                    alt={item.class}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      );
      //  dashBordDetail?.sproduct?.map((a, i) => ());
    } catch (error) {
      console.log(error);
    }
  };
  shareModal = () => {
    try {
      const { showShare } = this.state;
      this.setState({ showShare: !showShare });
    } catch (error) {
      console.log(error);
    }
  };
  chartUi = (txt, val) => {
    try {
      return (
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className="anime"
          key="col"
        >
          <h2 className="hrob">{txt}</h2>
          <div className="garphDiv2 zoom-in">
            <Chart
              width={"auto"}
              height={"16em"}
              chartType="PieChart"
              data={[
                ["Task", "Hours per Day"],
                ["Work", 11],
                ["Eat", 2],
                ["Commute", 2],
              ]}
              options={{
                pieHole: val,
                legend: { position: "bottom" },
                colors: ["#0061A6", "#ff8b26", "#589bd6", "#ffc533", "#EA4335"],
              }}
              rootProps={{ "data-testid": "3" }}
            />
          </div>
        </Col>
      );
    } catch (error) {
      console.log(error);
    }
  };
  carouselIMG = () => {
    try {
      const { offerList } = this.props;
      return offerList?.map((a, i) => (
        <Image
          key={i}
          src={configVar.BASE_URL + a.uploadimg}
          preview={false}
          alt="banner"
          height={"25em"}
          width={"100%"}
        />
      ));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { referCode, graphData, showShare, transaction } = this.state;
    const { loading, offerList, testimonials } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <DashbordStyle>
          <Menu />
          <div className="container">
            <Header title="Dashboard" />
            <div className="allDiv">
              <div className="date-div">{this.currDateUI()}</div>
              <Row className="top-row" gutter={24}>
                {this.topRowUi()}
              </Row>
              <Row gutter={24} className="graphsRow">
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                  <div className="titleDiv">
                    <h2 className="hrob">{DashConst.customer}</h2>
                  </div>
                  <div className="garphDiv zoom-in">
                    {graphData.length > 1 ? (
                      <Chart
                        width={"auto"}
                        height={"23em"}
                        chartType="Line"
                        data={graphData}
                        options={{
                          legend: { position: "none" },
                        }}
                      />
                    ) : (
                      <Empty />
                    )}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                  <div className="titleDiv">
                    <h2 className="hrob">{""}</h2>
                  </div>
                  <div className="slider_div2 zoom-in">
                    <Carousel autoplay>
                      <div className="accountDiv">
                        <div className="contentDiv">
                          <h1 className="mainTxt">
                            {DashConst.accManDetail + ComConst.colon}
                          </h1>
                          <div className="detailDiv">
                            <div className="nameDiv">
                              <h3 className="formtxt">
                                {DashConst.name} {ComConst.colon}
                                {transaction?.firstname}
                              </h3>
                            </div>
                            <div className="contactdiv">
                              <h3 className="formtxt">
                                {DashConst.contNum} {ComConst.colon}
                                {transaction?.mobile}
                              </h3>
                            </div>
                            <div>
                              <h3 className="formtxt">
                                {DashConst.emid} {ComConst.colon}
                                {transaction?.emailId}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {offerList.length > 0 && this.carouselIMG()}
                    </Carousel>
                  </div>
                </Col>
              </Row>
              <div className="hotdiv">
                <Carousel autoplay>
                  {testimonials?.map(
                    (a, i) =>
                      a.publishStatus === 0 && (
                        <div className="hotRow ">
                          <Card hoverable className="Feature-card2 zoom-in">
                            <Image
                              src={
                                a.icon !== ""
                                  ? configVar.BASE_URL + a.icon
                                  : user
                              }
                              preview={false}
                            />
                            <h3>{a.name}</h3>
                            <h4>{a.companyName}</h4>
                            <p
                              className="descDiv"
                              dangerouslySetInnerHTML={{
                                __html: a.description,
                              }}
                            ></p>
                          </Card>
                        </div>
                      )
                  )}
                </Carousel>
              </div>
              {showShare && (
                <ShareModal
                  visible={showShare}
                  title={DashConst.share}
                  onOk={this.shareModal}
                  onCancel={this.shareModal}
                  referCode={referCode}
                  copyCode={this.copyCode}
                />
              )}
            </div>
          </div>
        </DashbordStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.dashBoard.loading,
  poc: state.poc.poc,
  dashBordDetail: state.dashBoard.dashBordDetail,
  userList: state.user.userList,
  offerList: state.cms.offerList,
  testimonials: state.cms.testimonials,
});
const mapDispatchToProps = (dispatch) => ({
  getDashBoard: (payload) => dispatch(getDashBoard(payload)),
  getPoc: (payload) => dispatch(getPoc(payload)),
  getUsers: (payload) => dispatch(getUsers(payload)),
  getOfferList: (payload) => dispatch(getOfferList(payload)),
  getTestimonial: (payload) => dispatch(getTestimonial(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashBoard)
);
