import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { Row, Col, Image, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";

import { configVar } from "modules/config";
import { getAuthUserID } from "modules/helper";
import { basicConst } from "container/PartnerAddEdit/constant";
import { Input, Label, RoundSwitch, Button, FileUpload } from "components/Form";
import {
  ButtonConst,
  FormValidation,
  gstConst,
  panConst,
} from "App/AppConstant";

var userId = getAuthUserID();
const UserValidation = Yup.object().shape({
  companyName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  email: Yup.string().trim().email().required(" "),
  mobile: Yup.string().trim().min(10).max(10).required(" "),
  gstNumber: Yup.string()
    .trim()
    .nullable()
    .matches(gstConst, FormValidation.gstvalid),
  pan: Yup.string().trim().matches(panConst, FormValidation.panValid),
  aadhar: Yup.string()
    .trim()
    .max(12, FormValidation.aadharInvalid)
    .min(12, FormValidation.aadharInvalid),
  address: Yup.string().trim().required(" "),
  pincode: Yup.string().trim().min(6).max(6).required(" "),
  city: Yup.string().trim(),
  state: Yup.string().trim().required(" "),
  country: Yup.string().trim().required(" "),
});
class BasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      gst: false,
      imgnm: "",
      imgByte: "",
      imgBase64: "",
      initVal: {
        partnerId: 0,
        companyName: "",
        email: "",
        mobile: "",
        gstNumber: "",
        pan: "",
        aadhar: "",
        address: "",
        pincode: "",
        state: "",
        city: "",
        country: "",
      },
    };
  }
  componentDidMount() {
    try {
      const { partData } = this.props;
      if (partData.partnerId || partData.partnerId === 0)
        this.setInit(partData);
      userId = userId ? userId : getAuthUserID();
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { partData } = this.props;
      if (partData !== prevProps.partData) {
        this.setInit(partData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  setInit = (a) => {
    try {
      let imageName =
        a.companyLogo !== "" ? a.companyLogo?.split("/CompanyLogo/") : "";
      let url = configVar.BASE_URL.slice("/", -1);
      let spl = a.partnerId !== 0 ? a.companyLogo?.split("/") : "";
      let imgShow =
        spl[1] === "CompanyLogo" ? url + a.companyLogo : a.companyLogoByt;
      let data = {
        companyName: a.companyName,
        email: a.email || a.emailId,
        mobile: a.mobile,
        gst: a.gstType === 1,
        gstNumber: a.gstNumber || a.gst,
        pan: a.pan,
        aadhar: a.aadhar || a.aadharNumber,
        partnerId: a.partnerId,
        address: a.address,
        pincode: a.pincode,
        state: a.state,
        city: a.city,
        country: a.country,
      };
      this.setState({
        initVal: data,
        imgnm: imageName[1],
        imgByte: a.companyLogo !== "" ? imgShow : "",
        imgBase64: a.companyLogo,
        gst: a.gstType === 1,
      });
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = () => this.setState({ gst: !this.state.gst });
  fileUpload = () => {
    try {
      const { imgByte } = this.state;
      if (imgByte !== "") {
        return (
          <span className="optionui">
            <Image src={imgByte} width={50} height={30} />
            <CloseOutlined className="pointer" onClick={this.removefile} />
          </span>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png , .svg"
          image={true}
          sendByte={this.setByte}
          elements={<UploadOutlined />}
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
      const { partData } = this.props;
      const { gst, imgBase64, imgByte } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      if (gst && val.gstNumber.toString().trim() === "") {
        message.error("Add GST number");
        return;
      }
      let data = partData;
      data.createdBy = userId;
      data.partnerId = val.partnerId;
      data.companyName = val.companyName;
      data.emailId = val.email;
      data.mobile = val.mobile.toString();
      data.gstType = gst ? 1 : 0;
      data.gstNumber = gst ? val.gstNumber.toString().trim() : "";
      data.pan = val.pan.toString();
      data.aadharNumber = val.aadhar.toString();
      data.companyLogo = imgBase64 !== "" ? imgBase64 : "";
      data.companyLogoByt = imgByte !== "" ? imgByte : "";
      data.address = val.address;
      data.pincode = val.pincode.toString();
      data.state = val.state;
      data.city = val.city;
      data.country = val.country;
      this.props.savePartner(data);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initVal, btnDisable, gst } = this.state;
    return (
      <div>
        <div className="formDiv">
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
              onBlur,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={24}>
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
                        title={basicConst.comName}
                        className={
                          errors.companyName && touched.companyName
                            ? "empty"
                            : ""
                        }
                      />
                      <Input
                        name="companyName"
                        onBlur={handleBlur}
                        value={values.companyName}
                        handleChange={handleChange}
                        className={
                          errors.companyName && touched.companyName
                            ? "empty"
                            : ""
                        }
                      />
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
                        title={basicConst.email}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      <Input
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
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
                        title={basicConst.mobile}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                      <Input
                        name="mobile"
                        type="number"
                        value={values.mobile}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                    </div>
                    <div className="field">
                      <Label
                        title={basicConst.pincode}
                        className={
                          errors.pincode && touched.pincode ? "empty" : ""
                        }
                      />
                      <Input
                        type="number"
                        onBlur={handleBlur}
                        name="pincode"
                        value={values.pincode}
                        handleChange={handleChange}
                        tabIndex="6"
                        className={
                          errors.pincode && touched.pincode ? "empty" : ""
                        }
                      />
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
                        title={basicConst.address}
                        className={
                          errors.address && touched.address ? "empty" : ""
                        }
                      />
                      <Input
                        row={5}
                        onBlur={handleBlur}
                        name="address"
                        value={values.address}
                        handleChange={handleChange}
                        tabIndex="3"
                        className={
                          errors.address && touched.address ? "empty" : ""
                        }
                      />
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
                        title={basicConst.country}
                        className={
                          errors.country && touched.country ? "empty" : ""
                        }
                      />
                      <Input
                        name="country"
                        value={values.country}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        className={
                          errors.country && touched.country ? "empty" : ""
                        }
                      />
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
                        title={basicConst.state}
                        className={errors.state && touched.state ? "empty" : ""}
                      />
                      <Input
                        onBlur={handleBlur}
                        name="state"
                        value={values.state}
                        handleChange={handleChange}
                        tabIndex="8"
                        className={errors.state && touched.state ? "empty" : ""}
                      />
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
                        title={basicConst.city}
                        className={errors.city && touched.city ? "empty" : ""}
                      />
                      <Input
                        onBlur={handleBlur}
                        name="city"
                        value={values.city}
                        handleChange={handleChange}
                        tabIndex="7"
                        className={errors.city && touched.city ? "empty" : ""}
                      />
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
                        title={basicConst.pan}
                        className={errors.pan && touched.pan ? "empty" : ""}
                      />
                      <Input
                        name="pan"
                        value={values.pan.toUpperCase()}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        className={errors.pan && touched.pan ? "empty" : ""}
                      />
                    </div>
                    {errors.pan && touched.pan && (
                      <div className="form-error">{errors.pan}</div>
                    )}
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
                      <Label title={basicConst.gst} />
                      <RoundSwitch
                        left={basicConst.no + basicConst.reg}
                        right={basicConst.reg}
                        checked={gst}
                        handleChange={this.switchChange}
                      />
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
                    {gst && (
                      <div className="field">
                        <Label
                          title={basicConst.gstNum}
                          className={
                            errors.gstNumber && touched.gstNumber ? "empty" : ""
                          }
                        />
                        <Input
                          name="gstNumber"
                          onBlur={handleBlur}
                          value={values?.gstNumber?.toUpperCase()}
                          handleChange={handleChange}
                          className={
                            errors.gstNumber && touched.gstNumber ? "empty" : ""
                          }
                        />
                        {errors.gstNumber && touched.gstNumber && (
                          <div className="form-error">{errors.gstNumber}</div>
                        )}
                      </div>
                    )}
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
                        title={basicConst.aadhar}
                        className={
                          errors.aadhar && touched.aadhar ? "empty" : ""
                        }
                      />
                      <Input
                        name="aadhar"
                        type="number"
                        max={12}
                        value={values.aadhar}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        className={
                          errors.aadhar && touched.aadhar ? "empty" : ""
                        }
                      />
                      {errors.aadhar && touched.aadhar && (
                        <div className="form-error">{errors.aadhar}</div>
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
                      <Label title={basicConst.comLogo} />
                      <div className="pointer">{this.fileUpload()}</div>
                    </div>
                  </Col>
                </Row>
                <div className="bottomDiv">
                  <div className="btn anime">
                    <Button
                      onClick={() => this.props.history.push("/partners")}
                    >
                      {ButtonConst.cancel}
                    </Button>
                    <Button
                      type="submit"
                      className="nextBtn"
                      disabled={btnDisable}
                    >
                      {basicConst.next}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default withRouter(BasicDetails);
