import React, { Component } from "react";
import * as Yup from "yup";
import { Modal, Image } from "antd";
import { Formik, Form } from "formik";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

import { MediaModalStyle } from "./style";
import { mediaConst, typeData } from "./constant";
import { ButtonConst } from "App/AppConstant";
import {
  Input,
  Label,
  Button,
  FileUpload,
  Select,
  AutoComplete,
} from "components/Form";
import { getAuthUserID } from "modules/helper";
var userID = getAuthUserID();
const ValidationSchema = Yup.object().shape({
  heading: Yup.string().trim().required(" "),
  selectType: Yup.string().trim().required(" "),
  mediaName: Yup.string().trim().required(" "),
});

class mediaKitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      uploadError: false,
      VideoError: false,
      uploadByte: "",
      uploadBase64: "",
      uploadName: "",
      initialState: {
        mediaId: 0,
        heading: "",
        selectType: "",
        selectTypeId: 0,
        mediaName: "",
        discription: "",
      },
    };
  }
  async componentDidMount() {
    try {
      userID = userID ? userID : getAuthUserID();
    } catch (error) {
      console.log(error);
    }
  }
  fileUpload = (id) => {
    try {
      const { uploadByte, uploadName, uploadError } = this.state;
      if (uploadByte !== "") {
        return (
          <>
            <span className="optionui">
              {id === 4 && <Image src={uploadByte} width={50} height={30} />}
              {id === 3 && <span className="txtWrap">{uploadName}</span>}
              <CloseOutlined onClick={() => this.removeUpload()} />
            </span>
          </>
        );
      } else
        return (
          <FileUpload
            accept={id === 3 ? ".pdf" : ".jpg,.jpeg, .png,.svg"}
            pdf={id === 3}
            image={id === 4}
            sendByte={this.setUpload}
            className={uploadError ? "empty" : ""}
            elements={<UploadOutlined />}
          />
        );
    } catch (error) {
      console.log(error);
    }
  };
  setUpload = (byteCode, name, base64) =>
    this.setState({
      uploadByte: byteCode,
      uploadName: name,
      uploadBase64: base64,
      uploadError: base64 ? false : true,
    });
  removeUpload = () =>
    this.setState({
      uploadByte: "",
      uploadName: "",
      uploadBase64: "",
      uploadError: true,
    });
  handleVideo = (e) => {
    const { VideoError } = this.state;
    let videoUrl = e.target.value.trim()?.split("&")[0];
    if (videoUrl.trim() !== "" && VideoError) {
      let vidLink =
        "https://youtu.be/" === videoUrl.substr(0, 17)
          ? "https://www.youtube.com/watch?v=" + videoUrl.slice(17)
          : videoUrl;
      this.setState({
        VideoError: vidLink.match(/youtube.com/g) ? false : true,
      });
    }

    this.setState({ uploadBase64: videoUrl });
  };
  selectUI = (val, setFieldValue, error) => {
    try {
      return (
        <Select
          data={typeData}
          withID={true}
          value={val}
          defaultValue={val}
          onChange={(value, data) => {
            setFieldValue("selectType", value);
            setFieldValue("selectTypeId", data.id);
            this.setState({ uploadBase64: "", uploadName: "", uploadByte: "" });
          }}
          selectClass={error ? "empty" : ""}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = (values, { setSubmitting }) => {
    try {
      const { uploadBase64 } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      if (uploadBase64 === "") {
        flag = true;
        values.selectTypeId !== 1 && this.setState({ uploadError: true });
        values.selectTypeId === 1 && this.setState({ VideoError: true });
      } else if (values.selectTypeId === 1) {
        let vidLink =
          uploadBase64?.substr(0, 17) === "https://youtu.be/"
            ? "https://www.youtube.com/watch?v=" + uploadBase64?.slice(17)
            : uploadBase64;
        this.setState({
          VideoError: vidLink.match(/youtube.com/g) ? false : true,
        });
        flag = vidLink.match(/youtube.com/g) ? false : true;
      }
      if (flag === false) {
        let sendData = {
          mediaId: values.mediaId,
          mediaName: values.mediaName.trim(),
          heading: values.heading.trim(),
          uploadType: values.selectTypeId,
          upload: uploadBase64,
          description: values.discription.trim(),
          createdBy:userID
        };
        this.props.submit(sendData);
        this.props.onOk();
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState, btnDisable, uploadBase64, uploadError, VideoError } =
      this.state;
    const { onOk, onCancel, title, managNames } = this.props;
    return (
      <MediaModalStyle>
        <div id="MediaKitModal-form">
          <Modal
            visible={true}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            title={title}
            centered
            getContainer={() => document.getElementById("MediaKitModal-form")}
          >
            <div className="formDiv">
              <Formik
                initialValues={initialState}
                validationSchema={ValidationSchema}
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
                    <div className="field anime">
                      <Label
                        title={mediaConst.heading}
                        className={
                          errors.heading && touched.heading ? "empty" : ""
                        }
                      />
                      <AutoComplete
                        onBlur={handleBlur}
                        name="heading"
                        value={values.heading}
                        handleChange={(val) => setFieldValue("heading", val)}
                        selectData={managNames}
                        className={
                          errors.heading && touched.heading ? "autoempty" : ""
                        }
                      />
                    </div>
                    <div className="field anime highZ">
                      <Label
                        title={mediaConst.selectType}
                        className={
                          errors.selectType &&
                          touched.selectType &&
                          values.selectType === ""
                            ? "empty"
                            : ""
                        }
                      />
                      {values.selectType === "" &&
                        this.selectUI(
                          "",
                          setFieldValue,
                          errors.selectType && touched.selectType
                        )}
                      {values.selectType !== "" &&
                        this.selectUI(values.selectType, setFieldValue)}
                    </div>
                    <div className="field anime">
                      <Label
                        title={mediaConst.mediaType}
                        className={
                          errors.mediaName && touched.mediaName ? "empty" : ""
                        }
                      />
                      <Input
                        value={values.mediaName}
                        onBlur={handleBlur}
                        name="mediaName"
                        handleChange={handleChange}
                        className={
                          errors.mediaName && touched.mediaName ? "empty" : ""
                        }
                      />
                    </div>
                    {values.selectTypeId > 0 && values.selectTypeId !== 1 && (
                      <div className="field anime">
                        <Label
                          title={`Upload   ${
                            values.selectTypeId === 4
                              ? mediaConst.img
                              : mediaConst.document
                          }`}
                          className={uploadError ? "empty" : ""}
                        />
                        {this.fileUpload(values.selectTypeId)}
                      </div>
                    )}
                    {values.selectTypeId === 1 && (
                      <div className="field anime">
                        <Label
                          title={mediaConst.video}
                          className={VideoError ? "empty" : ""}
                        />
                        <Input
                          value={values.selectTypeId === 1 ? uploadBase64 : ""}
                          handleChange={this.handleVideo}
                          className={VideoError ? "empty" : ""}
                        />
                        {VideoError && (
                          <div className="form-error">
                            {mediaConst.plzEntYTLink}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="field anime">
                      <Label title={mediaConst.desc} />
                      <Input
                        row={4}
                        name="discription"
                        value={values.discription}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="btnDiv">
                      <Button type="submit" disabled={btnDisable}>
                        {ButtonConst.submit}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal>
        </div>
      </MediaModalStyle>
    );
  }
}
export default mediaKitModal;
