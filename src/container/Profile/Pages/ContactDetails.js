import React, { Component } from "react";
import { Row, Col, Divider, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { savePartner, getPartnerById } from "redux/partner/action";
import { ContactConst } from "../constant";
import { Input, Label, Button } from "components/Form";
import { ButtonConst, FormValidation } from "App/AppConstant";

const UserValidation = Yup.object().shape({
  contactName: Yup.string()
    .trim()
    .required(FormValidation.alphaNumValid)
    .matches(/^[aA-zZ0-9\s]+$/, FormValidation.alphaOrNumValid),
  mobile: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required(FormValidation.mobileInvalid),
  emailId: Yup.string().trim().email().required(FormValidation.emailInvalid),
  designation: Yup.string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
});
class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      prev: [],
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
      let mobile = this.checkValue(val.mobile, "mobile", val.key);
      let emailId = this.checkValue(val.emailId, "emailId", val.key);
      if (mobile && emailId) {
        if (count === key + 1) this.setState({ count: count + 1 });
        if (contacts[key]) contacts[key] = val;
        else contacts.push(val);
        this.setState({ contacts });
        this.setDisable();
      }
    } catch (error) {
      console.log(error);
    }
  };
  txtCng = (e, index, setFieldValue, fieldName) => {
    const { contacts } = this.state;
    let data = contacts;
    data[index][fieldName] = e.target.value;
    this.setState({ contacts: data });
    setFieldValue(fieldName, e.target.value);
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setDisable();
      let mobile = this.checkValue(values.mobile, "mobile", values.key);
      let emailId = this.checkValue(values.emailId, "emailId", values.key);
      if (mobile && emailId) {
        const { partData, userId } = this.props;
        const { contacts, count } = this.state;
        this.setState({ disable: true });
        setTimeout(() => {
          this.setState({ disable: false });
        }, 5000);
        let cncts = contacts;
        if (!cncts[values.key]) cncts.push(values);
        else cncts[values.key] = values;
        if (values.key + 1 === count) {
          partData.contactDetails = cncts;
          await this.props.savePartner(partData);
          await this.props.getPartnerById(userId);
        } else this.setState({ contacts: cncts });
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  setDisable = () => {
    this.setState({ disable: true, check: true });
    setTimeout(() => {
      this.setState({ disable: false });
    }, 4500);
  };
  checkValue = (val, key, idx) => {
    try {
      const { contacts } = this.state;
      this.setDisable();
      const inx = contacts.findIndex(
        (d) => d[key].toString() === val.toString()
      );
      if (inx > -1 && idx !== inx) {
        message.error(key + " already used");
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { disable, count, contacts, initVal } = this.state;
    let array = [];
    for (let i = 0; i < count; i++) {
      let data = contacts[i] ? contacts[i] : initVal;
      data.key = i;
      array.push(data);
    }
    return (
      <>
        {array?.map((data, index) => (
          <div key={index}>
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
                onBlur,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row gutter={24}>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      className="anime"
                    >
                      <Label
                        title={ContactConst.contact_name}
                        className={
                          errors.contactName && touched.contactName
                            ? "empty"
                            : ""
                        }
                      />
                      <Input
                        className={
                          errors.contactName && touched.contactName
                            ? "empty"
                            : ""
                        }
                        onBlur={handleBlur}
                        name="contactName"
                        onChange={(e) => {
                          this.txtCng(e, index, setFieldValue, "contactName");
                        }}
                        value={values.contactName}
                        handleChange={handleChange}
                        tabIndex="1"
                      />
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      className="anime"
                    >
                      <Label
                        title={ContactConst.mobile}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                      <Input
                        type="number"
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                        onBlur={handleBlur}
                        onChange={(e) => {
                          this.txtCng(e, index, setFieldValue, "mobile");
                        }}
                        name="mobile"
                        value={values.mobile}
                        handleChange={handleChange}
                        tabIndex="2"
                      />
                      {errors.mobile && touched.mobile && (
                        <div className="form-error">{errors.mobile}</div>
                      )}
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      className="anime"
                    >
                      <Label
                        title={ContactConst.email}
                        className={
                          errors.emailId && touched.emailId ? "empty" : ""
                        }
                      />
                      <Input
                        className={
                          errors.emailId && touched.emailId ? "empty" : ""
                        }
                        onBlur={handleBlur}
                        onChange={(e) => {
                          this.txtCng(e, index, setFieldValue, "emailId");
                        }}
                        name="emailId"
                        value={values.emailId}
                        handleChange={handleChange}
                        tabIndex="3"
                      />
                      {errors.emailId && touched.emailId && (
                        <div className="form-error">{errors.emailId}</div>
                      )}
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      className="anime"
                    >
                      <Label title={ContactConst.designation} />
                      <Input
                        onBlur={handleBlur}
                        onChange={(e) => {
                          this.txtCng(e, index, setFieldValue, "designation");
                        }}
                        name="designation"
                        value={values.designation}
                        handleChange={handleChange}
                        tabIndex="4"
                      />
                    </Col>
                  </Row>
                  {array?.length - 1 === index && (
                    <div className="btnDiv anime">
                      <Button type="submit" disabled={disable}>
                        {ButtonConst.save}
                      </Button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
            <Divider />
          </div>
        ))}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPartnerById: (userId) => dispatch(getPartnerById(userId)),
  savePartner: (payload) => dispatch(savePartner(payload)),
});

export default withRouter(connect(null, mapDispatchToProps)(ContactDetails));
