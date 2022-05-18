import React, { Component } from "react";
import { Modal } from "antd";

class CommentModal extends Component {
    render(){
        const {visible ,remarek ,onOk,onCancel}=this.props;
        return(
            <div id="comment-modal">
                 <Modal
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            title={""}
            centered
            getContainer={() => document.getElementById("comment-modal")}
          >
              {remarek}
          </Modal>

            </div>
        )
    }
}
export default CommentModal;