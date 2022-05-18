import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { BusinessName, BusinessConst } from "./constant";
import { BusinessStyle } from "./style";
import { getAuthRole } from "modules/helper";
import { Menu, Header } from "components/Form";
var role = getAuthRole();

class MyBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      title: "",
    };
  }
  componentDidMount() {
    role = role ? role : getAuthRole();
  }
  managerUI = () => {
    try {
      const { count } = this.state;
      return BusinessName?.map((a, i) => (
        <div
          key={i}
          className={`textDiv anime ${i === count ? "selecText" : ""}`}
          onClick={() => this.countHandle(i)}
        >
          {a}
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  countHandle = (i) => this.setState({ count: i });
  pages = () => {
    try {
      const { count } = this.state;
      return count === 0 ? (
        <h1>I am Report1</h1>
      ) : count === 1 ? (
        <h1>I am Report2</h1>
      ) : count === 2 ? (
        <h1>I am Report3</h1>
      ) : count === 3 ? (
        <h1>I am Report4</h1>
      ) : count === 4 ? (
        <h1>I am Report5</h1>
      ) : count === 5 ? (
        <h1>I am Report6</h1>
      ) : count === 6 ? (
        <h1>I am Report7</h1>
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Spin spinning={false} size="large">
        <BusinessStyle>
          <Menu />
          <div className="container">
            <Header title={"My-Business"} />
            <div className="allDiv">
              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="anime">
                {/* <Col xs={24} sm={10} md={10} lg={6} xl={6} className="anime"> */}
                  <div className="headDiv">
                    <h2 className="hrob">{BusinessConst.business}</h2>
                  </div>      
                  <div className="fileManaDiv"><div className="textDiv anime">COMING SOON...</div></div>
                </Col>
                {/* <Col xs={24} sm={14} md={14} lg={18} xl={18} className="anime">
                  <div className="headDiv"></div>
                  <div className="fileManaDiv">{this.pages()}</div>
                </Col> */}
              </Row>
            </div>
          </div>
        </BusinessStyle>
      </Spin>
    );
  }
}

export default MyBusiness;
