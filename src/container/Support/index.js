import React, { Component } from "react";
import { Spin } from "antd";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { SupportStyle } from "./style";
import { supportConst } from "./constant";
import { getAuthUserID } from "modules/helper";
import { Menu, Header } from "components/Form";
import { FormValidation } from "App/AppConstant";
import { Button, Input, Label } from "components/Form";
import { saveSupport } from "redux/partnerUser/action";

var userId = getAuthUserID();

const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required(" "),
  email: Yup.string().trim().required(" ").email(FormValidation.emailInvalid),
  message: Yup.string().trim().required(" "),
  mobile: Yup.string()
    .trim()
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid),
});
class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      initValues: {
        supportId: 0,
        name: "",
        email: "",
        message: "",
        mobile: "",
      },
    };
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 4500);
      let data = {
        supportId: values.contactId,
        name: values.name,
        email: values.email,
        message: values.message,
        mobile: values.mobile,
        userId: userId,
      };
      await this.props.saveSupport({ data: data });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initValues, disable } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <SupportStyle>
          <Menu />
          <div className="container">
            <Header title={"Support"} />
            <div className="allDiv">
              <Formik
                initialValues={initValues}
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
                }) => (
                  <Form onSubmit={handleSubmit} className="mainForm">
                    <div className="form_div anime">
                      <div className="field anime">
                        <Label
                          title={supportConst.name}
                          className={errors.name && touched.name ? "empty" : ""}
                        />
                        <Input
                          placeholder={supportConst.placeName}
                          className={errors.name && touched.name ? "empty" : ""}
                          onBlur={handleBlur}
                          name="name"
                          value={values.name}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="field anime">
                        <Label
                          title={supportConst.email}
                          className={
                            errors.email && touched.email ? "empty" : ""
                          }
                        />
                        <Input
                          placeholder={supportConst.placeEmail}
                          className={
                            errors.email && touched.email ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          name="email"
                          value={values.email}
                          handleChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <div className="form-error">{errors.email}</div>
                        )}
                      </div>
                      <div className="field anime">
                        <Label
                          title={supportConst.msg}
                          className={
                            errors.message && touched.message ? "empty" : ""
                          }
                        />
                        <Input
                          className={
                            errors.message && touched.message ? "empty" : ""
                          }
                          row={3}
                          name="message"
                          value={values.message}
                          handleChange={handleChange}
                        />
                        {errors.message && touched.message && (
                          <div className="form-error">{errors.message}</div>
                        )}
                      </div>
                      <div className="field anime">
                        <Label title={supportConst.phone} />
                        <Input
                          placeholder={supportConst.placePhone}
                          className={
                            errors.mobile && touched.mobile ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          name="mobile"
                          value={values.mobile}
                          handleChange={handleChange}
                        />
                        {errors.mobile && touched.mobile && (
                          <div className="form-error">{errors.mobile}</div>
                        )}
                      </div>
                      <div className="btnDiv">
                        <Button type="submit" disabled={disable}>
                          {supportConst.submit}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </SupportStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({ loading: state.partner.loading });
const mapDispatchToProps = (dispatch) => ({
  saveSupport: (payload) => dispatch(saveSupport(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Support)
);
