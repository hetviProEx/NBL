import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { Row, Col, Modal } from "antd";
import { withRouter } from "react-router-dom";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { getAuthUserID } from "modules/helper";
import { LeadsConst, contectNames, TabsConst } from "../constant";
import { ButtonConst, RemoveConst } from "App/AppConstant";
import {
  getProduct,
  saveDemo,
  getDemo,
  deleteDemo,
  getLeadCustomer,
} from "redux/crm/action";
import {
  DivTabUI,
  Label,
  Input,
  Select,
  Switch,
  Button,
  Table,
  Pagination,
  DatePicker,
  FormDrawer,
} from "components/Form";
const { confirm } = Modal;
var userID = getAuthUserID();
const ValidationSchema = Yup.object().shape({
  custnmDemo: Yup.string().trim().required(" "),
  product: Yup.string().trim().required(" "),
});
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDis: false,
      btnDisable: false,
      current: 1,
      demo: false,
      sale: false,
      show: false,
      newCustromers: [],
      newProducts: [],
      visible: false,
      startDaErr: false,
      endDaErr: false,
      stDate: "",
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
      initValues: {
        demoId: 0,
        custnmDemo: "",
        custnmDemoId: 0,
        product: "",
        productId: 0,
        startDate: "",
        endDate: "",
        contact: "",
        remarks: "",
        meetingDate: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      const { directData } = this.props;
      userID = userID ? userID : getAuthUserID();
      paramet.parameter = userID.toString();
      await this.props.getLeadCustomer(userID);
      await this.props.getProduct();
      await this.props.getDemo(paramet);
      if (directData?.customerId) {
        this.setdirectData(directData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { leadCustomers, products } = this.props;
      if (leadCustomers !== prevProps.leadCustomers) {
        let newCustomer = [];
        leadCustomers?.forEach((a) => {
          newCustomer.push({ id: parseInt(a.value), value: a.text});
        });
        this.setState({ newCustromers: newCustomer });
      }
      if (products !== prevProps.products) {
        let newProduct = [];
        products?.forEach((a) => {
          newProduct.push({ id: a.productId, value: a.productName });
        });
        this.setState({ newProducts: newProduct });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setdirectData = (data) => {
    try {
      const { newCustromers, newProducts, initValues } = this.state;
      const { goToDirect } = this.props;
      let custoData = newCustromers.find((x) => x.id === data.customerId);
      let proData = newProducts.find((x) => x.id === data.productId);
      if (custoData && proData) {
        initValues.custnmDemoId = custoData.id;
        initValues.custnmDemo = custoData.value;
        initValues.product = proData.value;
        initValues.productId = proData.id;
      }
      goToDirect(2, {});
      this.setState({ selectDis: true, visible: true, initValues });
      console.log(custoData);
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (dis, val, name, setFieldValue, error) => {
    try {
      const { newCustromers, newProducts } = this.state;
      return (
        <Select
          data={
            name === "custnmDemo"
              ? newCustromers
              : name === "contact"
              ? contectNames
              : newProducts
          }
          disable={dis}
          value={val}
          defaultValue={val}
          withID={true}
          selectClass={error ? "empty" : ""}
          onChange={(value, data) => {
            setFieldValue(name, value);
            if (name === "custnmDemo") setFieldValue("custnmDemoId", data.id);
            else if (name === "product") setFieldValue("productId", data.id);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = (val, setFieldValue) => {
    try {
      const { demo, sale } = this.state;
      val === "demo" && setFieldValue("startDate", "");
      val === "demo" && setFieldValue("endDate", "");
      this.setState({
        demo: val === "demo" ? !demo : demo,
        sale: val === "sale" ? !sale : sale,
      });
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
      await this.props.getDemo(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getDemo(paramet);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  showModal = (id) => {
    try {
      const { demos } = this.props;
      let vdata = demos.find((x) => x.id === id);
      this.props.show(vdata, LeadsConst.meeting);
    } catch (error) {
      console.log(error);
    }
  };
  showModal = (id) => this.callEdit(id, true);
  callEdit = (id, show) => {
    try {
      const { demos } = this.props;
      let data = demos.find((x) => x.id === id);
      if (data && data.id) {
        var editData = {
          demoId: data.demoId,
          custnmDemo: data.customerName,
          custnmDemoId: data.customerId,
          product: data.productName,
          productId: data.productId,
          startDate: data.startdate || data.startDate,
          endDate: data.enddate || data.endDate,
          meetingDate: data.meetingDate,
          remarks: data.remarks ? data.remarks : "",
          contact: data.contact,
        };
        this.setState({
          initValues: editData,
          demo: data.demo === 1,
          sale: data.sale === 1,
          show: show ? show : false,
        });
        this.toggleDrawer();
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { demo, sale, paramet } = this.state;
      const { todaySDate } = this.props;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let date = values.meetingDate === "" ? todaySDate : values.meetingDate;
      let flag = false;
      if (demo && values.startDate === "") {
        flag = true;
        this.setState({ startDaErr: true });
      }
      if (demo && values.endDate === "") {
        flag = true;
        this.setState({ endDaErr: true });
      }
      if (!flag && values.startDate > values.endDate) {
        flag = true;
        this.setState({ endDaErr: true });
      }
      if (flag === false) {
        let sendData = {
          demoId: values.demoId,
          customerId: values.custnmDemoId,
          productId: values.productId,
          demo: demo ? 1 : 0,
          sale: sale ? 1 : 0,
          startdate: demo && values.startDate ? values.startDate : "undefined",
          enddate: demo && values.endDate ? values.endDate : "undefined",
          contact: values.contact,
          meetingdate: date,
          remarks: values.remarks.trim(),
          userId: userID,
          createdBy: userID,
        };
        await this.props.saveDemo(sendData);
        await this.props.getDemo(paramet);
        resetForm();
        this.setState({ demo: false, sale: false });
        this.toggleDrawer(true);
      }
      setSubmitting(false);
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
      await this.props.deleteDemo(id);
      await this.props.getDemo(paramet);
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
      demoId: 0,
      custnmDemo: "",
      custnmDemoId: 0,
      product: "",
      productId: 0,
      startDate: "",
      endDate: "",
      contact: "",
      remarks: "",
      meetingDate: "",
    };
    this.setState({
      initValues,
      demo: false,
      sale: false,
      show: false,
      selectDis: false,
    });
  };
  callSetMetting = (id, val, type) => {
    try {
      const { paramet } = this.state;
      this.props.callSetLeads(id, val, type, paramet);
    } catch (error) {
      console.log(error);
    }
  };
  setStartEndDate = (name, value, setFieldValue) => {
    try {
      const { stDate } = this.state;
      if (value !== "" && name === "startDate") {
        this.setState({ startDaErr: false, stDate: value });
      } else if (value !== "" && name === "endDate" && stDate <= value) {
        this.setState({ endDaErr: false });
      } else if (value !== "" && name === "endDate" && value <= stDate) {
        this.setState({ endDaErr: true });
      }
      setFieldValue(name, value);
    } catch (error) {
      console.log(error);
    }
  };
  creatSale = (id) => {
    try {
      const { demos } = this.props;
      let vdata = demos.find((x) => x.demoId === id);
      localStorage.setItem("fromMeeting", JSON.stringify(vdata));
      this.props.history.push(`/sales/new`);
    } catch (error) {
      console.log(error);
    }
  };
  setShow = () => this.setState({ show: false });
  render() {
    const {
      initValues,
      btnDisable,
      current,
      demo,
      sale,
      visible,
      startDaErr,
      endDaErr,
      show,
      selectDis,
    } = this.state;
    const { demos, count, countHandle } = this.props;
    let demosLength = demos?.length > 0 ? demos[0].totalLenght : 0;
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
              handleBlur,
              setFieldValue,
              handleSubmit,
              handleChange,
            }) => (
              <FormDrawer
                title={
                  <div className="headDiv">
                    <h3 className="hrob">{`${
                      show
                        ? ""
                        : initValues.demoId === 0
                        ? LeadsConst.addNew
                        : ButtonConst.edit + " "
                    }${LeadsConst.meeting}`}</h3>
                  </div>
                }
                visible={visible}
                onClose={() => this.toggleDrawer(true)}
              >
                <Form onSubmit={handleSubmit} className="formDiv">
                  <div className="anime">
                    <div className="field highZ">
                      <Label
                        title={LeadsConst.leadnm}
                        className={
                          errors.custnmDemo &&
                          touched.custnmDemo &&
                          values.custnmDemo === ""
                            ? "empty"
                            : ""
                        }
                      />
                      {show ? (
                        <div>{values.custnmDemo}</div>
                      ) : (
                        <>
                          {values.custnmDemo === "" &&
                            this.selectUI(
                              selectDis,
                              "",
                              "custnmDemo",
                              setFieldValue,
                              errors.custnmDemo && touched.custnmDemo
                            )}
                          {values.custnmDemo !== "" &&
                            this.selectUI(
                              selectDis,
                              values.custnmDemo,
                              "custnmDemo",
                              setFieldValue
                            )}
                        </>
                      )}
                    </div>
                    <div className="field highZ2">
                      <Label
                        title={LeadsConst.product}
                        className={
                          errors.product &&
                          touched.product &&
                          values.product === ""
                            ? "empty"
                            : ""
                        }
                      />
                      {show ? (
                        <div>{values.product}</div>
                      ) : (
                        <>
                          {values.product === "" &&
                            this.selectUI(
                              selectDis,
                              "",
                              "product",
                              setFieldValue,
                              errors.product && touched.product
                            )}
                          {values.product !== "" &&
                            this.selectUI(
                              selectDis,
                              values.product,
                              "product",
                              setFieldValue
                            )}
                        </>
                      )}{" "}
                    </div>
                    <div className="field highZ3">
                      <Label title={LeadsConst.contact} />
                      {show ? (
                        <div>{values.contact}</div>
                      ) : (
                        <>
                          {values.contact === "" &&
                            this.selectUI(false, "", "contact", setFieldValue)}
                          {values.contact !== "" &&
                            this.selectUI(
                              false,
                              values.contact,
                              "contact",
                              setFieldValue
                            )}
                        </>
                      )}
                    </div>
                    <div className="field">
                      <Label title={"Meeting Date"} />
                      {show ? (
                        <div>
                          {values.meetingDate !== "0001-01-01T00:00:00"
                            ? values.meetingDate?.split("T")[0]
                            : "---"}
                          {/* {values.meetingDate} */}
                        </div>
                      ) : (
                        <DatePicker
                          disableDate={true}
                          disNext
                          name="meetingDate"
                          value={values.meetingDate}
                          onBlur={handleBlur}
                          handleChange={(data) =>
                            setFieldValue("meetingDate", data)
                          }
                        />
                      )}
                    </div>
                    <div className="field">
                      <Label title={LeadsConst.rem} />
                      {show ? (
                        <div>{values.rem}</div>
                      ) : (
                        <Input
                          placeholder={LeadsConst.rem}
                          row={5}
                          name="remarks"
                          value={values.remarks}
                          handleChange={handleChange}
                          max={700}
                        />
                      )}
                    </div>
                    <Row gutter={20} className="fieldClass">
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="field">
                          <Label title={LeadsConst.demo} />
                          {show ? (
                            <div>{demo ? "Yes" : "No"}</div>
                          ) : (
                            <Switch
                              checked={demo}
                              handleChange={() =>
                                this.switchChange("demo", setFieldValue)
                              }
                            />
                          )}
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="field">
                          <Label title={LeadsConst.sale} />
                          {show ? (
                            <div>{sale ? "Yes" : "No"}</div>
                          ) : (
                            <Switch
                              checked={sale}
                              handleChange={() => this.switchChange("sale")}
                            />
                          )}
                        </div>
                      </Col>
                      {demo && (
                        <>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className="field highZ3">
                              <Label
                                title={LeadsConst.startDate}
                                className={startDaErr ? "empty" : ""}
                              />
                              {show ? (
                                <div>
                                  {values.startDate !== "0001-01-01T00:00:00"
                                    ? values.startDate?.split("T")[0]
                                    : "---"}
                                </div>
                              ) : (
                                <DatePicker
                                  disableDate={true}
                                  name="startDate"
                                  value={values.startDate}
                                  onBlur={handleBlur}
                                  handleChange={(data) =>
                                    this.setStartEndDate(
                                      "startDate",
                                      data,
                                      setFieldValue
                                    )
                                  }
                                  className={startDaErr ? "empty" : ""}
                                />
                              )}
                            </div>
                          </Col>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className="field highZ4">
                              <Label
                                title={LeadsConst.endDate}
                                className={endDaErr ? "empty" : ""}
                              />
                              {show ? (
                                <div>
                                  {values.endDate !== "0001-01-01T00:00:00"
                                    ? values.endDate?.split("T")[0]
                                    : "---"}
                                </div>
                              ) : (
                                <DatePicker
                                  disableDate={true}
                                  name="endDate"
                                  value={values.endDate}
                                  onBlur={handleBlur}
                                  handleChange={(data) =>
                                    this.setStartEndDate(
                                      "endDate",
                                      data,
                                      setFieldValue
                                    )
                                  }
                                  className={endDaErr ? "empty" : ""}
                                />
                              )}
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                    <div className="btnDiv">
                      {!show && (
                        <Button type="submit" disabled={btnDisable}>
                          {LeadsConst.save}
                        </Button>
                      )}
                    </div>
                  </div>
                </Form>
                {show && (
                  <Button disabled={btnDisable} onClick={() => this.setShow()}>
                    {ButtonConst.edit}
                  </Button>
                )}
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
              <div
                className="addButton pointer"
                onClick={() => this.toggleDrawer(true)}
              >
                <PlusOutlined />
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
              <div className="tableDiv">
                <Table
                  current={current}
                  data={demos}
                  type={LeadsConst.meet}
                  useractionUI={true}
                  DoubleClick={true}
                  deleteRecord={this.deleteCol}
                  creatDirect={this.creatSale}
                  showModal={this.showModal}
                  editRecord={this.callEdit}
                  setLeads={this.callSetMetting}
                />
                {demosLength > 10 && (
                  <div className="pagiDiv">
                    <Pagination
                      onChange={this.handlePagination}
                      current={current}
                      total={demosLength}
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
  leadCustomers: state.crm.leadCustomers,
  products: state.crm.products,
  demos: state.crm.demo,
});
const mapDispatchToProps = (dispatch) => ({
  getLeadCustomer: (payload) => dispatch(getLeadCustomer(payload)),
  getProduct: (payload) => dispatch(getProduct(payload)),
  saveDemo: (payload) => dispatch(saveDemo(payload)),
  getDemo: (payload) => dispatch(getDemo(payload)),
  deleteDemo: (id) => dispatch(deleteDemo(id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Demo));
