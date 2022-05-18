import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Spin, Image, Modal } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DashOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

import { MediaStyle } from "./style";
import {
  Menu,
  Header,
  Input,
  RenderDrop,
  MediaModal,
  ShareModal,
} from "components/Form";
import { getMedia, SaveMedia, deleteMedia } from "redux/media/action";
import { RemoveConst } from "App/AppConstant";
import { MediaKitConst } from "./constant";
import { getAuthRole } from "modules/helper";
import { configVar, mediaConst } from "modules/config";
var role = getAuthRole();
const { confirm } = Modal;

class MediaKit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      show: false,
      showShare: false,
      showEdit: false,
      eImage: "",
      managNames: [],
      documents: [],
      images: [],
      videos: [],
      selectMName: "",
      title: "Add Media-Kit",
      sharetitle: "",
    };
  }
  async componentDidMount() {
    try {
      role = role ? role : getAuthRole();
      await this.props.getMedia();
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { count } = this.state;
      const { media } = this.props;
      if (media !== prevProps.media) {
        let heading = [];
        let doc = [];
        let img = [];
        let vid = [];
        media?.forEach((a) => {
          if (heading.findIndex((x) => x.value === a.heading) === -1)
            heading.push({ value: a.heading });
        });
        media?.forEach((a) => {
          if (a.heading === heading[count]?.value) {
            // && // documents.findIndex((x) => x.mediaId === a.mediaId) === -1
            // ?&& // images.findIndex((x) => x.mediaId === a.mediaId) === -1
            // &&  // videos.findIndex((x) => x.mediaId === a.mediaId) === -1
            if (a.uploadType === 3) doc.push(a);
            else if (a.uploadType === 4) img.push(a);
            else if (a.uploadType === 1) vid.push(a);
          }
        });
        this.setState({
          managNames: heading,
          documents: doc,
          images: img,
          videos: vid,
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
  managerUI = () => {
    try {
      const { count, managNames } = this.state;
      return managNames?.map((a, i) => (
        <div
          key={i}
          className={`textDiv anime ${i === count ? "selecText" : ""}`}
          onClick={() => this.countHandle(i)}
        >
          {a.value}
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  countHandle = async (i) => {
    this.setState({ count: i, documents: [], images: [], videos: [] });
    await this.props.getMedia();
  };
  downloadUrl = (url) => {
    try {
      let txt = url.replace(/\\/g, "%5C");
      let downURL = configVar.BASE_URL + mediaConst.GET_MEDIA_DOWNLOAD + txt;
      var win = window.open(downURL, "_blank");
      win.focus();
    } catch (error) {
      console.log(error);
    }
  };
  editImage = (img) =>
    this.setState({ showEdit: !this.state.showEdit, eImage: img ? img : "" });
  callRemove = (title, id) => {
    try {
      confirm({
        title: title,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          title.toLocaleLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        onOk: () => {
          this.removeApi(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeApi = async (id) => {
    try {
      await this.props.deleteMedia(id);
      await this.props.getMedia();
    } catch (error) {
      console.log(error);
    }
  };
  imgUI = (text, data) => {
    try {
      let url = configVar.BASE_URL;
      return data?.map((a, i) => (
        <Col
          xs={24}
          sm={text === "video" ? 12 : 8}
          md={text === "video" ? 12 : 8}
          lg={text === "video" ? 12 : 8}
          xl={text === "video" ? 12 : 6}
          key={i}
          className="anime"
        >
          <div className="imageCard zoom-in">
            {text === "video" && role === "partner" ? (
              <></>
            ) : (
              <div className="renderDrop pointer actionUI">
                <RenderDrop
                  overlayClassName="actionUI"
                  item={<DashOutlined className="dash" />}
                  data={[
                    text !== "video" && (
                      <div
                        className="actionBtn"
                        onClick={() => this.downloadUrl(a.upload)}
                      >
                        <i className="fas fa-download"></i>
                        <span className="text">{MediaKitConst.dwn}</span>
                      </div>
                    ),
                    text !== "video" && (
                      <div
                        className="actionBtn"
                        onClick={() =>
                          this.showShareModal(
                            `Share ${
                              text === "document" ? " Document" : " Image"
                            }`
                          )
                        }
                      >
                        <i className="fas fa-share-alt"></i>
                        <span className="text">{MediaKitConst.shr}</span>
                      </div>
                    ),
                    text === "image" && role === "partner" && (
                      <div
                        className="actionBtn"
                        onClick={() =>
                          this.editImage(url + a.upload.replace(/\\/g, "%5C"))
                        }
                      >
                        <i className="fas fa-edit"></i>
                        <span className="text">{MediaKitConst.edit}</span>
                      </div>
                    ),
                    role !== "partner" && this.setRigts("mediakitdelete") && (
                      <div
                        className="actionBtn"
                        onClick={() => {
                          this.callRemove(
                            text === "document"
                              ? "Document"
                              : text === "video"
                              ? "Video"
                              : "Image",
                            a.mediaId
                          );
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                        <span className="text">{MediaKitConst.del}</span>
                      </div>
                    ),
                  ]}
                />
              </div>
            )}
            {text === "image" && (
              <div className="img">
                <a
                  href={a?.upload ? url + a.upload : ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    height={"7em"}
                    src={url + a.upload}
                    alt="img"
                    preview={false}
                  />
                </a>
              </div>
            )}
            {text === "document" && (
              <a
                href={a.upload ? url + a.upload : ""}
                target="_blank"
                rel="noreferrer"
              >
                <div className="file txtWrap">{a.mediaName}</div>
              </a>
            )}
            {text === "video" && (
              <div className="videoDiv">
                <iframe
                  id="fr"
                  title="vi"
                  className="responsive-iframe"
                  src={a.upload.replace("watch?v=", "embed/")}
                  allowFullScreen="allowFullScreen"
                />
              </div>
            )}
            {/* {(text === "image" || text === "video") &&  
            } */}
            <h3>{a.mediaName}</h3>
          </div>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  showModal = () => {
    try {
      const { show } = this.state;
      this.setState({ show: !show });
    } catch (error) {
      console.log(error);
    }
  };
  showShareModal = (title) => {
    try {
      const { showShare } = this.state;
      this.setState({ showShare: !showShare, sharetitle: title });
    } catch (error) {
      console.log(error);
    }
  };
  submitData = async (sData) => {
    try {
      await this.props.SaveMedia(sData);
      await this.props.getMedia();
    } catch (error) {
      console.log(error);
    }
  };
  downImg = async (val) => {
    try {
      const a = document.createElement("a");
      a.download = val.fullName;
      a.href = val.imageBase64;
      a.click();
      this.editImage();
      await this.props.getMedia();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      show,
      title,
      showShare,
      sharetitle,
      showEdit,
      managNames,
      documents,
      images,
      videos,
      eImage,
    } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <MediaStyle>
          <Menu />
          <div className="container">
            <Header title={"Media-Kit"} />
            <div className="allDiv">
              {!showEdit && (
                <>
                  <Row gutter={20}>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={6}
                      xl={5}
                      className="anime"
                    >
                      <div className="headDiv">
                        <h2 className="hrob">{MediaKitConst.mediaKit}</h2>
                      </div>
                      <div className="fileManaDiv">{this.managerUI()}</div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={18}
                      xl={19}
                      className="anime"
                    >
                      <div className="headDiv">
                        {/* <div className="searchDiv anime">
                          <Input
                            placeholder={MediaKitConst.searImg}
                            suffix={<SearchOutlined />} // onChange={this.searchChange}
                          />
                        </div> */}
                        {role !== "partner" && this.setRigts("mediakitadd") && (
                          <div
                            className="addButton pointer"
                            onClick={() => this.showModal()}
                          >
                            <PlusOutlined />
                          </div>
                        )}
                      </div>
                      <div className="mainMedia">
                        {documents.length > 0 && (
                          <div className="mediaDiv">
                            <h1 className="txtHead">{"Documents"}</h1>
                            <Row gutter={30} className="imagpageDiv">
                              {this.imgUI("document", documents)}
                            </Row>
                          </div>
                        )}
                        {images.length > 0 && (
                          <div className="mediaDiv">
                            <h1 className="txtHead">{"Images"}</h1>
                            <Row gutter={30} className="imagpageDiv">
                              {this.imgUI("image", images)}
                            </Row>
                          </div>
                        )}
                        {videos.length > 0 && (
                          <div className="mediaDiv">
                            <h1 className="txtHead">{"Videos"}</h1>
                            <Row gutter={30} className="imagpageDiv">
                              {this.imgUI("video", videos)}
                            </Row>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {show && (
                    <MediaModal
                      title={title}
                      onCancel={this.showModal}
                      onOk={this.showModal}
                      submit={this.submitData}
                      managNames={managNames}
                    />
                  )}
                  {showShare && (
                    <ShareModal
                      title={sharetitle}
                      onCancel={this.showShareModal}
                      onOk={this.showShareModal}
                    />
                  )}
                </>
              )}
              {showEdit && (
                <div className="allDiv">
                  <FilerobotImageEditor
                    source={eImage}
                    onSave={(editedImageObject) =>
                      this.downImg(editedImageObject)
                    }
                    onClose={this.editImage}
                    Text={{ text: "" }}
                    tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]}
                    defaultTabId={TABS.ANNOTATE}
                    defaultToolId={TOOLS.TEXT}
                  />
                </div>
              )}
            </div>
          </div>
        </MediaStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  media: state.media.media,
  isSaved: state.media.isSaved,
  loading: state.media.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getMedia: (payload) => dispatch(getMedia(payload)),
  SaveMedia: (payload) => dispatch(SaveMedia(payload)),
  deleteMedia: (payload) => dispatch(deleteMedia(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MediaKit)
);
