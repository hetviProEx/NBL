import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Spin, Row, Col, Image, Modal, Table } from "antd";
import { connect } from "react-redux";
import {
  PlusOutlined,
  CloseOutlined,
  UploadOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import CRMForm from "./crmForm";
import { ExtensionStyle } from "./style";
import { configVar } from "modules/config";
import { getAuthRole } from "modules/helper";
import {
  saveLoginImage,
  getLoginImages,
  deleteLoginImages,
  saveTestimonial,
  getTestimonial,
  getTestimonialById,
  deleteTestimonial,
  saveOffers,
  getOfferList,
  deleteOffer,
  saveKnowledge,
  knowledgeList,
  knowledgeById,
  deleteknowledge,
} from "redux/cms/action";
import { TabConst } from "components/Table/constant";
import { Menu, Header, FileUpload, ViewModal as View } from "components/Form";
import { CmsConst, CmsAr } from "./constant";
var role = getAuthRole();
const { confirm } = Modal;
const { Column } = Table;
class CMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      visible: false,
      imgnm: "",
      imgByte: "",
      imgBase64: "",
      editedData: {},
      viewData: {},
      viewModel: false,
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "",
        search: "",
      },
      pagination: { current: 1, pageSize: 10, total: 10 },
      images: [
        "https://partnerapi.naapbooks.com/Document/4/mypic(120).jpg",
        "https://partnerapi.naapbooks.com/Document/4/mypic(120).jpg",
      ],
    };
  }
  async componentDidMount() {
    try {
      role = role ? role : getAuthRole();
      const { count } = this.state;
      if (count === 0) await this.props.getLoginImages();
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { testimonial, knowledge } = this.props;
      if (testimonial !== prevProps.testimonial) {
        this.setState({
          editedData: testimonial,
          visible: true,
          imgByte:
            testimonial.icon !== ""
              ? configVar.BASE_URL + testimonial.icon
              : "",
          imgBase64: testimonial.icon !== "" ? testimonial.icon : "",
        });
      }
      if (knowledge !== prevProps.knowledge) {
        this.setState({
          editedData: knowledge,
          visible: true,
          imgByte: knowledge.uploadImage
            ? configVar.BASE_URL + knowledge.uploadImage
            : "",
          imgBase64: knowledge.uploadImage ? knowledge.uploadImage : "",
        });
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
  delete = (index) => {
    try {
      const { count } = this.state;
      let title =
        count === 1 || count === 2
          ? CmsConst.remove + CmsConst.record
          : CmsConst.remove + CmsConst.img;
      confirm({
        title: title,
        icon: <QuestionCircleOutlined />,
        content: CmsConst.confirm + title.toLocaleLowerCase() + CmsConst.qus,
        okText: CmsConst.yes,
        okType: "danger",
        cancelText: CmsConst.no,
        onOk: () => {
          this.remove(index);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  remove = async (deleteIndex) => {
    try {
      const { images, count, paramet } = this.state;
      if (count === 0) {
        await this.props.deleteLoginImages(deleteIndex);
        await this.props.getLoginImages();
      } else if (count === 1) {
        await this.props.deleteknowledge(deleteIndex);
        await this.props.knowledgeList(paramet);
      } else if (count === 2) {
        await this.props.deleteTestimonial(deleteIndex);
        await this.props.getTestimonial(paramet);
      } else if (count === 3) {
        await this.props.deleteOffer(deleteIndex);
        await this.props.getOfferList();
      } else {
        const newData = images.filter((data, index) => index !== deleteIndex);
        this.setState({ images: newData });
      }
    } catch (error) {
      console.log(error);
    }
  };
  imgUI = () => {
    try {
      const { images, count } = this.state;
      const { loginImages, offerList } = this.props;
      let img = count === 0 ? loginImages : count === 3 ? offerList : images;
      return img?.map((a, i) => (
        <Col xs={24} sm={8} md={8} lg={8} xl={6} key={i} className="anime">
          <div className="img">
            <Image
              height={"7em"}
              src={
                count === 0
                  ? configVar.BASE_URL + a.image
                  : count === 3
                  ? configVar.BASE_URL + a.uploadimg
                  : a
              }
              alt="img"
            />
            {this.setRigts("cmsdelete") && (
              <CloseCircleOutlined
                className="cross"
                onClick={() =>
                  this.delete(count === 0 ? a.id : count === 3 ? a.offersid : i)
                }
              />
            )}
          </div>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  changeCMS = async (i) => {
    const { paramet } = this.state;
    paramet.sortColumn = "id";
    if (i === 0) await this.props.getLoginImages();
    else if (i === 1) {
      await this.props.knowledgeList(paramet);
    } else if (i === 2) {
      await this.props.getTestimonial(paramet);
    } else if (i === 3) {
      await this.props.getOfferList();
    }
    let pegi = { current: 1, pageSize: 10, total: 10 };
    paramet.page = pegi.current.toString();
    this.setState({ count: i, pagination: pegi });
  };
  cmsUI = () =>
    CmsAr?.map((a, i) => (
      <div key={i}>
        <h3
          className={`hrob${this.state.count === i ? " selected" : ""}`}
          onClick={() => this.changeCMS(i)}
        >
          {a}
        </h3>
      </div>
    ));
  showModal = () => this.setState({ visible: true });
  close = () => {
    try {
      this.setState({ visible: false, editedData: {} });
      this.removefile();
    } catch (error) {
      console.log(error);
    }
  };
  submit = async (data) => {
    try {
      const { imgBase64, count, paramet } = this.state;
      if (count === 0 && imgBase64 !== "") {
        let sendData = { id: 0, image: imgBase64 };
        await this.props.saveLoginImage(sendData);
        await this.props.getLoginImages();
      } else if (count === 1) {
        data.uploadImage = imgBase64 !== "" ? imgBase64 : "";
        await this.props.saveKnowledge(data);
        await this.props.knowledgeList(paramet);
      } else if (count === 2) {
        data.icon = imgBase64 !== "" ? imgBase64 : "";
        await this.props.saveTestimonial(data);
        await this.props.getTestimonial(paramet);
      } else if (count === 3) {
        data.uploadimg = imgBase64 !== "" ? imgBase64 : "";
        await this.props.saveOffers(data);
        await this.props.getOfferList();
      }
      this.setState({ visible: false, editedData: {} });
      this.removefile();
    } catch (error) {
      console.log(error);
    }
  };
  fileUpload = () => {
    try {
      const { imgByte } = this.state;
      if (imgByte !== "") {
        return (
          <span className="optionui" key={1}>
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
  imageUI = () => (
    <div key={1}>
      <Image
        height={"7em"}
        src="https://partnerapi.naapbooks.com/Document/4/mypic(120).jpg"
      />
      <CloseCircleOutlined className="cross" onClick={() => this.delete()} />
    </div>
  );
  columns = (type) => {
    try {
      return (
        <>
          <Column
            title={TabConst.no}
            dataIndex={"no"}
            sorter={(a, b) => b.no - a.no}
          />
          {type === "knowledge" && (
            <>
              <Column
                title={CmsConst.faq + CmsConst.cat}
                dataIndex={"categoryName"}
                sorter={(a, b) => a.categoryName.localeCompare(b.categoryName)}
              />
              <Column
                title={CmsConst.tag}
                // dataIndex={"tags"}
                // sorter={(a, b) => a.tags.localeCompare(b.tags)}
                render={(record, i) => this.tagSpace(record)}
              />
              <Column
                title={CmsConst.faq + CmsConst.ft}
                dataIndex={"faqTitle"}
                sorter={(a, b) => a.faqTitle.localeCompare(b.faqTitle)}
              />
            </>
          )}
          {type === "testimonials" && (
            <>
              <Column
                title={TabConst.name}
                dataIndex={"name"}
                sorter={(a, b) => a.name.localeCompare(b.name)}
              />
              <Column
                title={TabConst.comName}
                dataIndex={"companyName"}
                sorter={(a, b) => a.companyName.localeCompare(b.companyName)}
              />
            </>
          )}
          <Column
            title={TabConst.publish}
            render={(record) => this.StatusUI(record, type)}
            sorter={(a, b) => b.status - a.status}
          />
          {(this.setRigts("cmsdelete") || this.setRigts("cmsedit")) && (
            <Column
              title={TabConst.action}
              render={(record, i) => this.action(record, type)}
            />
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  tagSpace = (a) => {
    try {
      let tagArr = a.tags?.split(",");
      let abc = "";
      tagArr?.forEach((e, i) => {
        let xyz = i !== tagArr.length - 1 ? e + ", " : e;
        abc = abc + xyz;
      });
      return abc;
    } catch (error) {
      console.log(error);
    }
  };
  StatusUI = (a) => {
    try {
      let flag = a.status === 0;
      return <div>{flag ? "Yes" : "No"}</div>;
    } catch (error) {
      console.log(error);
    }
  };
  action = (a, type) => (
    <div className="actionUI" key={1}>
      {
        <div className="edite_box size">
          <EyeOutlined
            onClick={() =>
              this.viewRecord(
                type === "testimonials" ? a.testimonialId : a.knowId,
                type
              )
            }
          />
        </div>
      }
      {this.setRigts("cmsedit") && (
        <div className="edite_box size">
          <EditOutlined
            onClick={() =>
              this.editRecord(
                type === "testimonials" ? a.testimonialId : a.knowId,
                type
              )
            }
          />
        </div>
      )}
      {this.setRigts("cmsdelete") && (
        <div className="fillClosee_box size">
          <DeleteOutlined
            onClick={() =>
              this.delete(type === "testimonials" ? a.testimonialId : a.knowId)
            }
          />
        </div>
      )}
    </div>
  );
  viewRecord = (id, type) => {
    try {
      const { testimonials, knowList } = this.props;
      const { viewModel } = this.state;
      let data = type === "testimonials" ? testimonials : knowList;
      let vdata =
        type === "testimonials"
          ? data.find((x) => x.testimonialId === id)
          : data.find((x) => x.knowId === id);
      this.setState({ viewModel: !viewModel, viewData: vdata });
    } catch (error) {
      console.log(error);
    }
  };
  editRecord = async (id, type) => {
    try {
      type === "testimonials" && (await this.props.getTestimonialById(id));
      type === "knowledge" && (await this.props.knowledgeById(id));
    } catch (error) {
      console.log(error);
    }
  };
  handleTable = async (pagination) => {
    const { count, paramet } = this.state;
    if (count === 2) {
      paramet.page = pagination.current.toString();
      await this.props.getTestimonial(paramet);
    }
    this.setState({ pagination });
  };
  tableUI = (data, type) => {
    try {
      const { pagination, count } = this.state;
      let lenght =
        count === 2 || count === 1 ? data[0].totalLenght : data.length;
      pagination.total = lenght;
      data?.forEach((a, i) => {
        a.no = i + 1;
        if (type === "testimonials") {
          a.status = a.publishStatus;
        } else if (type === "knowledge") {
          a.status = a.ispublished;
        }
      });
      return (
        <div className="tableDIV">
          <Table
            bordered
            rowClassName={"anime"}
            pagination={lenght > 10 ? pagination : false}
            onChange={this.handleTable}
            dataSource={data}
          >
            {this.columns(type)}
          </Table>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { visible, count, imgByte, viewModel, viewData } = this.state;
    const { loading, loginImages, testimonials, offerList, knowList } =
      this.props;
    let length = count === 0 ? loginImages.length : offerList.length;
    return (
      <Spin spinning={loading} size="large">
        <ExtensionStyle>
          <Menu />
          <div className="container">
            <Header title={CmsConst.cms} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">{this.cmsUI()}</div>
                <div className="head">
                  {(count === 0 || count === 3) && (
                    <h3 className="txtHead">{"Images"}</h3>
                  )}
                  {this.setRigts("cmsadd") && (
                    <div
                      className="addButton pointer"
                      onClick={() => this.showModal()}
                    >
                      <PlusOutlined />
                    </div>
                  )}
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    {(count === 0 || count === 3) && length > 0 && (
                      <div className="mediaDiv">
                        <Row gutter={30} className="imagpageDiv">
                          {this.imgUI()}
                        </Row>
                      </div>
                    )}
                  </div>
                  {count === 1 && this.tableUI(knowList, "knowledge")}
                  {count === 2 && this.tableUI(testimonials, "testimonials")}
                </div>
              </div>
            </div>
            {visible && (
              <CRMForm
                title={CmsAr[count]}
                count={count}
                visible={visible}
                onCancel={this.close}
                onOk={this.submit}
                setByte={this.setByte}
                imgByte={imgByte}
                removefile={this.removefile}
                editedData={this.state.editedData}
              />
            )}
            {viewModel && (
              <View
                data={viewData}
                title={count === 2 ? CmsConst.temols : CmsConst.knowBase}
                visible={viewModel}
                onCancel={this.viewRecord}
                onOk={this.viewRecord}
              />
            )}
          </div>
        </ExtensionStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.cms.loading,
  loginImages: state.cms.loginImages,
  testimonials: state.cms.testimonials,
  testimonial: state.cms.testimonial,
  offerList: state.cms.offerList,
  knowList: state.cms.knowledgeList,
  knowledge: state.cms.knowledge,
});
const mapDispatchToProps = (dispatch) => ({
  saveLoginImage: (payload) => dispatch(saveLoginImage(payload)),
  getLoginImages: (payload) => dispatch(getLoginImages(payload)),
  deleteLoginImages: (payload) => dispatch(deleteLoginImages(payload)),
  saveTestimonial: (payload) => dispatch(saveTestimonial(payload)),
  getTestimonial: (payload) => dispatch(getTestimonial(payload)),
  getTestimonialById: (payload) => dispatch(getTestimonialById(payload)),
  deleteTestimonial: (payload) => dispatch(deleteTestimonial(payload)),
  saveOffers: (payload) => dispatch(saveOffers(payload)),
  getOfferList: (payload) => dispatch(getOfferList(payload)),
  deleteOffer: (payload) => dispatch(deleteOffer(payload)),
  saveKnowledge: (payload) => dispatch(saveKnowledge(payload)),
  knowledgeList: (payload) => dispatch(knowledgeList(payload)),
  knowledgeById: (payload) => dispatch(knowledgeById(payload)),
  deleteknowledge: (payload) => dispatch(deleteknowledge(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CMS));
