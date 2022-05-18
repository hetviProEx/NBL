import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Image, Tag, Input as AddTag, message } from "antd";
import { CloseOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";

import { getAuthUserID } from "modules/helper";
import { CmsConst } from "./constant";
import {
  FileUpload,
  RichTextBox,
  Label,
  Checkbox,
  Input,
  Button,
  AutoComplete,
} from "components/Form";
import { saveCategory, categoryList } from "redux/cms/action";
import { ButtonConst } from "App/AppConstant";
import { FormValidation } from "App/AppConstant";
var userId = getAuthUserID();
const knowledgeSchema = Yup.object().shape({
  category: Yup.string().trim().required(" "),
  faqTitle: Yup.string().trim().min(3).required(" "),
  faqDesc: Yup.string().trim().required(" "),
});
const TestimonialSchema = Yup.object().shape({
  addName: Yup.string().trim().min(3, FormValidation.nameMin).required(" "),
  cName: Yup.string().trim().min(3, FormValidation.nameMin).required(" "),
  description: Yup.string().trim().required(" "),
});

class CRMForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      blog: "",
      checked: true,
      title: "",
      des: "",
      name: "",
      cname: "",
      desc: "",
      it: "",
      link: "",
      position: 0,
      posiError: false,
      imgError: false,
      tags: [],
      tagerror: false,
      inputVisible: false,
      inputValue: "",
      selectCat: [],
      teInitValues: {
        addName: "",
        cName: "",
        description: "",
        tstiId: 0,
      },
      knowInitValues: {
        knowId: 0,
        category: "",
        categoryId: 0,
        faqTitle: "",
        faqDesc: "",
      },
    };
  }
  async componentDidMount() {
    try {
      userId = userId ? userId : getAuthUserID();
      const { editedData } = this.props;
      await this.props.categoryList();
      if (editedData) {
        this.setdefault(editedData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { catList } = this.props;
      if (catList !== prevProps.catList) {
        let array = [];
        catList?.forEach((a, i) => {
          array.push({ id: a.categoryId, value: a.categoryName });
        });
        this.setState({ selectCat: array });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setdefault = (editedData) => {
    try {
      const { count } = this.props;
      if (count === 2) {
        let setdata = {
          tstiId: editedData.testimonialId,
          addName: editedData.name,
          cName: editedData.companyName,
          description: editedData.description,
        };
        this.setState({
          teInitValues: setdata,
          checked: editedData.publishStatus === 0,
        });
      } else if (count === 1) {
        let setdata = {
          knowId: editedData.knowId,
          category: editedData.categoryName,
          categoryId: editedData.categoryId,
          faqTitle: editedData.faqTitle,
          faqDesc: editedData.faqDescription,
        };
        let array = [];
        let edTagId = editedData.tagsId?.split(",");
        let editTag = editedData.tags?.split(",");
        edTagId?.forEach((a, i) => {
          array.push({ tagsId: parseInt(a), tagsName: editTag[i] });
        });
        this.setState({
          knowInitValues: setdata,
          checked: editedData.ispublished === 0,
          tags: array,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  fileUpload = (a) => {
    try {
      const { setByte, imgByte, removefile } = this.props;
      const { imgError } = this.state;
      if (imgByte !== "") {
        return (
          <span className="optionui" key={"h"}>
            <Image src={imgByte} width={50} height={30} />
            <CloseOutlined className="pointer" onClick={removefile} />
          </span>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png, .svg"
          image={true}
          sendByte={setByte}
          elements={
            <div className={`main-div ${imgError ? "error" : ""}`}>
              <UploadOutlined />
              <h3>
                {CmsConst.upload}
                {a ? a : CmsConst.img}
              </h3>
            </div>
          }
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  checkUI = (checked) => (
    <div className="field" key={"c"}>
      <Checkbox
        onChange={this.onChange}
        checked={checked}
        text={CmsConst.pub}
      />
    </div>
  );
  handleClose = (val) =>
    this.setState({
      tags: this.state.tags.filter((tag) => tag.tagsName !== val.tagsName),
    });
  showInput = () => this.setState({ inputVisible: true });
  handleInputConfirm = () => {
    try {
      const { inputValue } = this.state;
      let { tags } = this.state;
      if (
        inputValue &&
        (tags.length === 0
          ? true
          : tags.findIndex((x) => x.tagsName === inputValue) === -1)
      ) {
        tags.push({ tagsId: 0, tagsName: inputValue });
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: "",
        tagerror: tags.length !== 0 ? false : true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  tagUI = () => {
    try {
      // const { tags, inputVisible, inputValue } = this.state;
      return this.tagsUI();
    } catch (error) {
      console.log(error);
    }
  };
  tagsUI = () => {
    try {
      const { tags } = this.state;
      return tags?.map((a, i) => {
        const tagElem = (
          <Tag
            key={i}
            closable
            onClose={(e) => {
              e.preventDefault();
              this.handleClose(a);
            }}
          >
            {a.tagsName}
          </Tag>
        );
        return (
          <span key={i} classNam="tagSpan">
            {tagElem}
          </span>
        );
      });
    } catch (error) {
      console.log();
    }
  };
  autohandle = (val, option, setFieldValue) => {
    try {
      setFieldValue("category", option.value);
      setFieldValue("categoryId", option.id);
    } catch (error) {
      console.log(error);
    }
  };
  addCategory = async (val, setFieldValue) => {
    try {
      let sendData = {
        categoryId: 0,
        categoryName: val,
      };
      await this.props.saveCategory(sendData);
      setFieldValue("category", "");
      setFieldValue("categoryId", 0);
      await this.props.categoryList(sendData);
      this.props.onCancel();
    } catch (error) {
      console.log(error);
    }
  };
  submiKnowledge = async (values, { setSubmitting }) => {
    try {
      const { tags, checked } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = true;
      if (tags.length === 0) {
        flag = false;
        this.setState({ tagerror: true });
      }
      if (values.categoryId === 0) {
        flag = false;
        message.error("please select Category");
      }
      if (flag === true) {
        let sendData = {
          knowId: values.knowId,
          categoryId: values.categoryId,
          tagsname: tags,
          faqTitle: values.faqTitle,
          faqDescription: values.faqDesc,
          ispublished: checked,
          createdBy: userId,
        };
        this.props.onOk(sendData);
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  knowledgeUI = () => {
    try {
      const {
        checked,
        knowInitValues,
        btnDisable,
        inputVisible,
        inputValue,
        tagerror,
        selectCat,
        tags,
      } = this.state;
      return (
        <Formik
          initialValues={knowInitValues}
          validationSchema={knowledgeSchema}
          onSubmit={this.submiKnowledge}
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
                  title={CmsConst.cat}
                  className={errors.category && touched.category ? "empty" : ""}
                />
                <div className="catDIv">
                  <AutoComplete
                    onBlur={handleBlur}
                    name="category"
                    value={values.category}
                    handleChange={(val) => {
                      setFieldValue("category", val);
                      setFieldValue("categoryId", 0);
                    }}
                    onSelect={(val, option) =>
                      this.autohandle(val, option, setFieldValue)
                    }
                    selectData={selectCat}
                    className={
                      errors.category && touched.category ? "autoempty" : ""
                    }
                  />
                  {values.categoryId === 0 && (
                    <div
                      className="addButton pointer"
                      onClick={() =>
                        values.category.trim() !== "" &&
                        this.addCategory(values.category, setFieldValue)
                      }
                    >
                      <PlusOutlined />
                    </div>
                  )}
                </div>
                <div className="tagsDiv">
                  {this.tagUI()}
                  {inputVisible && (
                    <AddTag
                      type="text"
                      size="small"
                      value={inputValue}
                      onChange={(e) =>
                        this.setState({ inputValue: e.target.value.trim() })
                      }
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      className={`site-tag-plus ${tagerror ? "empty" : ""}`}
                    >
                      <PlusOutlined /> Add Tag*
                    </Tag>
                  )}
                </div>
                {values.categoryId !== 0 && tags.length > 0 && (
                  <>
                    <Label
                      title={CmsConst.faq + CmsConst.ft}
                      className={
                        errors.faqTitle && touched.faqTitle ? "empty" : ""
                      }
                    />
                    <Input
                      value={values.faqTitle}
                      name="faqTitle"
                      handleChange={handleChange}
                      max={500}
                      className={
                        errors.faqTitle && touched.faqTitle ? "empty" : ""
                      }
                    />
                    <Label
                      title={CmsConst.faq + CmsConst.desc}
                      className={
                        errors.faqDesc && touched.faqDesc ? "empty" : ""
                      }
                    />
                    <RichTextBox
                      value={values.faqDesc}
                      onBlur={handleBlur}
                      changeTxt={(val) => setFieldValue("faqDesc", val)}
                      className={
                        errors.faqDesc && touched.faqDesc ? "empty" : ""
                      }
                    />
                  </>
                )}
              </div>
              {values.categoryId !== 0 && tags.length > 0 && (
                <>
                  <div className="pointer">
                    {this.fileUpload(CmsConst.icon)}
                  </div>
                  {this.checkUI(checked)}
                  <div className="btnDiv">
                    <Button type="submit" disabled={btnDisable}>
                      {ButtonConst.submit}
                    </Button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      );
    } catch (error) {
      console.log(error);
    }
  };
  submiTestimonial = async (values, { setSubmitting }) => {
    try {
      const { checked } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let sendDeta = {
        name: values.addName,
        testimonialId: values.tstiId ? values.tstiId : 0,
        companyName: values.cName,
        description: values.description,
        publishStatus: checked === false ? 1 : 0,
        createdBy: userId,
      };
      this.props.onOk(sendDeta);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  tempUI = () => {
    const { checked, teInitValues, btnDisable } = this.state;
    return (
      <Formik
        initialValues={teInitValues}
        validationSchema={TestimonialSchema}
        onSubmit={this.submiTestimonial}
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
            <div className="field" key={"rag"}>
              <Label
                title={CmsConst.name}
                className={errors.addName && touched.addName ? "empty" : ""}
              />
              <Input
                value={values.addName}
                name="addName"
                handleChange={handleChange}
                onBlur={handleBlur}
                max={100}
                className={errors.addName && touched.addName ? "empty" : ""}
              />
              <Label
                title={CmsConst.cname}
                className={errors.cName && touched.cName ? "empty" : ""}
              />
              <Input
                value={values.cName}
                name="cName"
                handleChange={handleChange}
                onBlur={handleBlur}
                max={500}
                className={errors.cName && touched.cName ? "empty" : ""}
              />
              <Label
                title={CmsConst.desc}
                className={
                  errors.description && touched.description ? "empty" : ""
                }
              />
              <RichTextBox
                value={values.description}
                onBlur={handleBlur}
                changeTxt={(val) => setFieldValue("description", val)}
                className={
                  errors.description && touched.description ? "empty" : ""
                }
              />
            </div>
            <div className="pointer">{this.fileUpload(CmsConst.icon)}</div>
            {this.checkUI(checked)}
            <div className="btnDiv">
              <Button type="submit" disabled={btnDisable}>
                {ButtonConst.submit}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  onChange = () => this.setState({ checked: !this.state.checked });
  changeTxt = (val, name) => this.setState({ [name]: val });
  submit = () => {
    try {
      const { count, imgByte } = this.props;
      const { position } = this.state;
      let flag = true;
      if (count === 0 || count === 3) {
        if (imgByte === "") {
          flag = false;
          this.setState({ imgError: true });
        }
        if (position <= 0 && count === 3) {
          flag = false;
          this.setState({ posiError: true });
        }
      }
      if (flag) {
        let sendData = {
          offersid: 0,
          offerposition: parseInt(position),
          createdby: userId,
        };
        this.props.onOk(sendData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { onCancel, title, visible, count } = this.props;
    const { position, posiError } = this.state;
    return (
      <div className="crmAdd" id="add-Form">
        <Modal
          visible={visible}
          onCancel={onCancel}
          title={title}
          footer={false}
          centered
          getContainer={() => document.getElementById("add-Form")}
        >
          <>
            {(count === 0 || count === 3) && (
              <div className="pointer">{this.fileUpload()}</div>
            )}
            {count === 3 && (
              <div className="field">
                <Label
                  title={CmsConst.pos}
                  className={posiError ? "empty" : ""}
                />
                <Input
                  placeholder={CmsConst.position}
                  value={position}
                  type="number"
                  className={posiError ? "empty" : ""}
                  onChange={(e) => {
                    this.changeTxt(e.target.value, "position");
                    this.setState({
                      posiError: e.target.value <= 0 ? true : false,
                    });
                  }}
                />
                {posiError && (
                  <div className="error">{"Enter Number greter than 0"}</div>
                )}
              </div>
            )}
            {count === 1 && this.knowledgeUI()}
            {count === 2 && this.tempUI()}
          </>
          <div className="btnDiv">
            {count === 1 || count === 2 ? (
              <></>
            ) : (
              <Button onClick={this.submit}>{ButtonConst.submit}</Button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  catList: state.cms.categoryList,
});
const mapDispatchToProps = (dispatch) => ({
  saveCategory: (payload) => dispatch(saveCategory(payload)),
  categoryList: (payload) => dispatch(categoryList(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CRMForm)
);
