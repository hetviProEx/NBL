import React, { Component } from "react";
import { Upload } from "antd";
import { withRouter } from "react-router-dom";

class FileUpload extends Component {
  beforeUpload = async (file) => {
    try {
      const { image, video, pdf } = this.props;
      let name = file?.name?.replace(/ /g, "");
      if (image || video || pdf) {
        // if (image && file.size > 3000000)
        //   message.error("Select smaller size image(less then 3mb)");
        // else if (video && file.size > 2000000)
        //   message.error("Select smaller size video(less then 500kb)");
        // else {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            let base64 = name + "," + reader.result?.split("base64,")[1];
            this.props.sendByte(reader.result, name, base64);
          };
        // }
      } 
      // else if (pdf) {
      //   let reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onloadend = () => {
      //     let base64 = name + "," + reader.result?.split("base64,")[1];
      //     this.props.sendByte(reader.result, name, base64);
      //   };
      // }
      // let formdata = new FormData();
      // let ext = file.name?.split(".");
      // let newName = new Date().getTime();
      // formdata.append("file", file, newName + "." + ext[ext.length - 1]);
      // console.log(formdata);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { elements, accept, className } = this.props;
    const props = { beforeUpload: this.beforeUpload };
    return (
      <Upload
        showUploadList={false}
        {...props}
        accept={accept}
        className={className ? className : ""}
      >
        {elements}
      </Upload>
    );
  }
}

export default withRouter(FileUpload);
