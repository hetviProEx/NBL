import React, { Component } from "react";
import { Modal, Image, Table as ViewTable } from "antd";

import { ModalStyle } from "./style";
import {
  ProsConst,
  Leadconst,
  demConst,
  salesConst,
  UserConst,
  CommissionConst,
  PromoConst,
  pocConst,
  adminConst,
} from "./constant";
import { configVar } from "modules/config";
const { Column } = ViewTable;
class ViewModal extends Component {
  trUI = (a, b) => {
    try {
      return (
        <tr>
          <td className="modelFront">{a}</td>
          <td className="space"> {ProsConst.col}</td>
          <td>{b}</td>
        </tr>
      );
    } catch (error) {
      console.log(error);
    }
  };
  graphicsUi = (a, b, c) => {
    try {
      let uplodname = a === "Receipt" ? c?.split("/") : "";
      let uplName =
        uplodname.length > 0 ? uplodname[uplodname.length - 1]?.split(".") : "";
      return (
        <tr>
          <td className="modelFront">{a}</td>
          <td className="space"> {ProsConst.col}</td>
          {a === "Receipt" &&
            (uplName[uplName.length - 1] !== "pdf" ? (
              <td>
                <Image height={"5em"} src={b} alt="img" />
              </td>
            ) : (
              <td className="pdfDiv">
                <a
                  href={b}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer"
                >
                  {uplodname[uplodname.length - 1]}
                </a>
              </td>
            ))}
          {c === "description" && (
            <td>
              <p dangerouslySetInnerHTML={{ __html: b }}></p>
            </td>
          )}
          {c === "image" && b !== "" && (
            <td>
              <Image height={"5em"} src={b} alt="img" />
            </td>
          )}
        </tr>
      );
    } catch (error) {
      console.log(error);
    }
  };
  columns = () => {
    try {
      return (
        <>
          <Column
            title={pocConst.srNo}
            dataIndex={"srNo"}
            sorter={(a, b) => b.srNo - a.srNo}
          />
          <Column
            title={pocConst.user}
            dataIndex={"user"}
            sorter={(a, b) => a.user.localeCompare(b.user)}
          />
          <Column
            title={pocConst.partsName}
            dataIndex={"partnerName"}
            sorter={(a, b) => a.partnerName.localeCompare(b.partnerName)}
          />
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { onOk, onCancel, title, data, visible } = this.props;
    let tableData = [];
    if (title === "POC")
      data.partnername?.split(",")?.forEach((a, i) => {
        tableData.push({ srNo: i + 1, user: data.username, partnerName: a });
      });

    return (
      <ModalStyle>
        <div id="dataModal-form">
          <Modal
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            title={title}
            centered
            getContainer={() => document.getElementById("dataModal-form")}
          >
            {title !== "POC" ? (
              <table>
                {title === "Prospect" && (
                  <>
                    {this.trUI(ProsConst.pName, data?.customerName)}
                    {this.trUI(ProsConst.comName, data?.companyName)}
                    {this.trUI(ProsConst.mNum, data?.mobileNo)}
                    {this.trUI(ProsConst.src, data?.source)}
                    {this.trUI(ProsConst.email, data?.emailId)}
                    {data?.prospectDate !== "0001-01-01T00:00:00" &&
                      this.trUI(
                        ProsConst.prosDate,
                        data?.prospectDate?.split("T")[0]
                      )}
                    {/* {this.trUI(ProsConst.prosDate, data?.prospectDate)} */}
                    {this.trUI(ProsConst.add, data?.address)}
                  </>
                )}
                {title === "Leads" && (
                  <>
                    {this.trUI(Leadconst.cSel, data?.customerName)}
                    {this.trUI(ProsConst.comName, data?.company)}
                    {this.trUI(Leadconst.lType, data?.leadName)}
                    {this.trUI(Leadconst.Pro, data?.products)}
                    {data?.leadDate !== "0001-01-01T00:00:00" &&
                      this.trUI(
                        Leadconst.leDate,
                        data?.leadDate?.split("T")[0]
                      )}
                    {this.trUI(Leadconst.rem, data?.remarks)}
                  </>
                )}
                {title === "Meeting" && (
                  <>
                    {this.trUI(demConst.cName, data?.customerName)}
                    {this.trUI(demConst.Pro, data?.productName)}
                    {this.trUI(demConst.contact, data?.contact)}
                    {data?.meetingDate !== "0001-01-01T00:00:00" &&
                      this.trUI(
                        demConst.meetDate,
                        data?.meetingDate?.split("T")[0]
                      )}
                    {this.trUI(demConst.dem, data?.demo ? "Yes" : "No")}
                    {this.trUI(demConst.sal, data?.sale ? "Yes" : "No")}
                    {data?.startDate !== "0001-01-01T00:00:00" &&
                      this.trUI(
                        demConst.StDate,
                        data?.startDate?.split("T")[0]
                      )}
                    {data?.endDate !== "0001-01-01T00:00:00" &&
                      this.trUI(demConst.enDate, data?.endDate?.split("T")[0])}
                    {this.trUI(demConst.rem, data?.remarks)}
                  </>
                )}
                {title === "Sale" && (
                  <>
                    {this.trUI(salesConst.cusName, data?.customerName)}
                    {this.trUI(
                      salesConst.gst,
                      data?.gtype === 0 ? "Not Registered" : "Registered"
                    )}
                    {this.trUI(salesConst.gstNo, data?.gst)}
                    {this.trUI(salesConst.pro, data?.productName)}
                    {this.trUI(salesConst.subscTY, data?.subscription)}
                    {this.trUI(salesConst.timePri, data?.timePri)}
                    {this.trUI(salesConst.SalDate, data?.salesDate)}
                    {this.trUI(salesConst.traId, data?.transactionID)}
                    {this.trUI(salesConst.amount, data?.totalamount)}
                    {this.trUI(salesConst.package, data?.packag)}
                    {this.trUI(salesConst.packPri, data?.packagPri)}
                    {this.graphicsUi(
                      salesConst.receipt,
                      data?.uploadreceipt !== ""
                        ? configVar.BASE_URL + data?.uploadreceipt
                        : "",
                      data?.uploadreceipt
                    )}
                  </>
                )}
                {title === "UserList" && (
                  <>
                    {this.trUI(UserConst.emailId, data?.emailId)}
                    {this.trUI(UserConst.firstName, data?.firstname)}
                    {data?.lastName &&
                      this.trUI(UserConst.lastName, data?.lastName)}
                    {data?.middleName &&
                      this.trUI(UserConst.middleName, data?.middleName)}
                    {this.trUI(UserConst.mobile, data?.mobile)}
                  </>
                )}
                {title === "Commission" && (
                  <>
                    {this.trUI(CommissionConst.partName, data?.partnerName)}
                    {this.trUI(CommissionConst.leadName, data?.customerName)}
                    {this.trUI(CommissionConst.tranId, data?.transactionID)}
                    {this.trUI(CommissionConst.salesDate, data?.salesDate)}
                    {this.trUI(CommissionConst.gstNo, data?.gst)}
                    {this.trUI(CommissionConst.product, data?.productName)}
                    {this.trUI(
                      CommissionConst.subscrType,
                      data?.subscriptionType
                    )}
                    {this.trUI(CommissionConst.timePer, data?.timePeriod)}
                    {this.trUI(CommissionConst.toAmo, data?.totalamount)}
                    {this.trUI(
                      CommissionConst.commiType,
                      data?.commissionType === 1 ? "%" : "₹"
                    )}
                    {this.trUI(CommissionConst.amount, data?.totalCommission)}
                    {this.trUI(CommissionConst.remarks, data?.remarks)}
                    {this.graphicsUi(
                      CommissionConst.receipt,
                      data?.receipt !== ""
                        ? configVar.BASE_URL + data?.receipt
                        : "",
                      data?.receipt
                    )}
                  </>
                )}
                {title === "Promo Code" && (
                  <>
                    {this.trUI(title, data?.promocode)}
                    {this.trUI(PromoConst.promoType, data?.type)}
                    {this.trUI(
                      PromoConst.startDate,
                      data?.startDate?.split("T")[0]
                    )}
                    {this.trUI(
                      PromoConst.endDate,
                      data?.endDate?.split("T")[0]
                    )}
                    {this.trUI(PromoConst.dec, data?.description)}
                  </>
                )}
                {/* {title === "poc" && (
                  <>
                    {this.trUI(pocConst.user, data?.username)}
                    {this.trUI(pocConst.partsName, data?.partnername)}
                  </>
                )} */}
                {title === "Knowledge Base" && (
                  <>
                    {this.trUI(
                      adminConst.faq + adminConst.cat,
                      data?.categoryName
                    )}
                    {this.trUI(adminConst.tag, data?.tags)}
                    {this.trUI(
                      adminConst.faq + adminConst.title,
                      data?.faqTitle
                    )}
                    {this.graphicsUi(
                      adminConst.faq + adminConst.desc,
                      data?.faqDescription,
                      adminConst.desc.toLocaleLowerCase()
                    )}
                    {this.trUI(
                      adminConst.pub,
                      data?.ispublished === 0 ? "yes" : "No"
                    )}
                    {this.graphicsUi(
                      adminConst.img,
                      data?.uploadImage !== ""
                        ? configVar.BASE_URL + data?.uploadImage
                        : "",
                      adminConst.img.toLocaleLowerCase()
                    )}
                  </>
                )}
                {title === "Testimonials" && (
                  <>
                    {this.trUI(adminConst.name, data?.name)}
                    {this.trUI(adminConst.cmpName, data?.companyName)}
                    {this.graphicsUi(
                      adminConst.desc,
                      data?.description,
                      adminConst.desc.toLocaleLowerCase()
                    )}
                    {this.trUI(
                      adminConst.pub,
                      data?.publishStatus === 0 ? "yes" : "No"
                    )}
                    {this.graphicsUi(
                      adminConst.img,
                      data?.icon !== "" ? configVar.BASE_URL + data?.icon : "",
                      adminConst.img.toLocaleLowerCase()
                    )}
                  </>
                )}
              </table>
            ) : (
              <div className="viewTable">
                <ViewTable
                  bordered
                  rowClassName={"anime"}
                  pagination={false}
                  // onChange={this.handleTable}
                  dataSource={tableData}
                >
                  {this.columns()}
                </ViewTable>
              </div>
            )}
          </Modal>
        </div>
      </ModalStyle>
    );
  }
}

export default ViewModal;
