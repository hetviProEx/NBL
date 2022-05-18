import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spin, Pagination, Select as Sel, Modal } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { ExtensionStyle } from "./style";
import { PointConst } from "./constant";
import {
  Menu,
  Header,
  Input,
  Button,
  FormDrawer,
  Label,
  Select,
  Table,
  ViewModal,
} from "components/Form";
import { ButtonConst } from "App/AppConstant";
import { getPartners } from "redux/partner/action";
import { getUsers } from "redux/user/action";
import { savePoc, getPoc, deletePoc } from "redux/poc/action";
import { getAuthUserID, getAuthRole } from "modules/helper";
const { confirm } = Modal;
var loginID = getAuthUserID();
var role = getAuthRole();
const Option = Sel.Option;
const ValidationSchema = Yup.object().shape({
  partner: Yup.string().trim().required(" "),
  user: Yup.string().trim().required(" "),
});
class PointContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      btnDisable: false,
      visible: false,
      viewModel: false,
      viewData: {},
      partners: [],
      newPartners: [],
      newUsers: [],
      search: "",
      data: [],
      dataLength: 0,
      currentPage: 1,
      paramet: {
        parameter: "",
        pageSize: "2000",
        page: "1",
        sortColumn: "id",
        search: "",
      },
      initValues: {
        pocid: 0,
        user: "",
        userId: 0,
        partner: "",
        status: true,
      },
    };
  }
  async componentDidMount() {
    try {
      loginID = loginID ? loginID : getAuthUserID();
      role = role ? role : getAuthRole();
      const { paramet } = this.state;
      await this.props.getPartners(paramet);
      // sendPartner.sortColumn = "a.user_id desc";
      await this.props.getUsers(paramet);
      // sendPartner.sortColumn = "partner_id desc";
      await this.props.getPoc();
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { partners, userList, poc } = this.props;
      const alredyIN = [];
      if (poc !== prevProps.poc) {
        poc?.forEach((a) => {
          if (a.status === 0) {
            let splitPart = a.partner?.split(",");
            splitPart?.forEach((x) => {
              alredyIN.push({ id: parseInt(x) });
            });
          }
        });
        if (partners) {
          let newPartner = [];
          partners?.forEach((a) => {
            if (alredyIN.findIndex((x) => x.id === a.partnerId) === -1) {
              newPartner.push({ id: a.partnerId, value: a.companyName });
            }
          });
          this.setState({ newPartners: newPartner });
        }
      }
      if (userList !== prevProps.userList) {
        let newUser = [];
        userList?.forEach((a) => {
          if (a.isPOC === 0) {
            newUser.push({ id: a.userId, value: a.firstname });
          }
        });
        this.setState({ newUsers: newUser });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setRigts = (a) => {
    try {
      if (role === "user") {
        let rights = window.atob(sessionStorage.rights);
        return rights.match(a);
      } else return true;
    } catch (error) {
      console.log(error);
    }
  };
  callUI = (a) => {
    try {
      let mob = a?.mobile?.split(",");
      return (
        mob &&
        mob?.map((x, i) => {
          let c = x?.split("EXT");
          return (
            <>
              <a href={"tel:" + c[0]} key={i}>
                {c[0]}
                {mob.length > 1 && i !== mob.length - 1 ? ", " : ""}
              </a>
              {c.length > 1 && "EXT" + c[1]}
            </>
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  contactUI = (a) => {
    try {
      let ema = a?.contact?.split(", ");
      if (ema)
        return ema?.map((x, i) =>
          x.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") ? (
            <>
              {a.mobile && (
                <>
                  {this.callUI(a)}
                  <br />
                </>
              )}
              <a href={"mailto:" + x} key={i}>
                {x}
                {ema.length > 1 ? ", " : ""}
              </a>
            </>
          ) : (
            x && (
              <div
                className="webUI"
                onClick={() =>
                  window.open(!x.includes("http") ? "http://" + x : x, "_blank")
                }
                key={i}
              >
                {x}
              </div>
            )
          )
        );
      else return this.callUI(a);
    } catch (error) {
      console.log(error);
    }
  };
  searchData = () => {
    try {
      const { data, search } = this.state;
      let dData = [];
      let display = [];
      data &&
        data.length > 0 &&
        data?.forEach((a) => {
          display.push(
            a.search,
            a.name,
            a.email,
            a.address,
            a.type,
            a.mobile,
            a.website
          );
          let array = [];
          display?.forEach((e) => {
            if (e && e !== null && e.toString().length > 0) array.push(e);
          });
          let matches = array.filter((s) =>
            s.toString().toLowerCase().includes(search.toString().toLowerCase())
          );
          display = [];
          if (matches && matches.length > 0) dData.push(a);
        });
      return dData;
    } catch (error) {
      console.log(error);
    }
  };
  openUrl = (url) => {
    try {
      var win = window.open(url, "_blank");
      win.focus();
    } catch (error) {
      console.log(error);
    }
  };
  spanUI = (url) => (
    <span className="txt pointer" onClick={() => this.openUrl(url)}>
      {url}
    </span>
  );
  searchChange = (e) => this.setState({ search: e.target.value.trim() });
  toggleDrawer = (val) => {
    try {
      const { visible } = this.state;
      this.setState({ visible: !visible });
      if (val) this.setDefault();
    } catch (error) {
      console.log(error);
    }
  };
  setDefault = async () => {
    try {
      let initValues = {
        pocid: 0,
        user: "",
        userId: 0,
        partner: "",
        status: true,
      };
      this.setState({ initValues, partners: [] });
      await this.props.getPoc();
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, name, setFieldValue, error) => {
    try {
      const { newUsers } = this.state;
      return (
        <Select
          data={newUsers}
          withID={true}
          value={val}
          defaultValue={val}
          onChange={(value, data) => {
            setFieldValue(name, value);
            setFieldValue("userId", data.id);
          }}
          selectClass={error ? "empty" : ""}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  selUI = (val, name, setFieldValue, error) => {
    return (
      <Sel
        value={val}
        defaultValue={val}
        mode="multiple"
        labelInValue
        tokenSeparators={[" ", ","]}
        className={error ? "empty" : ""}
        onChange={(value, data) => {
          setFieldValue(name, value[0]?.value);
          setFieldValue("partner", value[0]?.value);
          let partnersID = [];
          data?.forEach((a, i) => {
            partnersID.push({ key: a.value });
          });
          this.setState({ partners: partnersID });
        }}
      >
        {this.OptionUI()}
      </Sel>
    );
  };
  OptionUI = () =>
    this.state.newPartners?.map((a, i) => (
      <Option key={i + 1} value={a.id}>
        <span>{a.value}</span>
      </Option>
    ));
  viewPartner = (id) => {
    try {
      const { viewModel } = this.state;
      const { poc } = this.props;
      let vdata = poc.find((x) => x.pocid === id);
      this.setState({ viewModel: !viewModel, viewData: vdata });
    } catch (error) {
      console.log(error);
    }
  };
  callEdit = (id) => {
    try {
      const { poc, partners } = this.props;
      const { newPartners } = this.state;
      let data = poc.find((x) => x.pocid === id);
      var editData = {
        pocid: data.pocid,
        user: data.username,
        userId: data.user,
        partner: data.partnername,
        status: data.status === 1 ? false : true,
      };
      let parts = [];
      data.partner?.split(",")?.forEach((a, i) => {
        let pData = partners.find((x) => x.partnerId === parseInt(a));
        newPartners.push({ id: pData.partnerId, value: pData.companyName });
        parts.push({ key: parseInt(a) });
      });
      this.setState({ initValues: editData, partners: parts });
      this.toggleDrawer();
    } catch (error) {
      console.log(error);
    }
  };
  deleteWarning = (id, val) => {
    try {
      let title = val === 1 ? PointConst.actPOC : PointConst.deactPOC;
      confirm({
        title: title,
        icon: <QuestionCircleOutlined />,
        content:
          PointConst.content + title.toLocaleLowerCase() + PointConst.qus,
        okText: PointConst.yes,
        okType: "danger",
        cancelText: PointConst.no,
        onOk: () => {
          this.activeDeactive(id, val);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  activeDeactive = async (id, val) => {
    try {
      let actDeAct = val === 1 ? 0 : val === 0 ? 1 : null;
      await this.props.deletePoc(id + "/" + actDeAct);
      await this.props.getPoc();
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { partners } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let partnersID = [];
      partners?.forEach((a, i) => {
        partnersID.push(a.key);
      });
      let sendData = {
        pocid: values.pocid,
        user: values.userId,
        partner: partnersID.toString(),
        status: values.status,
        createdby: loginID,
      };
      await this.props.savePoc(sendData);
      await this.props.getPoc();
      resetForm();
      this.toggleDrawer(true);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      data,
      currentPage,
      dataLength,
      initValues,
      visible,
      btnDisable,
      partners,
      viewModel,
      viewData,
    } = this.state;
    const { loading, poc } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <ExtensionStyle id="form-Darwer">
          <Menu />
          <div className="container">
            <Header title={PointConst.pc} />
            <div className="allDiv anime">
              <div className="coMainDiv">
                {visible && (
                  <FormDrawer
                    title={
                      <div className="headDiv">
                        <h3 className="hrob">{`${
                          initValues.pocid === 0
                            ? PointConst.add
                            : PointConst.edit
                        }${PointConst.addNew}`}</h3>
                      </div>
                    }
                    visible={visible}
                    onClose={() => this.toggleDrawer(true)}
                  >
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
                        <Form onSubmit={handleSubmit} className="formDiv anime">
                          <div className="field">
                            <Label
                              title={PointConst.user}
                              className={
                                errors.user &&
                                touched.user &&
                                values.user === ""
                                  ? "empty"
                                  : ""
                              }
                            />
                            {values.user === "" &&
                              this.selectUI(
                                "",
                                "user",
                                setFieldValue,
                                errors.user && touched.user
                              )}
                            {values.user !== "" &&
                              this.selectUI(values.user, "user", setFieldValue)}
                          </div>
                          <div className="field">
                            <Label
                              title={PointConst.pn}
                              className={
                                errors.partner &&
                                touched.partner &&
                                values.partner === ""
                                  ? "empty"
                                  : ""
                              }
                            />
                            {values.partner === "" &&
                              this.selUI(
                                [],
                                "partner",
                                setFieldValue,
                                errors.partner && touched.partner
                              )}
                            {values.partner !== "" &&
                              this.selUI(partners, "partner", setFieldValue)}
                          </div>
                          <div className="btnDiv">
                            <Button type="submit" disabled={btnDisable}>
                              {PointConst.submit}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </FormDrawer>
                )}
                <div className="covDiv">
                  <div className="headDIV anime">
                    <h2 className="hrob">{PointConst.pc}</h2>
                    <div className="actDIV">
                      {this.setRigts("pocadd") && (
                        <div
                          className="addButton pointer"
                          onClick={() => this.toggleDrawer(true)}
                        >
                          <PlusOutlined />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="contDIV">
                    {data.length > 0 && (
                      <div className="contHead anime">
                        <div className="srchDiv">
                          <Input
                            placeholder={ButtonConst.search}
                            suffix={<SearchOutlined />}
                            onChange={this.searchChange}
                          />
                        </div>
                      </div>
                    )}
                    <div className="tableDIV">
                      <Table
                        current={currentPage}
                        type={"pointcont"}
                        data={poc}
                        pagiTF={true && poc.length > 10}
                        viewRecord={this.viewPartner}
                        editRecord={this.callEdit}
                        deleteRecord={this.deleteWarning}
                      />
                      {dataLength > 10 && (
                        <div className="pagiDiv">
                          <Pagination
                            onChange={this.handlePagination}
                            current={currentPage}
                            total={dataLength}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {viewModel && (
              <ViewModal
                data={viewData}
                title={PointConst.poc}
                visible={viewModel}
                onCancel={this.viewPartner}
                onOk={this.viewPartner}
              />
            )}
          </div>
        </ExtensionStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.poc.loading,
  partners: state.partner.partners,
  userList: state.user.userList,
  poc: state.poc.poc,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
  getPartners: (payload) => dispatch(getPartners(payload)),
  savePoc: (payload) => dispatch(savePoc(payload)),
  getPoc: (payload) => dispatch(getPoc(payload)),
  deletePoc: (payload) => dispatch(deletePoc(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PointContact)
);
