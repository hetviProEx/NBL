import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Row, Col } from "antd";
import {
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { ModalContainer } from "./style";
import { Button, ExcelUpload } from "components/Form";
import { ButtonConst } from "App/AppConstant";

class TransferModal extends Component {
  render() {
    const { onOk, onCancel, title, visible, download } = this.props;
    return (
      <ModalContainer>
        <div id="transferModal-form">
          <Modal
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            title={title}
            centered
            getContainer={() => document.getElementById("transferModal-form")}
          >
            <div className="main-div">
              <Row>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className="anime">
                  <Button onClick={download}>
                    <VerticalAlignBottomOutlined />
                    {ButtonConst.dowExTamp}
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className="anime">
                  <ExcelUpload
                    accept=".xlsx,.xls,.csv"
                    close={onCancel}
                    elements={
                      <Button>
                        <VerticalAlignTopOutlined />
                        {ButtonConst.upExTamp}
                      </Button>
                    }
                  />
                </Col>
              </Row>
            </div>
          </Modal>
        </div>
      </ModalContainer>
    );
  }
}

export default withRouter(TransferModal);
