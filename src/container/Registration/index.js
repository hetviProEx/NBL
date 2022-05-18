import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, Image } from "antd";
import { Formik, Form } from "formik";
import Particles from "react-particles-js";
import * as Yup from "yup";
import { logo } from "components/Images";
import { StyleContainer } from "./style.js";
import { login } from "redux/login/actions";
import { FormValidation } from "App/AppConstant";
import { RegistrationConstant } from "./constant";
import { Label, Input, Button } from "components/Form";

const loginValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required(" "),
  email: Yup.string().trim().email(" ").required(" "),
  mobile: Yup.string()
    .trim()
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid)
    .required(" "),
});

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = { btnDisable: false };
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let data = {
        email: values.email.trim(),
        mobile: values.mobile.trim(),
      };
      await this.props.login(data);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { btnDisable } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <StyleContainer>
          <div className="canvasDiv">
            <Particles
              height="100vh"
              width="100vw"
              params={{
                particles: {
                  color: { value: "#fff" },
                  line_linked: { color: { value: "#fff" } },
                  number: { value: 50 },
                  size: { value: 3 },
                },
                retina_detect: true,
              }}
            />
          </div>
          <div className="form-div fadeInDown">
            <div className="logoDiv">
              <Image src={logo} alt="User Icon" preview={false} width={120} />
            </div>
            <div className="loginDiv">
              <Formik
                initialValues={{ email: "", mobile: "", name: "", ref: "" }}
                validationSchema={loginValidationSchema}
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
                  <Form onSubmit={handleSubmit} noValidate>
                    <div className="anime">
                      <Label
                        title={RegistrationConstant.name}
                        className={errors.name && touched.name ? "empty" : ""}
                      />
                      <Input
                        onBlur={handleBlur}
                        name="name"
                        value={values.name.trim()}
                        handleChange={handleChange}
                        className={errors.name && touched.name ? "empty" : ""}
                      />
                      {/* {errors.email && touched.email ? (<div className="form-error">{errors.email}</div>) : null} */}
                    </div>
                    <div className="anime">
                      <Label
                        title={RegistrationConstant.email}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      <Input
                        onBlur={handleBlur}
                        name="email"
                        value={values.email.trim()}
                        handleChange={handleChange}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      {/* {errors.email && touched.email ? (<div className="form-error">{errors.email}</div>) : null} */}
                    </div>
                    <div className="anime">
                      <Label
                        title={RegistrationConstant.mobile}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                      <Input
                        name="mobile"
                        type="number"
                        onBlur={handleBlur}
                        value={values.mobile}
                        handleChange={handleChange}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                      {errors.mobile && touched.mobile ? (
                        <div className="form-error">{errors.mobile}</div>
                      ) : null}
                    </div>
                    <div className="anime">
                      <Label
                        title={RegistrationConstant.RefC}
                        className={errors.ref && touched.ref ? "empty" : ""}
                      />
                      <Input
                        onBlur={handleBlur}
                        name="ref"
                        value={values.ref.trim()}
                        handleChange={handleChange}
                        className={errors.ref && touched.ref ? "empty" : ""}
                      />
                    </div>
                    <div className="anime btnDiv">
                      <Button type="submit" disabled={btnDisable}>
                        {RegistrationConstant.submit}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </StyleContainer>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({ loading: state.login.loading });
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
