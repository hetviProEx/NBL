import React, { Component } from "react";
import * as Yup from "yup";
import { Row, Col, Modal } from "antd";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { LeadsConst, TabsConst } from "../constant";
import { ButtonConst, RemoveConst } from "App/AppConstant";
import { getAuthUserID } from "modules/helper";
import {
  DivTabUI,
  Label,
  Input,
  Select,
  Button,
  Table,
  Pagination,
  FormDrawer,
  DatePicker,
} from "components/Form";
import {
  saveLeads,
  getLeads,
  getCustomer,
  getleadType,
  getProduct,
  deleteLead,
} from "redux/crm/action";
const { confirm } = Modal;
var userID = getAuthUserID();
const ValidationSchema = Yup.object().shape({
  customer: Yup.string().trim().required(" "),
  product: Yup.string().trim().required(" "),
  lead: Yup.string().trim().required(" "),
});
class Lead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      show: false,
      current: 1,
      newCustromers: [],
      newLeadTypes: [],
      newProducts: [],
      visible: false,
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
      initValues: {
        leadId: 0,
        customer: "",
        customerId: 0,
        companyName: "",
        lead: "",
        leadTypeId: 0,
        product: "",
        productId: 0,
        remarks: "",
        leadDate: "",
        redirect: false,
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      const { directData } = this.props;
      userID = userID ? userID : getAuthUserID();
      paramet.parameter = userID.toString();
      await this.props.getLeads(paramet);
      await this.props.getCustomer(userID);
      await this.props.getleadType();
      await this.props.getProduct();
      if (directData?.id) {
        this.setdirectData(directData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { customer, leadType, products } = this.props;
      if (customer !== prevProps.customer) {
        let newCustomer = [];
        customer?.forEach((a) => {
          newCustomer.push({ id: a.customerId, value: a.customerName });
        });
        this.setState({ newCustromers: newCustomer });
      }
      if (leadType !== prevProps.leadType) {
        let newLeadType = [];
        leadType?.forEach((a) => {
          newLeadType.push({ id: a.leadId, value: a.leadName });
        });
        this.setState({ newLeadTypes: newLeadType });
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
      const { customer, goToDirect } = this.props;
      const { initValues } = this.state;
      let setData = customer.find((x) => x.customerId === data.id);
      initValues.customer = setData.customerName;
      initValues.customerId = setData.customerId;
      initValues.companyName = setData.company;
      this.setState({ visible: true, initValues });
      goToDirect(1, {});
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, name, setFieldValue, error) => {
    try {
      const { customer } = this.props;
      const { newCustromers, newLeadTypes, newProducts } = this.state;
      return (
        <Select
          data={
            name === "customer"
              ? newCustromers
              : name === "lead"
              ? newLeadTypes
              : newProducts
          }
          value={val}
          defaultValue={val}
          withID={true}
          selectClass={error ? "empty" : ""}
          onChange={(value, data) => {
            setFieldValue(name, value);
            if (name === "customer") {
              setFieldValue("customerId", data.id);
              let compData = customer.find((x) => x.customerId === data.id);
              setFieldValue(
                "companyName",
                compData.company ? compData.company : ""
              );
            } else if (name === "lead") setFieldValue("leadTypeId", data.id);
            else if (name === "product") setFieldValue("productId", data.id);
          }}
        />
      );
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
      await this.props.getLeads(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getLeads(paramet);
      this.setState({ current: val });
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
      await this.props.deleteLead(id);
      await this.props.getLeads(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  showModal = (id) => this.callEdit(id, true);
  callEdit = (id, show) => {
    try {
      const { leads } = this.props;
      let data = leads.find((x) => x.id === id);
      if (data && data.id) {
        var editData = {
          customer: data.customerName,
          customerId: data.customerId,
          companyName: data.company,
          lead: data.leadName,
          leadTypeId: data.leadNameId,
          product: data.products,
          productId: data.productId,
          remarks: data.remarks,
          leadId: data.leadsId,
          leadDate: data.leadDate,
        };
        this.setState({ initValues: editData, show: show ? show : false });
        this.toggleDrawer();
      }
    } catch (error) {
      console.log(error);
    }
  };
  setShow = () => this.setState({ show: false });
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { paramet, show } = this.state;
      if (!show) {
        const { todaySDate } = this.props;
        this.setState({ btnDisable: true });
        setTimeout(() => {
          this.setState({ btnDisable: false });
        }, 4500);
        let date = values.leadDate !== "" ? values.leadDate: todaySDate ;
        let sendData = {
          leadId: values.leadId,
          customer: values.customerId,
          company: values.companyName.trim(),
          lead: values.leadTypeId,
          product: values.product,
          productId: values.productId,
          remarks: values.remarks.trim(),
          leadDate: date,
          userId: userID,
          createdBy: userID,
        };
        await this.props.saveLeads(sendData);
        await this.props.getLeads(paramet);
        values.redirect && this.creatDemo(0);
        resetForm();
        this.toggleDrawer(true);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  setDefault = () => {
    let initValues = {
      leadId: 0,
      customer: "",
      customerId: 0,
      companyName: "",
      lead: "",
      leadTypeId: 0,
      product: "",
      remarks: "",
      leadDate: "",
    };
    this.setState({ initValues, show: false, redirect: false });
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
  creatDemo = (id) => {
    try {
      const { leads, goToDirect , isSaved} = this.props;
      let vdata = id !== 0 ? leads.find((x) => x.id === id) :isSaved&& leads[0];
      vdata&&goToDirect(2, vdata);
    } catch (error) {
      console.log(error);
    }
  };
  callSetLead = (id, val, type) =>
    this.props.callSetLeads(id, val, type, this.state.paramet);
  render() {
    const { initValues, btnDisable, current, visible, show } = this.state;
    const { leads, count, countHandle } = this.props;
    //let leadsLength = leads?.length > 0 ? leads[0].totalLenght : 0;
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
              handleBlur,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => (
              <FormDrawer
                title={
                  <div className="headDiv">
                    <h3 className="hrob">{`${
                      show
                        ? ""
                        : initValues.leadId === 0
                        ? LeadsConst.addNew
                        : ButtonConst.edit + " "
                    }${LeadsConst.leads}`}</h3>
                  </div>
                }
                visible={visible}
                onClose={() => this.toggleDrawer(true)}
              >
                <Form onSubmit={handleSubmit} className="formDiv anime">
                  <div className="field">
                    <Label
                      title={LeadsConst.leadnm}
                      className={
                        errors.customer &&
                        touched.customer &&
                        values.customer === ""
                          ? "empty"
                          : ""
                      }
                    />
                    {show ? (
                      <div>{values.customer}</div>
                    ) : (
                      <>
                        {values.customer === "" &&
                          this.selectUI(
                            "",
                            "customer",
                            setFieldValue,
                            errors.customer && touched.customer
                          )}
                        {values.customer !== "" &&
                          this.selectUI(
                            values.customer,
                            "customer",
                            setFieldValue
                          )}
                      </>
                    )}
                  </div>
                  <div className="field">
                    <Label title={LeadsConst.compnm} />
                    {show ? (
                      <div>{values.companyName}</div>
                    ) : (
                      <Input disabled={true} value={values.companyName} />
                    )}
                  </div>
                  <div className="field">
                    <Label
                      title={LeadsConst.leadType}
                      className={
                        errors.lead && touched.lead && values.lead === ""
                          ? "empty"
                          : ""
                      }
                    />
                    {show ? (
                      <div>{values.lead}</div>
                    ) : (
                      <>
                        {values.lead === "" &&
                          this.selectUI(
                            "",
                            "lead",
                            setFieldValue,
                            errors.lead && touched.lead
                          )}
                        {values.lead !== "" &&
                          this.selectUI(values.lead, "lead", setFieldValue)}
                      </>
                    )}
                  </div>
                  <div className="field">
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
                            "",
                            "product",
                            setFieldValue,
                            errors.product && touched.product
                          )}
                        {values.product !== "" &&
                          this.selectUI(
                            values.product,
                            "product",
                            setFieldValue
                          )}
                      </>
                    )}
                  </div>
                  <div className="field">
                    <Label title={"Lead Date"} />
                    {show ? (
                      <div>
                        {values.leadDate !== "0001-01-01T00:00:00"?
                         values.leadDate?.split("T")[0]:"---"}
                        </div>  
                    ) : (
                      <DatePicker
                        disableDate={true}
                        disNext
                        name="leadDate"
                        value={values.leadDate}
                        onBlur={handleBlur}
                        handleChange={(data) => setFieldValue("leadDate", data)}
                      />
                    )}
                  </div>
                  <div className="field">
                    <Label title={LeadsConst.rem} />
                    {show ? (
                      <div>{values.remarks}</div>
                    ) : (
                      <Input
                        row={5}
                        name="remarks"
                        value={values.remarks}
                        handleChange={handleChange}
                        max={700}
                      />
                    )}
                  </div>
                  <div className="btnDiv">
                    {!show && (
                      <>
                        {values.leadId === 0 && (
                          <Button
                            disabled={btnDisable}
                            onClick={() => {
                              setFieldValue("redirect", true);
                              handleSubmit();
                            }}
                          >
                            {LeadsConst.craMeeting}
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
                      </>
                    )}
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
                  data={leads}
                  type={LeadsConst.leads}
                  useractionUI={true}
                  DoubleClick={true}
                  deleteRecord={this.deleteCol}
                  showModal={this.showModal}
                  editRecord={this.callEdit}
                  creatDirect={this.creatDemo}
                  setLeads={this.callSetLead}
                />
                <div className="pagiDiv">
                  {leads?.length > 10 && (
                    <Pagination
                      onChange={this.handlePagination}
                      current={current}
                      total={leads?.length}
                      pageSize={10}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  customer: state.crm.customer,
  leadType: state.crm.leadType,
  products: state.crm.products,
  leads: state.crm.leads,
  isSaved: state.crm.isSaved,
});
const mapDispatchToProps = (dispatch) => ({
  saveLeads: (payload) => dispatch(saveLeads(payload)),
  getLeads: (payload) => dispatch(getLeads(payload)),
  getCustomer: (payload) => dispatch(getCustomer(payload)),
  getleadType: (payload) => dispatch(getleadType(payload)),
  getProduct: (payload) => dispatch(getProduct(payload)),
  deleteLead: (id) => dispatch(deleteLead(id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lead));
