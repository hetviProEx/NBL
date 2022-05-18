import React, { Component } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Image, Row, Col, Spin } from "antd";

import { ForgotConst } from "./constant";
import { Input, Button } from "components/Form";
import { LoginStyle } from "container/Login/style";
import { login, forgetPassword } from "redux/login/actions";
import { illustration, logoWhite } from "components/Images";
import { FormValidation, ButtonConst } from "App/AppConstant";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().trim().email(FormValidation.emailInvalid).required(" "),
});

class Forgetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = { btnDisable: false, role: "partner" };
  }
  componentDidMount() {
    try {
      const { match } = this.props;
      if (match.path === "/forget-password/admin")
        this.setState({ role: "admin" });
      else if (match.path === "/forget-password/user")
        this.setState({ role: "user" });
    } catch (error) {
      console.log(error);
    }
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      const { role } = this.state;
      let data = {
        email: values.email,
        role: role,
      };
      await this.props.forgetPassword(data);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { btnDisable, role } = this.state;
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
                <Image
                  className="image-middle"
                  src={illustration}
                  width={300}
                  preview={false}
                />
                <div className="pragraph anime">
                  <h1 className="first">{ForgotConst.header}</h1>
                  <h1 className="header">{ForgotConst.sign}</h1>
                  <h4>{ForgotConst.title}</h4>
                </div>
              </div>
            </Col>
            <Col className="signIn" xs={24} sm={24} md={24} lg={12} xl={11}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={ValidationSchema}
                onSubmit={this.handleSubmit}
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
                    <h2 className="header-login hrob">
                      {ForgotConst.forgetPwd}
                    </h2>
                    <Input
                      placeholder={ForgotConst.email}
                      onBlur={handleBlur}
                      name="email"
                      value={values.email.trim()}
                      handleChange={handleChange}
                      className={
                        errors.email && touched.email ? "empty input" : "input"
                      }
                    />
                    <div className="btnLogin">
                      <Button type="submit" disabled={btnDisable}>
                        {ForgotConst.sendEmail}
                      </Button>
                      <Button
                        onClick={() =>
                          this.props.history.push(
                            role === "admin"
                              ? "/login/admin"
                              : role === "user"
                              ? "/login/user"
                              : "/login"
                          )
                        }
                      >
                        {ButtonConst.cancel}
                      </Button>
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

const mapStateToProps = (state) => ({ loading: state.login.loading });
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
  forgetPassword: (payload) => dispatch(forgetPassword(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgetpassword);
