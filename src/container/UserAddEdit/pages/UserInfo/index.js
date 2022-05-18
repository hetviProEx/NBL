import React, { Component } from "react";
import * as Yup from "yup";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NewUserStyle } from "../../style";
// import { UserInfoStyle } from "./style";
import { userInfoConst } from "../../constant";
import { Input, Label, Button, RoundSwitch } from "components/Form";
import { FormValidation, ButtonConst, ComConst } from "App/AppConstant";

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ]*$/, FormValidation.nameValid),
  middleName: Yup.string()
    .trim()
    .matches(/^[aA-zZ]*$/, FormValidation.nameValid),
  lastName: Yup.string()
    .trim()
    .matches(/^[aA-zZ]*$/, FormValidation.nameValid),
  emailId: Yup.string().trim().email(FormValidation.emailInvalid).required(" "),
  mobile: Yup.string()
    .trim()
    .required(" ")
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid),
});

class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      initState: {
        userId: 0,
        firstName: "",
        middleName: "",
        lastName: "",
        emailId: "",
        mobile: "",
        poc: false,
      },
    };
  }
  async componentDidMount() {
    this.setInit();
  }
  componentDidUpdate(prevProps) {
    try {
      const { data } = this.props;
      if (prevProps.data !== data) this.setInit();
    } catch (error) {
      console.log(error);
    }
  }
  setInit = () => {
    try {
      const { data } = this.props;
      if (data.userId) {
        let init = {
          userId: data.userId,
          firstName: data.firstname,
          middleName: data.middleName,
          lastName: data.lastName,
          emailId: data.emailId,
          mobile: data.mobile.toString(),
          rights: data.rights ? data.rights : [],
          poc: data.isPOC === 0 ? true : false,
        };
        this.setState({ initState: init });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let userData = {
        userId: values.userId,
        firstName: values.firstName.trim(),
        middleName: values.middleName.trim(),
        lastName: values.lastName.trim(),
        emailId: values.emailId.trim(),
        mobile: values.mobile.toString(),
        rights: values.rights,
        isPOC: values.poc,
      };
      this.props.countInc(userData);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initState, btnDisable } = this.state;
    return (
      <NewUserStyle>
        <Formik
          initialValues={initState}
          validationSchema={ValidationSchema}
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
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.firstName + ComConst.req}
                      className={
                        errors.firstName && touched.firstName ? "empty" : ""
                      }
                    />
                    <Input
                      className={
                        errors.firstName && touched.firstName ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="firstName"
                      value={values.firstName}
                      handleChange={handleChange}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.middleName}
                      className={
                        errors.middleName && touched.middleName ? "empty" : ""
                      }
                    />
                    <Input
                      onBlur={handleBlur}
                      name="middleName"
                      value={values.middleName}
                      handleChange={handleChange}
                      className={
                        errors.middleName && touched.middleName ? "empty" : ""
                      }
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.lastName}
                      className={
                        errors.lastName && touched.lastName ? "empty" : ""
                      }
                    />
                    <Input
                      onBlur={handleBlur}
                      name="lastName"
                      value={values.lastName}
                      handleChange={handleChange}
                      className={
                        errors.lastName && touched.lastName ? "empty" : ""
                      }
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.email + ComConst.req}
                      className={
                        errors.emailId && touched.emailId ? "empty" : ""
                      }
                    />
                    <Input
                      className={
                        errors.emailId && touched.emailId ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="emailId"
                      value={values.emailId}
                      handleChange={handleChange}
                    />
                    {errors.emailId && touched.emailId && (
                      <div className="form-error">{errors.emailId}</div>
                    )}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.mobile + ComConst.req}
                      className={errors.mobile && touched.mobile ? "empty" : ""}
                    />
                    <Input
                      className={errors.mobile && touched.mobile ? "empty" : ""}
                      type="number"
                      name="mobile"
                      onBlur={handleBlur}
                      value={values.mobile}
                      handleChange={(e) =>
                        setFieldValue("mobile", e.target.value.toString())
                      }
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="form-error">{errors.mobile}</div>
                    )}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label title={"POC"} />
                    <RoundSwitch
                      left={"Don't Allocate"}
                      right={"Allocate"}
                      checked={values.poc}
                      handleChange={(e) => setFieldValue("poc", !values.poc)}
                    />
                  </div>
                </Col>
              </Row>
              <div className="btnDiv">
                <div className="nextDiv">
                  <Button onClick={() => this.props.history.push("/users")}>
                    {ButtonConst.cancel}
                  </Button>
                  <Button type="submit" disabled={btnDisable}>
                    {ButtonConst.next}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </NewUserStyle>
    );
  }
}
const mapStateToProps = (state) => ({ user: state.user.user });
export default withRouter(connect(mapStateToProps, null)(userInfo));
