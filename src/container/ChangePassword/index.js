import React, { Component } from "react";
import { Spin } from "antd";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { ChangePWDStyle } from "./style";
import { Menu, Header } from "components/Form";
import { Button, Input } from "components/Form";
import { FormValidation, pwdMatch, ButtonConst } from "App/AppConstant";
import { ChngPwdConst } from "./constant";

const validationSchema = Yup.object().shape({
  curPwd: Yup.string()
    .min(6, FormValidation.passwordMin)
    .required(" "),// .matches(pwdMatch, FormValidation.passwordInvalid),
  newPwd: Yup.string()
    .min(6, FormValidation.passwordMin)
    .required(" ")
    .matches(pwdMatch, FormValidation.passwordInvalid),
  conPwd: Yup.string()
    .min(6, FormValidation.passwordMin)
    .required(" ")
    .when("newPwd", {
      is: (val) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref("newPwd")], FormValidation.repatePWD),
    })
    .matches(pwdMatch, FormValidation.passwordInvalid),
});

class ChangePWD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      initialState: { curPwd: "", newPwd: "", conPwd: "" },
    };
  }
  handleSubmit = () => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState, disable } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <ChangePWDStyle>
          <Menu />
          <div className="container">
            <Header title={"Change-Password"} />
            <div className="allDiv anime">
              <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
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
                  <Form onSubmit={handleSubmit}>
                    <div className="form_div anime">
                      <div className="field anime">
                        <Input
                          placeholder={ChngPwdConst.curPwd}
                          className={
                            errors.curPwd && touched.curPwd ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          password={true}
                          name="curPwd"
                          value={values.curPwd}
                          handleChange={handleChange}
                          tabIndex="1"
                        />
                        {errors.curPwd && touched.curPwd && (
                          <div className="form-error">{errors.curPwd}</div>
                        )}
                      </div>
                      <div className="field anime">
                        <Input
                          placeholder={ChngPwdConst.newPwd}
                          className={
                            errors.newPwd && touched.newPwd ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          password={true}
                          name="newPwd"
                          value={values.newPwd}
                          handleChange={handleChange}
                          tabIndex="2"
                        />
                        {errors.newPwd && touched.newPwd && (
                          <div className="form-error">{errors.newPwd}</div>
                        )}
                      </div>
                      <div className="field anime">
                        <Input
                          placeholder={ChngPwdConst.cunfNewPwd}
                          className={
                            errors.conPwd && touched.conPwd ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          password={true}
                          name="conPwd"
                          value={values.conPwd}
                          handleChange={handleChange}
                          tabIndex="3"
                        />
                        {errors.conPwd && touched.conPwd && (
                          <div className="form-error">{errors.conPwd}</div>
                        )}
                      </div>
                      <div className="btnDiv">
                        <Button type="submit" disabled={disable}>
                          {ButtonConst.updatePWD}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </ChangePWDStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({ loading: state.partner.loading });
const mapDispatchToProps = (dispatch) => ({
  // saveContactus: (payload) => dispatch(saveContactus(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePWD)
);
