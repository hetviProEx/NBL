import React, { Component } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Image, Row, Col, message, Spin, Carousel } from "antd";

import { LoginStyle } from "./style";
import { LoginConst } from "./constant";
import { configVar } from "modules/config";
import { login } from "redux/login/actions";
import { FormValidation } from "App/AppConstant";
import { getLoginImages } from "redux/cms/action";
import { Input, Button, Checkbox } from "components/Form";
import { logoWhite } from "components/Images";

const loginValidationSchema = Yup.object().shape({
  userName: Yup.string().trim().required(" "),
  password: Yup.string()
    .trim()
    .min(6, FormValidation.passwordMin)
    .required(" "),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      remember: false,
      role: "partner",
      initValues: { userName: "", password: "" },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (this.match("/login/admin") || match.path === "/login/admin")
        this.setState({ role: "admin" });
      // else if (this.match("/login/user")) this.setState({ role: "user" });
      let data = localStorage.nbl;
      if (data) {
        let n = JSON.parse(window.atob(data));
        this.setState({
          initValues: { userName: n.userName, password: n.password },
          remember: true,
        });
      }
      await this.props.getLoginImages();
    } catch (error) {
      console.log(error);
    }
  }
  match = (txt) => this.props.match.url.toLowerCase().trim().match(txt);
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      const { role, remember } = this.state;
      let rl = role;
      let ad = values.userName.toLowerCase().trim() === "admin";
      if (role !== "admin" && ad) message.error("Can't login as admin");
      else {
        if (role === "admin" && !ad) rl = "user";
        let data = {
          userName: values.userName.trim(),
          password: values.password.trim(),
          role: rl,
        };
        if (remember)
          localStorage.setItem("nbl", window.btoa(JSON.stringify(data)));
        else localStorage.removeItem("nbl");
        await this.props.login(data);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  checkClick = (e) => this.setState({ remember: e.target.checked });
  carouselUI = () => {
    try {
      const { loginImages } = this.props;
      return loginImages?.map((a, i) => (
        <div key={i}>
          <Image
            className="image-middle"
            src={configVar.BASE_URL + a.image}
            width={300}
            preview={false}
          />
          <div className="pragraph anime">
            <h1 className="first">{LoginConst.header}</h1>
            <h1 className="header">{LoginConst.sign}</h1>
            <h4>{LoginConst.pragraph}</h4>
          </div>
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  openUrl = (url) => {
    try {
      var win = window.open(url, "_blank");
      win.focus();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { btnDisable, remember, role, initValues } = this.state;
    let pwd = "/forget-password";
    if (role !== "partner") pwd = pwd + "/" + role.toLocaleLowerCase();
    return (
      <LoginStyle>
        <Spin spinning={loading} size="large">
          <Row>
            <Col className="loginFirst" xs={0} sm={0} md={0} lg={0} xl={12}>
              <div className="anime">
                <Image
                  className="image-top"
                  src={logoWhite}
                  width={150}
                  preview={false}
                />
              </div>
              <div className="my-auto anime">
                <Carousel autoplay>{this.carouselUI()}</Carousel>
              </div>
            </Col>
            <Col className="signIn" xs={24} sm={24} md={24} lg={12} xl={11}>
              <Formik
                initialValues={initValues}
                validationSchema={loginValidationSchema}
                onSubmit={this.handleSubmit}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  onBlur,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    noValidate
                    className="formDiv anime"
                  >
                    <h2 className="header-login">{LoginConst.loginHead}</h2>
                    <Input
                      placeholder={LoginConst.userName}
                      onBlur={handleBlur}
                      name="userName"
                      value={values.userName.trim()}
                      handleChange={handleChange}
                      className={
                        errors.userName && touched.userName
                          ? "empty input"
                          : "input"
                      }
                    />
                    <Input
                      placeholder={LoginConst.pwd}
                      password={true}
                      max={25}
                      onBlur={handleBlur}
                      name="password"
                      value={values.password.trim()}
                      handleChange={handleChange}
                      className={
                        errors.password && touched.password
                          ? "empty input"
                          : "input"
                      }
                    />
                    <div className="rememberDiv">
                      <Checkbox
                        className="checkBox"
                        text="Remember me"
                        onChange={this.checkClick}
                        checked={remember}
                      />
                      <NavLink to={pwd} className="forgetPwd">
                        {LoginConst.forgetPwd}
                      </NavLink>
                    </div>
                    <div className="btnLogin">
                      <Button type="submit" disabled={btnDisable}>
                        {LoginConst.login}
                      </Button>
                    </div>
                    <div className="privPoliDiv">
                      <div>{LoginConst.firPrPo}</div>
                      <div>
                        <span
                          className="txt pointer"
                          onClick={() => this.openUrl(LoginConst.npt)}
                        >
                          {LoginConst.secPrPo}
                        </span>
                        {LoginConst.emp}
                        <span
                          className="txt pointer"
                          onClick={() => this.openUrl(LoginConst.npp)}
                        >
                          {LoginConst.lastPrPo}
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Spin>
      </LoginStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  loginImages: state.cms.loginImages,
});
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
  getLoginImages: (payload) => dispatch(getLoginImages(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
