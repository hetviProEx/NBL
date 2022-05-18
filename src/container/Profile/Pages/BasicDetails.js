import React, { Component } from "react";
import * as Yup from "yup";
import { Row, Col, Image, message } from "antd";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { CloseOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Input, Label, Button, Select, FileUpload } from "components/Form";
import { savePartner, getPartnerById } from "redux/partner/action";
import { BasicConst, gstSelct } from "../constant";
import {
  FormValidation,
  panConst,
  gstConst,
  ButtonConst,
} from "App/AppConstant";
import { configVar } from "modules/config";

const UserValidation = Yup.object().shape({
  companyName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ0-9\s]+$/, FormValidation.alphaOrNumValid),
  partnerCode: Yup.string().trim().required(" "),
  email: Yup.string().trim().email().required(FormValidation.emailInvalid),
  mobile: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required(FormValidation.mobileInvalid),
  gstType: Yup.string().trim().required(" "),
  gstNumber: Yup.string().trim().matches(gstConst, FormValidation.gstvalid),
  pan: Yup.string().trim().matches(panConst, FormValidation.panValid),
  aadhar: Yup.string().trim().min(12).max(12),
});

class BasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      gstNoError: false,
      imgnm: "",
      imgByte: "",
      imgBase64: "",
      isDataSet: false,
      initVal: {
        partnerId: 0,
        companyName: "",
        email: "",
        mobile: "",
        gstNumber: "",
        gstType: "",
        pan: "",
        aadhar: "",
        logo: "",
      },
    };
  }
  componentDidMount() {
    const { partData } = this.props;
    if (partData.partnerId || partData.partnerId === 0) this.setInit(partData);
  }
  componentDidUpdate(prevProps) {
    const { partData } = this.props;
    if (partData !== prevProps.partData) this.setInit(partData);
  }
  setInit = (a) => {
    try {
      let imageName =
        a.companyLogo !== "" ? a.companyLogo?.split("/CompanyLogo/") : "";
      let url = configVar.BASE_URL.slice("/", -1);
      let data = {
        companyName: a.companyName,
        partnerCode: a.partnerCode,
        email: a.email || a.emailId,
        mobile: a.mobile,
        gstDisable: a.gstType === 1,
        gstType: a.gstType === 1 ? "Registred" : "Unregistred",
        gstNumber: a.gstNumber || a.gst,
        pan: a.pan,
        aadhar: a.aadhar || a.aadharNumber,
        logo: a.companyLogo,
        partnerId: a.partnerId,
      };
      this.setState({
        initVal: data,
        imgnm: imageName[1],
        imgByte: a.companyLogo !== "" ? url + a.companyLogo : "",
        imgBase64: a.companyLogo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  fileUpload = () => {
    try {
      const { partner } = this.props;
      const { imgByte } = this.state;
      if (partner?.imgnm || partner?.companyLogo || imgByte !== "") {
        return (
          <span className="optionui">
            <Image src={imgByte} width={50} height={30} />
            <CloseOutlined onClick={() => this.removefile()} />
          </span>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png"
          image={true}
          sendByte={(a, b, c) => this.setByte(a, b, c)}
          elements={
            <Button color="secondary" className="uploadbtn">
              <VerticalAlignTopOutlined />
              {ButtonConst.upload}
            </Button>
          }
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  removefile = () => this.setState({ imgnm: "", imgByte: "", imgBase64: "" });
  setByte = (byteCode, name, base64) =>
    this.setState({ imgnm: name, imgByte: byteCode, imgBase64: base64 });
  handleSubmit = async (val, { setSubmitting }) => {
    try {
      const { partData, userId } = this.props;
      const { imgBase64 } = this.state;
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
      let registred = val.gstType === "Registred";
      if (registred && val.gstNumber.toString().trim() === "")
        message.error("Add GST number");
      else {
        let data = partData;
        data.partnerId = val.partnerId;
        data.companyName = val.companyName;
        data.partnerCode = val.partnerCode;
        data.emailId = val.email;
        data.mobile = val.mobile.toString();
        data.gstType = registred ? 1 : 0;
        data.gstNumber = registred ? val.gstNumber.toString().trim() : "";
        data.pan = val.pan.toString();
        data.aadharNumber = val.aadhar.toString();
        data.companyLogo = imgBase64 !== "" ? imgBase64 : "";
        await this.props.savePartner(data);
        await this.props.getPartnerById(userId);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, setFieldValue, error, disable) => {
    try {
      return (
        <Select
          withID
          disable={disable}
          data={gstSelct}
          value={val}
          defaultValue={val}
          selectClass={error && val === "" ? "empty" : ""}
          onChange={(value) => {
            setFieldValue("gstType", value);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  ferr = (msg) => <div className="form-error">{msg}</div>;
  render() {
    const { initVal, disable, gstNoError } = this.state;
    return (
      <div>
        <Formik
          initialValues={initVal}
          validationSchema={UserValidation}
          onSubmit={this.handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.company_name}
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                    disabled={true}
                    onBlur={handleBlur}
                    value={values.companyName}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.partner_code}
                    className={
                      errors.partnerCode && touched.partnerCode ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.partnerCode && touched.partnerCode ? "empty" : ""
                    }
                    disabled={true}
                    onBlur={handleBlur}
                    value={values.partnerCode}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.email_id}
                    className={errors.email && touched.email ? "empty" : ""}
                  />
                  <Input
                    className={errors.email && touched.email ? "empty" : ""}
                    onBlur={handleBlur}
                    value={values.email}
                    disabled={true}
                  />
                  {errors.email && touched.email && this.ferr(errors.email)}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.mobile_no}
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                  />
                  <Input
                    type="number"
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                    disabled={true}
                    onBlur={handleBlur}
                    value={values.mobile}
                  />
                  {errors.mobile && touched.mobile && this.ferr(errors.mobile)}
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className="anime highZ"
                >
                  <Label
                    title={BasicConst.gst_type}
                    className={
                      errors.gstType && touched.gstType && values.gstType === ""
                        ? "empty"
                        : ""
                    }
                  />
                  {values.gstType === "" &&
                    this.selectUI(
                      "",
                      setFieldValue,
                      errors.gstType && touched.gstType
                    )}
                  {values.gstType !== "" &&
                    this.selectUI(
                      values.gstType,
                      setFieldValue,
                      false,
                      values.gstDisable
                    )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  {values.gstType === "Registred" && (
                    <>
                      <Label
                        title={BasicConst.gst_number}
                        className={
                          errors.gstNumber && touched.gstNumber ? "empty" : ""
                        }
                      />
                      <Input
                        onBlur={handleBlur}
                        name="gstNumber"
                        value={values.gstNumber}
                        disabled={values.gstDisable}
                        tabIndex="6"
                        handleChange={handleChange}
                        className={
                          (errors.gstNumber && touched.gstNumber) ||
                          (gstNoError && values.gstNumber === "")
                            ? "empty"
                            : ""
                        }
                      />
                    </>
                  )}
                  {errors.gstNumber &&
                    touched.gstNumber &&
                    this.ferr(errors.gstNumber)}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.pan}
                    className={errors.pan && touched.pan ? "empty" : ""}
                  />
                  <Input
                    className={errors.pan && touched.pan ? "empty" : ""}
                    onBlur={handleBlur}
                    name="pan"
                    value={values.pan}
                    handleChange={handleChange}
                    tabIndex="7"
                  />
                  {errors.pan && touched.pan && this.ferr(errors.pan)}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.aadhar}
                    className={errors.aadhar && touched.aadhar ? "empty" : ""}
                  />
                  <Input
                    className={errors.aadhar && touched.aadhar ? "empty" : ""}
                    type="number"
                    onBlur={handleBlur}
                    name="aadhar"
                    value={values.aadhar}
                    handleChange={handleChange}
                    tabIndex="8"
                  />
                  {errors.aadhar && touched.aadhar && this.ferr(errors.aadhar)}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label title={BasicConst.companylogo} />
                  <>{this.fileUpload(setFieldValue)}</>
                </Col>
              </Row>
              <div className="btnDiv anime">
                <Button type="submit" disabled={disable}>
                  {ButtonConst.update}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPartnerById: (userId) => dispatch(getPartnerById(userId)),
  savePartner: (payload) => dispatch(savePartner(payload)),
});
export default withRouter(connect(null, mapDispatchToProps)(BasicDetails));
