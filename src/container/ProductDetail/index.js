import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Image, Spin, Empty } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ProDetailstyle } from "./style";
import { configVar } from "modules/config";
import { PorductDetConst } from "./constatnt";
import { getProduct } from "redux/product/action";
import { Menu, Header, PackageCard, RoundSwitch } from "components/Form";

class ProductDetail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      item: "",
      allData: {},
      pdfData: [],
      videoData: [],
      yearlyData: [],
      monthlyData: [],
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match?.params?.id) {
        let id = window.atob(match.params.id);
        this.setState({ item: match.params.name });
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
        let subscripData = products[0]?.productSubscriptiondetails;
        let monthly = [];
        let yearly = [];
        if (subscripData?.length > 0) {
          subscripData?.forEach((a) => {
            if (a.monthlyPackage !== 0) {
              monthly.push({
                package: a.packageType,
                packageDescription: a.packageDescription,
                price: a.monthlyPackage,
                packageId: a.packageId,
                productId: a.productId,
                subscription: "Monthly",
              });
            }
            if (a.annualPackage !== 0) {
              yearly.push({
                package: a.packageType,
                packageDescription: a.packageDescription,
                price: a.annualPackage,
                packageId: a.packageId,
                productId: a.productId,
                subscription: "Yearly",
              });
            }
          });
        }
        products &&
          products[0] &&
          this.setState({
            allData: products[0],
            pdfData: products[0].productDocument,
            monthlyData: monthly,
            yearlyData: yearly,
            videoData: products[0].productVideo,
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  carouselUI = () => {
    try {
      const { videoData } = this.state;
      return videoData?.map((a, i) => (
        <div key={i}>
          <iframe
            id="fr"
            title="carousel"
            width="200"
            height="110"
            src={a.videoUrl.replace("watch?v=", "embed/")}
          />
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  headerImg = () => {
    try {
      const { allData } = this.state;
      return (
        <Image
          className="proImg"
          src={configVar.BASE_URL + allData?.productLogo}
          preview={false}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  subscriptionUI = () => {
    try {
      const { checked, monthlyData, yearlyData } = this.state;
      let data = checked ? yearlyData : monthlyData;
      return data?.map((a, i) => (
        <Col xs={24} sm={12} md={24} lg={12} xl={8} key={i} className="anime">
          <PackageCard data={a} type={PorductDetConst.proDetail} />
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  pdfImg = () => {
    try {
      const { pdfData } = this.state;
      return pdfData?.map((a, i) => (
        <div className="pdfS" key={i}>
          <a
            href={
              a.documentPath !== "" ? configVar.BASE_URL + a.documentPath : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <div className="file">{PorductDetConst.pdf}</div>
          </a>
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  };
  render() {
    const { checked, allData, pdfData, videoData, yearlyData, monthlyData } =
      this.state;
    const { loading } = this.props;
    let checkData =
      checked && yearlyData?.length > 0 ? true : monthlyData?.length > 0;
    return (
      <Spin spinning={loading} size="large">
        <ProDetailstyle>
          <Menu />
          <div className="container">
            <Header title={"Products"} />
            <div className="allDiv anime">
              <div className="headDiv">
                <div
                  className="addButton pointer"
                  onClick={() => this.props.history.push("/products")}
                >
                  <ArrowLeftOutlined />
                </div>
              </div>
              <div className="boxDiv anime">
                <Row gutter={24}>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={8}
                    className="imgDiv"
                  >
                    {this.headerImg()}
                  </Col>
                  {allData?.productname && (
                    <Col xs={24} sm={24} md={24} lg={14} xl={16}>
                      <h3 className="infoHead">
                        {allData?.productname}
                        {allData?.productTitle !== ""
                          ? " - " + allData?.productTitle
                          : ""}
                      </h3>
                      <p
                        className="infoPra"
                        dangerouslySetInnerHTML={{
                          __html: allData?.productDescription,
                        }}
                      ></p>
                    </Col>
                  )}
                </Row>
              </div>
              {pdfData?.length > 0 && (
                <div className="box5">
                  <div className="boxDiv">
                    <h1 className="txtHead">{PorductDetConst.manual}</h1>
                    {this.pdfImg()}
                  </div>
                </div>
              )}
              {videoData?.length > 0 && (
                <div className="box6">
                  <div className="boxDiv">
                    <h1 className="txtHead">{PorductDetConst.video}</h1>
                    {this.carouselUI()}
                  </div>
                </div>
              )}
              <div className="box5">
                <div className="boxDiv">
                  <h1 className="txtHead">{PorductDetConst.ourPack}</h1>
                  <div className="swichDiv">
                    <RoundSwitch
                      left="MONTHLY"
                      right="ANNUAL"
                      checked={checked}
                      handleChange={this.switchChange}
                    />
                  </div>
                  {checkData ? (
                    <div className="Card-Div">
                      <Row gutter={20}> {this.subscriptionUI()} </Row>
                    </div>
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ProDetailstyle>
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
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail2)
);
