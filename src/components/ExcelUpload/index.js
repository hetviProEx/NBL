import React, { Component } from "react";
import { Upload } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAuthUserID } from "modules/helper";
import { getProspect, importProspect } from "redux/crm/action";
var userID = getAuthUserID();

class ExcelUpload extends Component {
  async componentDidMount() {
    userID = userID ? userID : getAuthUserID();
  }
  beforeUpload = async (file) => {
    try {
      var formdata = new FormData();
      formdata.append("excelfile", file);
      formdata.append("userId", userID);
      formdata.append("createdBy", userID);
      this.uploadData(formdata);
      this.props.close();
    } catch (error) {
      console.log(error);
    }
  };
  uploadData = async (formdata) => {
    let paramet = {
      parameter: userID.toString(),
      pageSize: "10",
      page: "1",
      sortColumn: "id",
      search: "",
    };
    await this.props.importProspect(formdata);
    await this.props.getProspect(paramet);
  };
  render() {
    const { elements, accept } = this.props;
    const props = { beforeUpload: this.beforeUpload };
    return (
      <Upload showUploadList={false} {...props} accept={accept}>
        {elements}
      </Upload>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProspect: (payload) => dispatch(getProspect(payload)),
  importProspect: (payload) => dispatch(importProspect(payload)),
});

export default withRouter(connect(null, mapDispatchToProps)(ExcelUpload));
