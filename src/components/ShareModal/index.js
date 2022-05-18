import React, { Component } from "react";
import { Modal, Image } from "antd";
import { ShareModalStyle } from "./style";
import {
  whatsapp,
  facebook,
  instagram,
  twitter,
  mail,
} from "components/Images";

class ShareModale extends Component {
  render() {
    const { onOk, onCancel, title } = this.props;
    return (
      <ShareModalStyle>
        <div id="share-Modal">
          <Modal
            visible={true}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            title={title}
            centered
            getContainer={() => document.getElementById("share-Modal")}
          >
            <div className="socialDiv">
              <div className="IconsDiv">
                <Image src={whatsapp} preview={false} />
              </div>
              <div className="IconsDiv">
                <Image src={facebook} preview={false} />
              </div>
              <div className="IconsDiv">
                <Image src={instagram} preview={false} />
              </div>
              <div className="IconsDiv">
                <Image src={twitter} preview={false} />
              </div>
              <div className="IconsDiv">
                <Image src={mail} preview={false} />
              </div>
            </div>
          </Modal>
        </div>
      </ShareModalStyle>
    );
  }
}
export default ShareModale;
