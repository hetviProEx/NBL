import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";
import { withRouter } from "react-router";
import { ButtonConst, FormValidation } from "App/AppConstant";
import { savePartner } from "redux/partner/action";
import { contactConst } from "container/PartnerAddEdit/constant";
import { Input, Label, Button } from "components/Form";

const UserValidation = Yup.object().shape({
  contactName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  emailId: Yup.string().trim().email().required(" "),
  mobile: Yup.string().trim().min(10).max(10).required(" "),
  designation: Yup.string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
});

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      count: 1,
      contacts: [],
      initVal: {
        key: 0,
        contactName: "",
        designation: "",
        emailId: "",
        mobile: "",
        isDelete: 0,
        partnerId: 0,
        contactId: 0,
      },
    };
  }
  componentDidMount() {
    this.setcontact();
  }
  componentDidUpdate(prevProps) {
    try {
      const { partData } = this.props;
      if (partData !== prevProps.partData) {
        this.setcontact();
      }
    } catch (error) {
      console.log(error);
    }
  }
  setcontact = () => {
    try {
      const { partData } = this.props;
      if (partData.partnerId || partData.partnerId === 0) {
        let data = partData?.contactDetails?.filter((a) => a.isDelete !== 1);
        this.setState({ count: data.length, contacts: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  removeConnect = (key, handleReset) => {
    const newData = this.state.contacts.filter((a) => a.key !== key);
    this.setState({ contacts: newData, count: this.state.count - 1 });
    handleReset();
  };
  addContact = (key, val) => {
    try {
      const { count, contacts } = this.state;
      // let mobile = this.checkValue(val.mobile, "mobile", val.key);
      // let emailId = this.checkValue(val.emailId, "emailId", val.key);
      // if (mobile && emailId) {
      if (count === key + 1) this.setState({ count: count + 1 });
      if (contacts[key]) contacts[key] = val;
      else contacts.push(val);
      this.setState({ contacts });
      this.setDisable(); // }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setDisable();
      // let mobile = this.checkValue(values.mobile, "mobile", values.key);
      // let emailId = this.checkValue(values.emailId, "emailId", values.key);
      // if (mobile && emailId) {
      const { partData } = this.props;
      const { contacts, count } = this.state;
      let cncts = contacts;
      if (!cncts[values.key]) cncts.push(values);
      else cncts[values.key] = values;
      if (values.key + 1 === count) {
        partData.contactDetails = cncts;
        this.props.savePartner(partData);
      } else this.setState({ contacts: cncts }); // }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  setDisable = () => {
    this.setState({ btnDisable: true, check: true });
    setTimeout(() => {
      this.setState({ btnDisable: false });
    }, 4500);
  };
  // checkValue = (val, key, idx) => {
  //   try {
  //     const { contacts } = this.state;
  //     this.setDisable();
  //     const inx = contacts.findIndex(
  //       (d) => d[key].toString() === val.toString()
  //     );
  //     if (inx > -1 && idx !== inx) {
  //       message.error(key + " already used");
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  render() {
    const { btnDisable, count, contacts, initVal } = this.state;
    let array = [];
    for (let i = 0; i < count; i++) {
      let data = contacts[i] ? contacts[i] : initVal;
      data.key = i;
      array.push(data);
    }
    return (
      <div>
        {array?.map((data, index) => (
          <div className="formConDiv anime" key={index}>
            <Formik
              enableReinitialize
              initialValues={data}
              validationSchema={UserValidation}
              onSubmit={this.handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                validateForm,
                handleReset,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row gutter={20}>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      className="anime"
                    >
                      <div className="field">
                        <Label
                          title={contactConst.contactName}
                          className={
                            errors.contactName && touched.contactName
                              ? "empty"
                              : ""
                          }
                        />
                        <Input
                          onBlur={handleBlur}
                          name="contactName"
                          value={values.contactName}
                          handleChange={handleChange}
                          className={
                            errors.contactName && touched.contactName
                              ? "empty"
                              : ""
                          }
                        />
                        {errors.contactName && touched.contactName && (
                          <div className="form-error">{errors.contactName}</div>
                        )}
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      className="anime"
                    >
                      <div className="field">
                        <Label
                          title={contactConst.mobile}
                          className={
                            errors.mobile && touched.mobile ? "empty" : ""
                          }
                        />
                        <Input
                          className={
                            errors.mobile && touched.mobile ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          name="mobile"
                          type="number"
                          value={values.mobile.toString()}
                          handleChange={(e) =>
                            setFieldValue("mobile", e.target.value)
                          }
                        />
                        {errors.mobile && touched.mobile && (
                          <div className="form-error">{errors.mobile}</div>
                        )}
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      className="anime"
                    >
                      <div className="field">
                        <Label
                          title={contactConst.email}
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
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      className="anime"
                    >
                      <div className="field">
                        <Label
                          title={contactConst.designation}
                          className={
                            errors.designation && touched.designation
                              ? "empty"
                              : ""
                          }
                        />
                        <Input
                          onBlur={handleBlur}
                          name="designation"
                          value={values.designation}
                          handleChange={handleChange}
                          className={
                            errors.designation && touched.designation
                              ? "empty"
                              : ""
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="bottomConDiv">
                    <div className="leftBtnDiv anime">
                      {count - 1 === index && (
                        <Button
                          disabled={btnDisable}
                          onClick={() => {
                            validateForm().then((d) => {
                              if (Object.keys(d).length === 0)
                                this.addContact(data.key, values);
                              else handleSubmit();
                            });
                          }}
                        >
                          {contactConst.add}
                        </Button>
                      )}
                      {array.length > 1 && (
                        <Button
                          onClick={() => {
                            this.removeConnect(data.key, handleReset);
                          }}
                        >
                          {contactConst.remove}
                        </Button>
                      )}
                    </div>
                    <div className="rightBtnDiv">
                      {count - 1 === index && (
                        <>
                          <Button
                            onClick={() => this.props.history.push("/partners")}
                          >
                            {ButtonConst.cancel}
                          </Button>
                          <Button onClick={this.props.previous}>
                            {ButtonConst.previous}
                          </Button>
                        </>
                      )}
                      <Button type="submit" disabled={btnDisable}>
                        {count - 1 === index ? "Submit" : "Save"}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePartner: (payload) => dispatch(savePartner(payload)),
});

export default withRouter(connect(null, mapDispatchToProps)(ContactDetails));
