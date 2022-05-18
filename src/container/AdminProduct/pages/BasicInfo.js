import React, { Component } from "react";
import { Row, Col, Image } from "antd";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { configVar } from "modules/config";
import { proAddConst } from "container/AdminProduct/constant";
import { ButtonConst, FormValidation } from "App/AppConstant";
import { Input, Label, Button, FileUpload, RichTextBox } from "components/Form";
const ProductValidation = Yup.object().shape({
  productName: Yup.string()
    .trim()
    .matches(/^[aA-zZ0-9 ]*$/, FormValidation.alphaOrNumValid)
    .required(" "),
  productDescri: Yup.string().trim().required(" "),
  productTitle: Yup.string()
    .trim()
    .matches(/^[aA-zZ0-9 ]*$/, FormValidation.alphaOrNumValid),
});

class ProAddEditDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      comLogoByte: null,
      comLogoBase64: null,
      comLogoError: false,
      title: "",
      iconByte: null,
      iconBase64: null,
      featureId: 0,
      productId: 0,
      features: [],
      initialState: {
        productName: "",
        productTitle: "",
        productDescri: "",
      },
    };
  }
  componentDidMount() {
    try {
      const { data } = this.props;
      if (data.productId || data.productId === 0) this.setInit(data);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { data } = this.props;
      if (data !== prevProps.data) {
        this.setInit(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  setInit = (data) => {
    try {
      const { features } = this.state;
      let url = configVar.BASE_URL.slice("/", -1);
      let init = {
        productName: data.productname,
        productTitle: data.productTitle,
        productDescri: data.productDescription,
      };
      data?.productFeatures?.forEach((a) => {
        if (a.pfName !== "" && a.pfIcon !== "") {
          features.push({
            featureId: a.pfId,
            title: a.pfName,
            iconByte: a.pfIcon !== "" ? url + a.pfIcon : null,
            iconBase64: a.pfIcon !== "" ? a.pfIcon : null,
            isDelete: a.isDelete,
          });
        }
      });
      this.setState({
        productId: data.productId,
        initialState: init,
        comLogoBase64: data.productLogo !== "" ? data.productLogo : null,
        comLogoByte: data.productLogo !== "" ? url + data.productLogo : null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleTitle = (e) => this.setState({ title: e.target.value });
  fileUpload = (b, c) => {
    try {
      if (b) {
        return (
          <span className="optionui">
            <Image src={b} width={50} height={30} />
            <CloseOutlined
              onClick={() =>
                c === "companyLogo" ? this.removeCompLogo() : this.removeIcon()
              }
            />
          </span>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png,.svg"
          image={true}
          sendByte={c === "companyLogo" ? this.setComLogo : this.setIcon}
          elements={<UploadOutlined />}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  setComLogo = (byteCode, name, base64) => {
    this.setState({
      comLogoByte: byteCode,
      comLogoBase64: base64,
      comLogoError: !base64,
    });
  };
  setIcon = (byteCode, name, base64) =>
    this.setState({ iconByte: byteCode, iconBase64: base64 });
  removeCompLogo = () =>
    this.setState({ comLogoByte: null, comLogoBase64: null });
  removeIcon = () => this.setState({ iconByte: null, iconBase64: null });
  deleteIcon = (i, did) => {
    try {
      const { features, productId } = this.state;
      if (productId !== 0 && did !== 0) {
        features[i].isDelete = 1;
        this.setState({ features });
      } else {
        features.splice(i, 1);
        this.setState({ features });
      }
    } catch (error) {
      console.log(error);
    }
  };
  addIcon = () => {
    try {
      const { features, title, iconByte, iconBase64, featureId } = this.state;
      if (title.trim() !== "" && iconBase64 && features.length < 25) {
        features.push({
          featureId: featureId,
          title: title,
          iconByte: iconByte,
          iconBase64: iconBase64,
          isDelete: 0,
        });
        this.setState({ title: "", iconByte: null, iconBase64: null });
      } else this.setState({ title: "", iconByte: null, iconBase64: null });
    } catch (error) {
      console.log(error);
    }
  };
  imagesUI = () => {
    try {
      const { features } = this.state;
      return features?.map(
        (a, i) =>
          a.isDelete === 0 && (
            <div className="imgDiv" key={i}>
              <Image
                src={a.iconByte}
                width={160}
                height={100}
                preview={false}
              />
              <div>
                <span className="txtWrap">{a.title}</span>
                <DeleteOutlined
                  onClick={() => this.deleteIcon(i, a.featureId)}
                />
              </div>
            </div>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        title,
        iconByte,
        iconBase64,
        features,
        comLogoBase64,
        featureId,
        productId,
      } = this.state;
      let data = this.props.data;
      let productFeatures = [];
      let flag = false;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      if (!comLogoBase64) {
        this.setState({ comLogoError: true });
        flag = true;
      }
      if (title.trim() !== "" && iconBase64 && features.length < 25) {
        features.push({
          featureId: featureId,
          title: title.trim(),
          iconByte: iconByte,
          iconBase64: iconBase64,
          isDelete: 0,
        });
      }
      if (features?.length > 0) {
        features?.forEach((a) => {
          productFeatures.push({
            pfId: a.featureId,
            productId: productId,
            pfName: a.title,
            pfIcon: a.iconBase64,
            isDelete: a.isDelete,
          });
        });
      }
      if (!flag) {
        data.productId = productId;
        data.productname = values.productName.trim();
        data.productTitle = values.productTitle.trim();
        data.productDescription = values.productDescri.trim();
        data.productLogo = comLogoBase64 !== null ? comLogoBase64 : "";
        data.productFeatures = productFeatures;
        this.props.countInc(data);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      initialState,
      btnDisable,
      comLogoByte,
      title,
      iconByte,
      comLogoError,
    } = this.state;
    return (
      <Formik
        initialValues={initialState}
        validationSchema={ProductValidation}
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
            <Row gutter={20} className="anime">
              <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                <div className="field">
                  <Label
                    title={proAddConst.product}
                    className={
                      errors.productName && touched.productName ? "empty" : ""
                    }
                  />
                  <Input
                    onBlur={handleBlur}
                    name="productName"
                    value={values.productName}
                    handleChange={handleChange}
                    className={
                      errors.productName && touched.productName ? "empty" : ""
                    }
                  />
                  {errors.productName && touched.productName && (
                    <div className="form-error">{errors.productName}</div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                <div className="compLogoDiv">
                  <Label
                    title={proAddConst.company}
                    className={comLogoError ? "empty" : ""}
                  />
                  {this.fileUpload(comLogoByte, "companyLogo")}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                <div className="field">
                  <Label
                    title={proAddConst.productTitle}
                    className={
                      errors.productTitle && touched.productTitle ? "empty" : ""
                    }
                  />
                  <Input
                    onBlur={handleBlur}
                    name="productTitle"
                    value={values.productTitle}
                    handleChange={handleChange}
                  />
                  {errors.productTitle && touched.productTitle && (
                    <div className="form-error">{errors.productTitle}</div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} className="anime">
                <div className="field">
                  <Label title={proAddConst.productDes} />
                  <RichTextBox
                    value={values.productDescri}
                    onBlur={handleBlur}
                    changeTxt={(val) => setFieldValue("productDescri", val)}
                    className={
                      errors.productDescri && touched.productDescri
                        ? "empty"
                        : ""
                    }
                  />
                </div>
              </Col>
            </Row>
            <h2>{proAddConst.features}</h2>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                <div className="field">
                  <Label title={proAddConst.title} />
                  <Input value={title} handleChange={this.handleTitle} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className="anime">
                <div className="compLogoDiv">
                  <Label title={proAddConst.icon} />
                  {this.fileUpload(iconByte, "icon")}
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className="addbtn">
                <div className="addButton pointer" onClick={this.addIcon}>
                  <PlusOutlined />
                </div>
              </Col>
            </Row>
            <div className="imagesDiv">{this.imagesUI()}</div>
            <div className="btnDiv">
              <div className="nextDiv">
                <Button onClick={() => this.props.history.push("/products")}>
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
    );
  }
}
export default withRouter(ProAddEditDetail);
