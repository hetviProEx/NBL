import React, { Component } from "react";
import { jsPDF } from "jspdf";
import { connect } from "react-redux";
import html2canvas from "html2canvas";
import { Image, Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";

import {
  certifViz,
  certifi,
  code,
  signature,
  nblFull,
  startCertifi,
} from "components/Images";
import { CertifiStyle } from "./style";
import { Menu, Header, Button } from "components/Form";
import { ButtonConst, Months } from "App/AppConstant";
import { CertiConst } from "./constant";
import { getPartnerById } from "redux/partner/action";
import { getAuthUserID, getAuthUserName } from "modules/helper";
var userId = getAuthUserID();
var name = getAuthUserName();

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      date: "",
    };
  }
  async componentDidMount() {
    try {
      userId = userId ? userId : getAuthUserID();
      name = name ? name : getAuthUserName();
      let date = JSON.parse(localStorage.auth).date?.split(" ")[0];
      date = date ? this.setDate(date) : "";
      this.setState({ date: date });
      this.props.getPartnerById(userId);
    } catch (error) {
      console.log(error);
    }
  }
  printDocument = () => {
    try {
      this.setState({ spin: true });
      let input = document.getElementById("divToPrint");
      input.style.transform = "rotate(270deg)";
      html2canvas(input).then((canvas) => {
        input.style.transform = "rotate(0deg)";
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 5, 5, 200, 285);
        pdf.save("download.pdf");
      });
      this.setState({ spin: false });
    } catch (error) {
      console.log(error);
    }
  };
  setDate = (val) => {
    try {
      let dt = val?.split(" ")[0];
      let date = new Date(dt);
      return (
        date.getDate() +
        "-" +
        Months[date.getMonth() - 1] +
        "-" +
        date.getFullYear()
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { spin, date } = this.state;
    name = name ? name : "";
    return (
      <Spin spinning={loading || spin} size="large">
        <CertifiStyle>
          <Menu />
          <div className="container">
            <Header title={"Certificate"} />
            <div className="allDiv">
              <div className="downloadbtn">
                <div className="top-btn">
                  <Button className="dwlBtn" onClick={this.printDocument}>
                    {ButtonConst.download}
                  </Button>
                </div>
              </div>
              <div className="scroll">
                <div className="main" id="divToPrint">
                  <div className="box1">
                    <Row>
                      <Col span={4}>
                        <div className="viz-img img-box">
                          <Image
                            width={70}
                            src={certifViz}
                            preview={false}
                            className="topImg"
                            alt="img"
                          />
                        </div>
                      </Col>
                      <Col span={20}>
                        <div className="title">
                          <h3>{CertiConst.certificate}</h3>
                          <span>{CertiConst.auth}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="secondBox">
                    <Row>
                      <Col span={18}>
                        <div className="perDiv">
                          <div className="text-p">
                            <h3>{CertiConst.certify}</h3>
                          </div>
                          <h1>{name}</h1>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div>
                          <div className="cartiDiv">
                            <img src={certifi} alt="" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="line" />
                  <div>
                    <Row>
                      <Col span={17}>
                        <div className="authDiv">
                          <h5>{CertiConst.business}</h5>
                          <span>{CertiConst.limited}</span>
                        </div>
                      </Col>
                      <Col span={7}>
                        <Row>
                          <Col>
                            <div className="qrcod">
                              <img src={code} alt="qr" />
                            </div>
                          </Col>
                          <Col>
                            <div className="termDiv">
                              <p className="qrcodtxt">{CertiConst.basetxt}</p>
                              <p className="qrcodtxt">{CertiConst.termtxt}</p>
                              <p className="qrcodtxt">{CertiConst.intxt}</p>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col />
                    </Row>
                  </div>
                  <div className="lastbox">
                    <Row>
                      {/* <Col span={6}>
                        <div className="imgDiv">
                          <img src={aSign} alt="sign" />
                        </div>
                        <div className="line-1" />
                        <div className="signDiv">
                          <span className="span-1">{CertiConst.jain}</span>
                          <span className="span-2">
                            {CertiConst.ceo}
                            <span className="span-3">{CertiConst.ltd}</span>
                          </span>
                        </div>
                      </Col> */}
                      <Col span={7}>
                        <div className="imgDiv">
                          <img src={signature} alt="vsign" />
                        </div>
                        <div className="line-1" />
                        <div className="signDiv">
                          <span className="span-1">{CertiConst.singh}</span>
                          {/* <span className="span-2">
                            {CertiConst.head}
                            <span className="span-3">{CertiConst.ltd}</span>
                          </span> */}
                        </div>
                      </Col>
                      <Col span={4} className="date-sign">
                        <div className="dateDiv">
                          <span className="date">{date}</span>
                        </div>
                        <div className="line-1" />
                        <div className="signDiv">
                          <span className="span-1">{CertiConst.date}</span>
                        </div>
                      </Col>
                      <Col span={6}></Col>
                      <Col span={7}>
                        <div className="nblFull ">
                          <div className="imgDiv nblImg">
                            <img src={nblFull} alt="nbl" />
                          </div>
                          <div className="startDiv">
                            <img src={startCertifi} alt=" start" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CertifiStyle>
      </Spin>
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Certificate)
);
