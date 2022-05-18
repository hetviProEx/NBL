import React, { Component } from "react";
import * as Yup from "yup";
import { Row, Col, Modal } from "antd";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { LeadsConst, TabsConst, TopRowData } from "../constant";
import { getAuthUserID } from "modules/helper";
import { ButtonConst, FormValidation, RemoveConst } from "App/AppConstant";
import {
  getProspect,
  saveProspect,
  deleteProspect,
  getLeads,
  getDemo,
} from "redux/crm/action";
import {
  DivTabUI,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  FormDrawer,
  DatePicker,
} from "components/Form";

var userID = getAuthUserID();
var allowGeoRecall = true;
var countLocationAttempts = 0;
const { confirm } = Modal;
const ValidationSchema = Yup.object().shape({
  customerName: Yup.string()
    .trim()
    .min(3, FormValidation.nameMin)
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  mobileNo: Yup.string()
    .trim()
    .matches(/^[0-9\-+]{8,14}$/, FormValidation.mobileInvalid)
    .required(" ")
    .min(10, FormValidation.mobileInvalid)
    .max(15, FormValidation.mobileInvalid),
  emailId: Yup.string().trim().email(FormValidation.emailInvalid),
});
class Prospect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      current: 1,
      visible: false,
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
      initValues: {
        prospectId: 0,
        companyName: "",
        customerName: "",
        mobileNo: "",
        emailId: "",
        proSource: "",
        prosDate: "",
        address: "",
        redirect: false,
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      userID = userID ? userID : getAuthUserID();
      paramet.parameter = userID.toString();
      await this.props.getProspect(paramet);
      // paramet.parameter = " and l.user_id=" + userID;
      // paramet.sortColumn = "leadsid desc";
      await this.props.getLeads(paramet);
      // paramet.parameter = " and d.userid=" + userID;
      // paramet.sortColumn = "demoid desc";
      await this.props.getDemo(paramet);
      // paramet.parameter = " and p.user_id=" + userID;
      // paramet.sortColumn = "prospect_id desc";
      this.getLocation();
    } catch (error) {
      console.log(error);
    }
  }
  getLocation = () => {
    // console.log("getLocation was called");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.positionError
      );
    } else {
      console.log("Geolocation is not supported by this device");
    }
  };
  positionError = () => {
    console.log(
      "Geolocation is not enabled. Please enable to use this feature"
    );
    if (allowGeoRecall && countLocationAttempts < 5) {
      countLocationAttempts += 1;
      this.getLocation();
    }
  };
  showPosition = () => {
    console.log("posititon accepted");
    allowGeoRecall = false;
  };
  report = (state) => {
    console.log("Permission " + state);
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getProspect(paramet);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  searchChange = async (e) => {
    try {
      const { paramet } = this.state;
      paramet.search = e.target.value.trim();
      paramet.page = "1";
      this.setState({ current: 1 });
      await this.props.getProspect(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = (id) => {
    try {
      confirm({
        title: RemoveConst.header + LeadsConst.rec,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          LeadsConst.rec.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("crm-form"),
        onOk: () => {
          this.removeCol(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeCol = async (id) => {
    try {
      const { paramet } = this.state;
      await this.props.deleteProspect(id);
      await this.props.getProspect(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  showModal = (id) => {
    try {
      const { prospect } = this.props;
      let vdata = prospect.find((x) => x.id === id);
      localStorage.setItem("viewProspect", JSON.stringify(vdata));
      this.props.history.push("/leads/" + window.btoa(id));
      // this.props.show(vdata, "Prospect");
    } catch (error) {
      console.log(error);
    }
  };
  callEdit = (id) => {
    try {
      const { prospect } = this.props;
      let data = prospect.find((x) => x.id === id);
      let Contact = data?.mobileNo?.split(",");
      if (data && data.id) {
        var editData = {
          prospectId: data.id,
          customerName: data.customerName,
          companyName: data.companyName ? data.companyName : "",
          // mobileNo: data.mobileNo,
          // emailId: data.emailId,
          mobileNo: Contact[0],
          emailId: Contact[1] ? Contact[1].trim() : "",
          address: data.address,
          proSource: data.source,
          prosDate: data.prospectDate,
        };
        this.setState({ initValues: editData });
        this.toggleDrawer();
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { paramet } = this.state;
      const { todaySDate } = this.props;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let date = values.prosDate === "" ? todaySDate : values.prosDate;
      let sendData = {
        id: values.prospectId,
        customerName: values.customerName.trim(),
        company: values.companyName.trim(),
        mobileNo: values.mobileNo.toString(),
        emailId: values.emailId.trim(),
        address: values.address.trim(),
        source: values.proSource.trim(),
        prospectDate: date,
        userId: userID,
        createdBy: userID,
      };
      await this.props.saveProspect({ data: sendData, msg: true });
      await this.props.getProspect(paramet);
      values.redirect && this.creatLeads(0);
      resetForm();
      this.toggleDrawer(true);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  toggleDrawer = (val) => {
    try {
      const { visible } = this.state;
      this.setState({ visible: !visible });
      if (val) this.setDefault();
    } catch (error) {
      console.log(error);
    }
  };
  setDefault = () => {
    let initValues = {
      prospectId: 0,
      customerName: "",
      companyName: "",
      mobileNo: "",
      emailId: "",
      address: "",
      proSource: "",
      prosDate: "",
    };
    this.setState({ initValues, redirect: false });
  };
  creatLeads = (id) => {
    try {
      const { prospect, goToDirect, isSaved } = this.props;
      let vdata =
        id !== 0 ? prospect.find((x) => x.id === id) : isSaved && prospect[0];
      vdata && goToDirect(1, vdata);
    } catch (error) {
      console.log(error);
    }
  };
  callSetPros = (id, val, type) => {
    try {
      const { paramet } = this.state;
      this.props.callSetLeads(id, val, type, paramet);
    } catch (error) {
      console.log(error);
    }
  };
  topRowUI = () => {
    try {
      const { prospect, leads, demos } = this.props;
      let totalProspect = prospect?.length > 0 ? prospect[0].totalLenght : 0;
      let totalActive = prospect?.length > 0 ? prospect[0].totalActive : 0;
      let totalLead = leads?.length > 0 ? leads[0].totalLenght : 0;
      let totalMeeting = demos?.length > 0 ? demos[0].totalLenght : 0;
      return TopRowData?.map((a, i) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={6} key={i} className="anime">
          <div className="cardDiv">
            <div className="report-box">
              <div className="box">
                <h1 className="mainTxt">
                  {i === 0
                    ? totalProspect
                    : i === 2
                    ? totalLead
                    : i === 3
                    ? totalMeeting
                    : totalActive}
                </h1>
                <h3 className="name">{a.name}</h3>
              </div>
            </div>
          </div>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initValues, btnDisable, current, visible } = this.state;
    const { prospect, showTranModal, count, countHandle } = this.props;
    let prospectLength = prospect?.length > 0 ? prospect[0].totalLenght : 0;
    return (
      <Row gutter={20} id={"form-Darwer"}>
        {visible && (
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
              setFieldValue,
            }) => (
              <FormDrawer
                title={
                  <div className="headDiv">
                    <h3 className="hrob">{`${
                      initValues.prospectId === 0
                        ? LeadsConst.addNew
                        : ButtonConst.edit + " "
                    }${LeadsConst.prospect}`}</h3>
                  </div>
                }
                visible={visible}
                onClose={() => this.toggleDrawer(true)}
              >
                <Form onSubmit={handleSubmit} className="formDiv anime">
                  <div className="field">
                    <Label
                      title={LeadsConst.custnm}
                      className={
                        errors.customerName && touched.customerName
                          ? "empty"
                          : ""
                      }
                    />
                    <Input
                      placeholder={LeadsConst.name}
                      className={
                        errors.customerName && touched.customerName
                          ? "empty"
                          : ""
                      }
                      onBlur={handleBlur}
                      name="customerName"
                      value={values.customerName}
                      handleChange={handleChange}
                      tabIndex="1"
                    />
                    {errors.customerName && touched.customerName && (
                      <div className="form-error">{errors.customerName}</div>
                    )}
                  </div>
                  <div className="field">
                    <Label title={LeadsConst.compnm} />
                    <Input
                      placeholder={LeadsConst.compnm}
                      onBlur={handleBlur}
                      name="companyName"
                      value={values.companyName}
                      handleChange={handleChange}
                      tabIndex="2"
                    />
                  </div>
                  <Row gutter={20} className="fieldClass">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div className="field">
                        <Label
                          title={LeadsConst.mobile}
                          className={
                            errors.mobileNo && touched.mobileNo ? "empty" : ""
                          }
                        />
                        <Input
                          placeholder={LeadsConst.number}
                          className={
                            errors.mobileNo && touched.mobileNo ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          name="mobileNo"
                          value={values.mobileNo}
                          handleChange={handleChange}
                          tabIndex="3"
                          // type="number"
                        />
                        {errors.mobileNo && touched.mobileNo && (
                          <div className="form-error">{errors.mobileNo}</div>
                        )}
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div className="field">
                        <Label title={LeadsConst.Source} />
                        <Input
                          placeholder={LeadsConst.Source}
                          onBlur={handleBlur}
                          name="proSource"
                          value={values.proSource}
                          handleChange={handleChange}
                          tabIndex="4"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="field">
                    <Label
                      title={LeadsConst.emid}
                      className={
                        errors.emailId && touched.emailId ? "empty" : ""
                      }
                    />
                    <Input
                      placeholder={LeadsConst.email}
                      className={
                        errors.emailId && touched.emailId ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="emailId"
                      value={values.emailId}
                      handleChange={handleChange}
                      tabIndex="5"
                    />
                    {errors.emailId && touched.emailId && (
                      <div className="form-error">{errors.emailId}</div>
                    )}
                  </div>
                  <div className="field">
                    <Label title={LeadsConst.ProsDate} />
                    <DatePicker
                      disableDate={true}
                      disNext
                      name="prosDate"
                      value={values.prosDate}
                      onBlur={handleBlur}
                      handleChange={(data) => setFieldValue("prosDate", data)}
                    />
                  </div>
                  <div className="field">
                    <Label title={LeadsConst.address} />
                    <Input
                      placeholder={LeadsConst.address}
                      row={5}
                      name="address"
                      value={values.address}
                      handleChange={handleChange}
                      tabIndex="7"
                      max={700}
                    />
                  </div>
                  <div className="btnDiv">
                    {values.prospectId === 0 && (
                      <Button
                        disabled={btnDisable}
                        onClick={() => {
                          setFieldValue("redirect", true);
                          handleSubmit();
                        }}
                      >
                        {LeadsConst.craLead}
                      </Button>
                    )}
                    <Button
                      disabled={btnDisable}
                      onClick={() => {
                        setFieldValue("redirect", false);
                        handleSubmit();
                      }}
                    >
                      {LeadsConst.save}
                    </Button>
                  </div>
                </Form>
              </FormDrawer>
            )}
          </Formik>
        )}
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="anime">
          <div className="coverDiv">
            <div className="headerDiv">
              <DivTabUI
                count={count}
                countHandle={countHandle}
                TabsConst={TabsConst}
              />
              <div className="actionDiv">
                <div className="addButton pointer" onClick={showTranModal}>
                  <UploadOutlined />
                </div>
                <div
                  className="addButton pointer"
                  onClick={() => this.toggleDrawer(true)}
                >
                  <PlusOutlined />
                </div>
              </div>
            </div>
            <div className="contentDiv">
                <div className="search_div">
                  <Input
                    placeholder={LeadsConst.search}
                    suffix={<SearchOutlined />}
                    onChange={this.searchChange}
                  />
                </div>
              <Row className="top-row" gutter={24}>
                {this.topRowUI()}
              </Row>
              <div className="tableDiv">
                <Table
                  current={current}
                  data={prospect}
                  type={LeadsConst.prospect}
                  useractionUI={true}
                  DoubleClick={true}
                  deleteRecord={this.deleteCol}
                  showModal={this.showModal}
                  editRecord={this.callEdit}
                  creatDirect={this.creatLeads}
                  setLeads={this.callSetPros}
                />
                {prospectLength > 10 && (
                  <div className="pagiDiv">
                    <Pagination
                      onChange={this.handlePagination}
                      current={current}
                      total={prospectLength}
                      pageSize={10}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  prospect: state.crm.prospect,
  leads: state.crm.leads,
  demos: state.crm.demo,
  isSaved: state.crm.isSaved,
});
const mapDispatchToProps = (dispatch) => ({
  getProspect: (payload) => dispatch(getProspect(payload)),
  saveProspect: (payload) => dispatch(saveProspect(payload)),
  deleteProspect: (id) => dispatch(deleteProspect(id)),
  getLeads: (payload) => dispatch(getLeads(payload)),
  getDemo: (payload) => dispatch(getDemo(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Prospect)
);
