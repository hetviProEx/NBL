import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  FilePdfFilled,
} from "@ant-design/icons";

import { configVar } from "modules/config";
import { getAuthUserID } from "modules/helper";
import { ButtonConst } from "App/AppConstant";
import { saveProduct } from "redux/product/action";
import { ProDocConst } from "container/AdminProduct/constant";
import { Input, Label, Button, FileUpload } from "components/Form";
var userId = getAuthUserID();
class ProductDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      proDocId: 0,
      proVideoId: 0,
      docTitle: "",
      docName: null,
      docByte: null,
      docBase64: null,
      documents: [],
      videos: [],
      videoLink: "",
    };
  }
  componentDidMount() {
    try {
      const { data } = this.props;
      userId = userId ? userId : getAuthUserID();
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
      const { documents, videos } = this.state;
      let url = configVar.BASE_URL.slice("/", -1);
      data?.productDocument?.forEach((a) => {
        documents.push({
          proDocId: a?.pdId,
          docTitle: a?.documentTitle,
          docByte: a?.documentPath !== "" ? url + a.documentPath : null,
          docBase64: a?.documentPath !== "" ? a.documentPath : null,
          isDelete: a?.isDelete,
        });
        this.setState({ documents });
      });
      data?.productVideo?.forEach((a) => {
        videos.push({
          proVideoId: a.productVideoId,
          videoLink: a.videoUrl,
          videoShow: a.videoUrl.replace("watch?v=", "embed/"),
          isDelete: a.isDelete,
        });
        this.setState({ videos });
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleTitle = (e) => this.setState({ docTitle: e.target.value });
  handleVideo = (e) =>
    this.setState({ videoLink: e.target.value.trim()?.split("&")[0] });
  fileUpload = () => {
    try {
      const { docName, docByte } = this.state;
      if (docName && docByte) {
        return (
          <span className="optionui anime">
            <span className="txtWrap">{docName}</span>
            <CloseOutlined onClick={() => this.removefile()} />
          </span>
        );
      }
      return (
        <FileUpload
          accept=".pdf"
          pdf={true}
          sendByte={this.setPdf}
          elements={<UploadOutlined />}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  setPdf = (byteCode, name, base64) =>
    this.setState({ docByte: byteCode, docName: name, docBase64: base64 });
  removefile = () =>
    this.setState({ docByte: null, docName: null, docBase64: null });
  addPdf = () => {
    try {
      const { documents, docTitle, docByte, docBase64, proDocId } = this.state;
      if (docTitle.trim() !== "" && docBase64 && documents.length < 25) {
        documents.push({
          proDocId: proDocId,
          docTitle: docTitle.trim(),
          docByte: docByte,
          docBase64: docBase64,
          isDelete: 0,
        });
        this.setState({
          docTitle: "",
          docByte: null,
          docName: null,
          docBase64: null,
        });
      } else {
        this.setState({
          docTitle: "",
          docByte: null,
          docName: null,
          docBase64: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  addVideoLink = () => {
    try {
      const { videos, videoLink, proVideoId } = this.state;
      if (videoLink.trim() !== "" && videos.length < 25) {
        let vidLink =
          "https://youtu.be/" === videoLink.substr(0, 17)
            ? "https://www.youtube.com/watch?v=" + videoLink.slice(17)
            : videoLink;
        if (
          vidLink.match(/youtube.com/g) &&
          videos.findIndex((x) => x.videoLink === vidLink) === -1
        ) {
          let url = vidLink.trim().replace("watch?v=", "embed/");
          videos.push({
            videoLink: vidLink,
            videoShow: url,
            proVideoId: proVideoId,
            isDelete: 0,
          });
          this.setState({ videoLink: "" });
        } else message.error(ProDocConst.verr);
      } else this.setState({ videoLink: "" });
    } catch (error) {
      console.log(error);
    }
  };
  pdfSUI = () => {
    try {
      const { documents } = this.state;
      return documents?.map(
        (a, i) =>
          a.isDelete === 0 && (
            <div className="pdfSDiv" key={i}>
              <a href={a.docByte} target="_blank" rel="noreferrer">
                <FilePdfFilled />
              </a>
              <span className="txtWrap">{a.docTitle}</span>
              <DeleteOutlined
                onClick={() => this.deleteItem(i, "doc", a.proDocId)}
              />
            </div>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  deleteItem = (i, val, did) => {
    try {
      const { documents, videos } = this.state;
      const { data } = this.props;
      if (val === "doc") {
        if (data.productId !== 0 && did !== 0) {
          documents[i].isDelete = 1;
          this.setState({ documents });
        } else {
          documents.splice(i, 1);
          this.setState({ documents });
        }
      } else if (val === "video") {
        if (data.productId !== 0 && did !== 0) {
          videos[i].isDelete = 1;
          this.setState({ videos });
        } else {
          videos.splice(i, 1);
          this.setState({ videos });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  videoLinksUI = () => {
    try {
      const { videos } = this.state;
      return videos?.map(
        (a, i) =>
          a.isDelete === 0 && (
            <div key={i} className="linkDiv anime">
              <div className="videoBox">
                <iframe
                  id="vi"
                  title="video"
                  width="200"
                  height="150"
                  src={a.videoShow}
                />
                <CloseOutlined
                  onClick={() => this.deleteItem(i, "video", a.proVideoId)}
                />
              </div>
            </div>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async () => {
    try {
      const {
        proDocId,
        docTitle,
        documents,
        docByte,
        docBase64,
        videoLink,
        videos,
        proVideoId,
      } = this.state;
      const { data } = this.props;
      let productDocument = [];
      let productVideo = [];
      let productSubscriptiondetails = [];
      let flag = false;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      if (docTitle.trim() !== "" && docBase64 && documents.length < 25) {
        documents.push({
          proDocId: proDocId,
          docTitle: docTitle.trim(),
          docByte: docByte,
          docBase64: docBase64,
          isDelete: 0,
        });
        this.setState({ docTitle: "", docByte: null, docBase64: null });
      }
      if (documents?.length > 0) {
        documents?.forEach((a) => {
          productDocument.push({
            pdId: a.proDocId,
            productId: data.productId,
            documentTitle: a.docTitle,
            documentPath: a.docBase64 !== null ? a.docBase64 : "",
            isDelete: a.isDelete,
          });
        });
      }
      if (videoLink?.trim() !== "" && videos?.length < 25) {
        let vidLink =
          "https://youtu.be/" === videoLink.substr(0, 17)
            ? "https://www.youtube.com/watch?v=" + videoLink.slice(17)
            : videoLink;
        if (
          vidLink.match(/youtube.com/g) &&
          videos.findIndex((x) => x.videoLink === vidLink) === -1
        ) {
          let url = vidLink.trim().replace("watch?v=", "embed/");
          videos.push({
            videoLink: vidLink,
            videoShow: url,
            proVideoId: proVideoId,
            isDelete: 0,
          });
          this.setState({ videoLink: "" });
        } else {
          message.error(ProDocConst.verr);
          flag = true;
        }
      }
      if (videos?.length > 0) {
        videos?.forEach((a) => {
          productVideo.push({
            productVideoId: a.proVideoId,
            productId: data.productId,
            videoUrl: a.videoLink,
            isDelete: a.isDelete,
          });
        });
      }
      if (flag === false) {
        data.productDocument = productDocument;
        data.productVideo = productVideo;
        data.productSubscriptiondetails = productSubscriptiondetails;
        data.createdBy = userId;
        await this.props.saveProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { docTitle, videoLink, btnDisable } = this.state;
    return (
      <>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
            <div className="field">
              <Label title={ProDocConst.docTitle} />
              <Input value={docTitle} handleChange={this.handleTitle} />
            </div>
          </Col>
          <Col xs={18} sm={18} md={12} lg={6} xl={6} className="anime">
            <div className="compLogoDiv">
              <Label title={ProDocConst.productDocS} />
              {this.fileUpload()}
            </div>
          </Col>
          <Col xs={6} sm={6} md={12} lg={6} xl={6} className="addbtn">
            <div className="addButton pointer" onClick={this.addPdf}>
              <PlusOutlined />
            </div>
          </Col>
        </Row>
        {this.pdfSUI()}
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
            <div className="field">
              <Label title={ProDocConst.proVideo} />
              <Input
                value={videoLink}
                handleChange={this.handleVideo}
                suffix={<UploadOutlined onClick={this.addVideoLink} />}
              />
            </div>
          </Col>
        </Row>
        {this.videoLinksUI()}
        <div className="btnDiv">
          <div className="nextDiv anime">
            <Button onClick={() => this.props.history.push("/products")}>
              {ButtonConst.cancel}
            </Button>
            <Button disabled={btnDisable} onClick={this.handleSubmit}>
              {ButtonConst.submit}
            </Button>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveProduct: (payload) => dispatch(saveProduct(payload)),
});
export default withRouter(connect(null, mapDispatchToProps)(ProductDocument));
