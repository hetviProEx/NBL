import React, { Component } from "react";
import * as Yup from "yup";
import { Spin, Modal, Row, Col } from "antd";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { PromoStyle } from "./style";
import { PromoConst, typeData } from "./constant";
import { ButtonConst } from "App/AppConstant";
import { getAuthUserID } from "modules/helper";
import { RemoveConst } from "App/AppConstant";
import {
  Menu,
  Header,
  Label,
  Input,
  Select,
  DatePicker,
  Button,
  FormDrawer,
  Table,
  ViewModal,
  Pagination,
  RoundSwitch,
} from "components/Form";
import { savePromo, getPromo, deletePromo } from "redux/promo/action";
const { confirm } = Modal;
var userID = getAuthUserID();

const ValidationSchema = Yup.object().shape({
  code: Yup.string().trim().required(" "),
  promoValue: Yup.number().min(1, "Must be more than 0").required(" "),
});
class PromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      visible: false,
      show: false,
      checked: false,
      current: 1,
      viewData: {},
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
      initValues: {
        id: 0,
        code: "",
        promoValue: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      userID = userID ? userID : getAuthUserID();
      paramet.parameter = userID.toString();
      await this.props.getPromo(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  searchChange = async (e) => {
    try {
      let parameter = this.state.paramet;
      parameter.search = e.target.value.trim();
      parameter.page = "1";
      this.setState({ current: 1 });
      await this.props.getPromo(parameter);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      let parameter = this.state.paramet;
      parameter.page = val.toString();
      await this.props.getPromo(parameter);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  editPromo = (id) => {
    const { promoCodes } = this.props;
    let data = promoCodes.find((x) => x.promoId === id);
    if (data && data.promoId) {
      let typeCheck = data.type.match(/₹/g) ? true : false;
      var editData = {
        id: data.promoId,
        code: data.promocode,
        promoValue: parseInt(data.type),
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
      };
      this.setState({ initValues: editData, checked: typeCheck });
      this.toggleDrawer();
    }
  };
  deleteRecord = (id) => {
    try {
      confirm({
        title: RemoveConst.header + PromoConst.promoCode,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          PromoConst.promoCode.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("Promo-form"),
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
      await this.props.deletePromo(id);
      await this.props.getPromo(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  showModal = (id) => {
    try {
      const { show } = this.state;
      const { promoCodes } = this.props;
      let vdata = promoCodes.find((x) => x.promoId === id);
      this.setState({ viewData: vdata, show: !show });
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, name, setFieldValue, error) => {
    try {
      return (
        <Select
          data={typeData}
          value={val}
          defaultValue={val}
          onChange={(value) => {
            setFieldValue(name, value);
          }}
          selectClass={error ? "empty" : ""}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  setStartEndDate = (name, value, setFieldValue) => setFieldValue(name, value);
  switchChange = () => {
    try {
      const { checked } = this.state;
      this.setState({ checked: !checked });
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
    try {
      let initValues = {
        id: 0,
        code: "",
        promoValue: "",
        startDate: "",
        endDate: "",
        description: "",
      };
      this.setState({ initValues, checked: false });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { paramet, checked } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = true;
      let today = new Date();
      today =
        today.getFullYear() +
        "/" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(today.getDate()).padStart(2, "0");
      let splitDate = today?.split("/");
      let diEndDate =
        values.endDate.trim() === ""
          ? (parseInt(splitDate[0]) + 1).toString() +
            "/" +
            splitDate[1] +
            "/" +
            splitDate[2]
          : values.endDate.trim();
      if (!checked && values.promoValue > 100) flag = false;
      if (flag !== false) {
        let sendData = {
          id: values.id,
          code: values.code.trim(),
          type: checked
            ? values.promoValue.toString() + "₹"
            : values.promoValue.toString() + "%",
          startdate: values.startDate !== "" ? values.startDate.trim() : today,
          enddate: diEndDate,
          description: values.description.trim(),
          userId: userID,
        };

        await this.props.savePromo(sendData);
        await this.props.getPromo(paramet);
        resetForm();
        this.toggleDrawer(true);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      initValues,
      visible,
      btnDisable,
      current,
      viewData,
      show,
      checked,
    } = this.state;
    const { promoCodes, loading } = this.props;
    let promoLength = promoCodes?.length > 0 ? promoCodes[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <PromoStyle id="Promo-form">
          <Menu />
          <div className="container">
            <Header title={"Promo-Code"} />
            <div className="allDiv">
              <div className="proMainDiv" id={"form-Darwer"}>
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
                            <h3 className="hrob">{PromoConst.addNew}</h3>
                          </div>
                        }
                        visible={visible}
                        onClose={() => this.toggleDrawer(true)}
                      >
                        <Form onSubmit={handleSubmit} className="formDiv anime">
                          <div className="field">
                            <Label
                              title={PromoConst.codeTitle}
                              className={
                                errors.code && touched.code ? "empty" : ""
                              }
                            />
                            <Input
                              className={
                                errors.code && touched.code ? "empty" : ""
                              }
                              onBlur={handleBlur}
                              name="code"
                              value={values.code}
                              handleChange={handleChange}
                            />
                          </div>
                          <Row gutter={20} className="fieldClass">
                            <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                              <div className="field">
                                <Label title={PromoConst.type} />
                                <RoundSwitch
                                  left="Percentage"
                                  right="Amount"
                                  checked={checked}
                                  handleChange={this.switchChange}
                                />
                              </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                              <div className="field">
                                <Label
                                  title={checked ? "₹*" : "%*"}
                                  className={
                                    (errors.promoValue && touched.promoValue) ||
                                    (!checked &&
                                      parseInt(values.promoValue) > 100)
                                      ? "empty"
                                      : ""
                                  }
                                />
                                <Input
                                  onBlur={handleBlur}
                                  name="promoValue"
                                  value={values.promoValue}
                                  handleChange={handleChange}
                                  type="number"
                                  className={
                                    (errors.promoValue && touched.promoValue) ||
                                    (!checked &&
                                      parseInt(values.promoValue) > 100)
                                      ? "empty"
                                      : ""
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="field">
                            <Label title={PromoConst.startDate} />
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
                            />
                          </div>
                          <div className="field">
                            <Label title={PromoConst.endDate} />
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
                            />
                          </div>
                          <div className="field">
                            <Label title={PromoConst.description} />
                            <Input
                              row={3}
                              name="description"
                              value={values.description}
                              handleChange={handleChange}
                            />
                          </div>
                          <div className="btnDiv">
                            <Button type="submit" disabled={btnDisable}>
                              {PromoConst.submit}
                            </Button>
                          </div>
                        </Form>
                      </FormDrawer>
                    )}
                  </Formik>
                )}
                <div className="covDiv">
                  <div className="headDIV">
                    <h2 className="hrob">{PromoConst.promoCode}</h2>
                    <div className="actDIV">
                      <div
                        className="addButton pointer"
                        onClick={() => this.toggleDrawer(true)}
                      >
                        <PlusOutlined />
                      </div>
                    </div>
                  </div>
                  <div className="contDIV">
                    <div className="contHead anime">
                      {promoCodes?.length > 0 && (
                        <div className="srchDiv">
                          <Input
                            placeholder={ButtonConst.search}
                            suffix={<SearchOutlined />}
                            onChange={this.searchChange}
                          />
                        </div>
                      )}
                    </div>
                    <div className="tableDIV">
                      <Table
                        current={current}
                        data={promoCodes}
                        type={PromoConst.promo}
                        deleteRecord={this.deleteRecord}
                        showModal={this.showModal}
                        editRecord={this.editPromo}
                      />
                      {promoLength > 10 && (
                        <div className="pagiDiv">
                          <Pagination
                            onChange={this.handlePagination}
                            current={current}
                            total={promoLength}
                            pageSize={10}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {show && (
                <ViewModal
                  data={viewData}
                  title={PromoConst.promoCode}
                  visible={show}
                  onCancel={this.showModal}
                  onOk={this.showModal}
                />
              )}
            </div>
          </div>
        </PromoStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.promo.loading,
  promoCodes: state.promo.promoCodes,
});
const mapDispatchToProps = (dispatch) => ({
  savePromo: (payload) => dispatch(savePromo(payload)),
  getPromo: (payload) => dispatch(getPromo(payload)),
  deletePromo: (payload) => dispatch(deletePromo(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PromoCode)
);
