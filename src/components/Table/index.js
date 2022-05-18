import React, { Component } from "react";
import { Table, Tag } from "antd";
import { withRouter } from "react-router-dom";
import {
  MenuOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import TableStyle from "./style";
import { TabConst } from "./constant";
import { configVar } from "modules/config";
import { getAuthRole } from "modules/helper";
import { RenderDrop } from "components/Form";

var role = getAuthRole();
const { Column } = Table;

class TableUI extends Component {
  constructor(props) {
    super(props);
    this.state = { pagination: { current: 1, pageSize: 10 } };
  }
  componentDidMount() {
    role = role ? role : getAuthRole();
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
  handleTable = (pagination) => this.setState({ pagination });
  statusUI = (a, type) => {
    let flag = a.isActive === 0 || (a.status === 0 && type !== "partners");
    return type === "Prospect" || type === "Leads" ? (
      a.status !== "-" ? (
        <Tag color="blue" className="tagUI">
          {a.status}
        </Tag>
      ) : (
        "---"
      )
    ) : (
      <div className="statusUI">
        <span className={flag ? "green" : "red"}>
          {flag ? "Active" : "Deactive"}
        </span>
      </div>
    );
  };
  salesStatus = (a, type) => {
    try {
      return a.status === 0 ? (
        <Tag icon={<SyncOutlined spin />} color="processing" className="tagUI">
          {"Pending"}
        </Tag>
      ) : a.status === 1 ? (
        <Tag icon={<CheckCircleOutlined />} color="success" className="tagUI">
          {"Approved"}
        </Tag>
      ) : a.status === 3 ? (
        <Tag
          icon={<QuestionCircleOutlined />}
          color="warning"
          className="tagUI"
        >
          {"Partially Approved"}
        </Tag>
      ) : (
        a.status === 2 && (
          <Tag icon={<CloseCircleOutlined />} color="error" className="tagUI">
            {"Reject"}
          </Tag>
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  adminActUI = (img, text) => (
    <>
      <i className={"fas " + img}></i>
      <span className="text">{text}</span>
    </>
  );
  adminActionUI = (a, type) => {
    try {
      return (
        <div className="actionUI">
          <RenderDrop
            overlayClassName="actionUI"
            item={<MenuOutlined className="dash" />}
            data={
              type === "partners"
                ? [
                  this.setRigts("partnersview") && (
                    <div
                      className="actionBtn"
                      onClick={() => this.props.viewRecord(a)}
                    >
                      {this.adminActUI("fa-eye", TabConst.view)}
                    </div>
                  ),
                  a.isActive === 0 && this.setRigts("partnersedit") && (
                    <div
                      className="actionBtn"
                      onClick={() => this.props.editRecord(a.id)}
                    >
                      {this.adminActUI("fa-edit", TabConst.edit)}
                    </div>
                  ),
                  <div
                    className="actionBtn"
                    onClick={() =>
                      this.props.history.push(
                        "wallet/" + window.btoa(a.partnerId)
                      )
                    }
                  >
                    {this.adminActUI("fa-wallet", TabConst.wallet)}
                  </div>,
                  <div
                    className="actionBtn"
                    onClick={() =>
                      this.props.history.push(
                        "/prospect/" + window.btoa(a.id)
                      )
                    }
                  >
                    {this.adminActUI("fa-address-book", TabConst.prospect)}
                  </div>,
                  <div
                    className="actionBtn"
                    onClick={() =>
                      this.props.history.push(
                        "/admin-leads/" + window.btoa(a.id)
                      )
                    }
                  >
                    {this.adminActUI("fa-calendar-week", TabConst.leads)}
                  </div>,
                  <div
                    className="actionBtn"
                    onClick={() =>
                      this.props.history.push("/sales/" + window.btoa(a.id))
                    }
                  >
                    {this.adminActUI("fa-poll", TabConst.sales)}
                  </div>,
                  this.setRigts("partnersdelete") && (
                    <div
                      className="actionBtn"
                      onClick={() =>
                        this.props.deleteRecord(a.id, a.isActive)
                      }
                    >
                      {this.adminActUI(
                        a.isActive === 1 ? "fa-user-cog" : "fa-user-times",
                        a.isActive === 1
                          ? TabConst.activate
                          : TabConst.deactivate
                      )}
                    </div>
                  ),
                ]
                : [
                  (type === "userList" ||
                    type === "commission" ||
                    type === "pointcont") &&
                  this.setRigts(
                    type === "userList" ? "usersview" : "pocview"
                  ) && (
                    <div
                      className="actionBtn"
                      onClick={() => this.props.viewRecord(a.id)}
                    >
                      {this.adminActUI("fa-eye", TabConst.view)}
                    </div>
                  ),
                  // type === "request" && (
                  //   <div
                  //     className="actionBtn"
                  //     // onClick={() => this.props.viewRecord(a.id)}
                  //   >
                  //     {this.adminActUI("fa-eye", TabConst.view)}
                  //   </div>
                  // ),
                  (type === "userList" && !this.setRigts("usersedit")) ||
                    (type === "pointcont" &&
                      (a.status === 1 || !this.setRigts("pocedit"))) ||
                    type === "commission" ||
                    type === "request" ? (
                    ""
                  ) : (
                    <div
                      className="actionBtn"
                      onClick={() => this.props.editRecord(a.id)}
                    >
                      {this.adminActUI("fa-edit", TabConst.edit)}
                    </div>
                  ),
                  (type === "userList" && !this.setRigts("usersdelete")) ||
                    (type === "pointcont" && !this.setRigts("pocdelete")) ||
                    type === "commission" ||
                    type === "request" ? (
                    ""
                  ) : (
                    <div
                      className="actionBtn"
                      onClick={() =>
                        this.props.deleteRecord(
                          a.id,
                          type === "pointcont" && a.status
                        )
                      }
                    >
                      {this.adminActUI("fa-trash-alt", TabConst.delete)}
                    </div>
                  ),
                  (type === "commission" || type === "request") &&
                  a.status === 0 && (
                    <div
                      className="actionBtn"
                      onClick={() =>
                        this.props.approv(
                          true,
                          a.id,
                          type === "request" ? 1 : true,
                          type === "request"
                            ? a.withdrawalRequest
                            : a.totalAmount
                        )
                      }
                    >
                      {this.adminActUI("fa-thumbs-up", TabConst.approv)}
                    </div>
                  ),
                  (type === "commission" || type === "request") &&
                  a.status === 0 && (
                    <div
                      className="actionBtn"
                      onClick={() =>
                        this.props.approv(
                          true,
                          a.id,
                          type === "request" ? 2 : false,
                          0
                        )
                      }
                    >
                      {this.adminActUI("fa-thumbs-down", TabConst.reject)}
                    </div>
                  ),
                  (a.status === 1 || a.status === 3) && type === "request" && (
                    <div
                      className="actionBtn"
                      onClick={() => this.props.download(a.proof)}
                    >
                      {this.adminActUI("fa-download", TabConst.download)}
                    </div>
                  ),
                  (a.status === 3) && type === "request" && (
                    <div
                      className="actionBtn"
                    // onClick={() => {
                    //   this.props.approv(
                    //     true,
                    //     a.adminWithdrawalId,
                    //     type === "request" ? 1 : true,
                    //     type === "request"
                    //       ? a.withdrawalRequest - a.approvedAmount
                    //       : a.totalAmount
                    //   );
                    // }
                    // }
                    >
                      {this.adminActUI("fa fa-inr", TabConst.pay)}
                    </div>
                  ),
                  type === "request" && a.status === 2 && (
                    <div
                      className="actionBtn"
                      onClick={() =>
                        this.props.commentRecord(a.remarks ? a.remarks : "")
                      }
                    >
                      {this.adminActUI(
                        "fas fa-comment-dots",
                        TabConst.comment
                      )}
                    </div>
                  ),
                  // type === "request" && a.status !== 3 && (
                  //   <div
                  //     className="actionBtn"
                  //     // onClick={() => this.props.approv(true, a.id, false, 0)}
                  //   >
                  //     {this.adminActUI("fa-check", TabConst.parAppro)}
                  //   </div>
                  // ),
                ]
            }
          />
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  partnerAction = (a, type) => {
    try {
      return (
        <div className="actionUI">
          <RenderDrop
            overlayClassName="actionUI"
            item={<MenuOutlined className="dash" />}
            data={[
              <div
                className="actionBtn"
                onClick={() => this.props.showModal(a.id)}
              >
                {this.adminActUI("fa-eye", TabConst.view)}
              </div>,

              <div
                className="actionBtn"
                onClick={() => this.props.editRecord(a.id)}
              >
                {this.adminActUI("fa-edit", TabConst.edit)}
              </div>,
              (type === "Prospect" ||
                type === "Leads" ||
                type === "Meetings") && (
                <div
                  className="actionBtn"
                  onClick={() => this.props.setLeads(a.id, a.isActive, type)}
                >
                  {this.adminActUI(
                    a.isActive === 1 ? "fa-user-cog" : "fa-user-times",
                    a.isActive === 1 ? TabConst.activate : TabConst.deactivate
                  )}
                </div>
              ),
              // && type !== "Leads"// && type !== "Meetings"

              <div
                className="actionBtn"
                onClick={() => this.props.deleteRecord(a.id)}
              >
                {this.adminActUI("fa-trash-alt", TabConst.delete)}
              </div>,
              (((type === "Prospect" || type === "Leads") &&
                a.isActive === 0) ||
                type === "Meetings") && (
                <div
                  className="actionBtn"
                  onClick={() => this.props.creatDirect(a.id)}
                >
                  {this.adminActUI(
                    "fa-plus-circle",
                    type === "Prospect"
                      ? TabConst.creLead
                      : type === "Leads"
                        ? TabConst.creMeeting
                        : TabConst.creSales
                  )}
                </div>
              ),
            ]}
          />
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  walletAction = (a, type) => {
    try {
      return (
        <div className="actionUI">
          <RenderDrop
            overlayClassName="actionUI"
            item={<MenuOutlined className="dash" />}
            data={[
              a.status === 0 && (
                <div
                  className="actionBtn"
                  onClick={() => this.props.deleteRecord(a.id)}
                >
                  {this.adminActUI("fa-times", TabConst.cancel)}
                </div>
              ),
              (a.status === 1 || a.status === 3) && (
                <a
                  href={configVar.BASE_URL.slice("/", -1) + a.proof}
                  className="actionBtn"
                  target="_blank"
                  download
                >
                  {this.adminActUI("fa-download", TabConst.download)}
                </a>
              ),
              a.status === 2 && (
                <div
                  className="actionBtn"
                  onClick={() =>
                    this.props.commentRecord(a.remarks ? a.remarks : "")
                  }
                >
                  {this.adminActUI("fas fa-comment-dots", TabConst.comment)}
                </div>
              ),
            ]}
          />
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  contactUI = (a) => {
    try {
      let contact = a?.mobileNo?.split(", ");
      return contact?.map((x, i) => (
        <a
          key={i}
          href={`${x.match(/^[0-9\-+]{8,14}$/) && i === 0
            ? "tel:" + x
            : x.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") && i === 1
              ? "mailto:" + x
              : ""
            }`}
        >
          {i === 0 ? x + `${contact.length > 1 ? ", " : ""}` : x}
        </a>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  columns = () => {
    try {
      const { type, print, useractionUI } = this.props;
      return (
        <>
          <Column
            title={TabConst.sr}
            dataIndex={"key"}
            sorter={(a, b) => b.key - a.key}
          />
          {type === "Prospect" && (
            <>
              <Column
                title={TabConst.ProName}
                dataIndex={"customerName"}
                sorter={(a, b) => a.customerName.localeCompare(b.customerName)}
              />
              <Column
                title={TabConst.comName}
                dataIndex={"companyName"}
                sorter={(a, b) => a.companyName.localeCompare(b.companyName)}
              />
              <Column
                title={TabConst.contDet}
                render={(record, i) => this.contactUI(record)}
                className="contactUI"
              />
            </>
          )}
          {type === "Leads" && (
            <>
              <Column
                title={TabConst.liedName}
                dataIndex={"customerName"}
                sorter={(a, b) => a.customerName.localeCompare(b.customerName)}
              />
              <Column
                title={TabConst.leadType}
                dataIndex={"leadName"}
                sorter={(a, b) => a.leadName.localeCompare(b.leadName)}
              />
              <Column
                title={TabConst.pro}
                dataIndex={"products"}
                sorter={(a, b) => a.products.localeCompare(b.products)}
              />
              <Column
                title={TabConst.comName}
                dataIndex={"company"}
                sorter={(a, b) => a.company.localeCompare(b.company)}
              />
            </>
          )}
          {(type === "Prospect" || type === "Leads") && (
            <>
              <Column title={TabConst.create} dataIndex={"createdBy"} />
              <Column title={TabConst.modify} dataIndex={"modifiedBy"} />
              {useractionUI && (
                <Column
                  title={TabConst.status}
                  render={(record, i) => this.statusUI(record, type)}
                // dataIndex={"status"}
                />
              )}
            </>
          )}
          {type === "Meetings" && (
            <>
              <Column
                title={TabConst.liedName}
                dataIndex={"customerName"}
                sorter={(a, b) => a.customerName.localeCompare(b.customerName)}
              />
              <Column
                title={TabConst.pro}
                dataIndex={"productName"}
                sorter={(a, b) => a.productName.localeCompare(b.productName)}
              />
              <Column
                title={TabConst.demo}
                dataIndex={"demos"}
                sorter={(a, b) => a.demos.localeCompare(b.demos)}
              />
              <Column
                title={TabConst.sale}
                dataIndex={"sales"}
                sorter={(a, b) => a.sales.localeCompare(b.sales)}
              />
              <Column title={TabConst.create} dataIndex={"createdBy"} />
              <Column title={TabConst.modify} dataIndex={"modifiedBy"} />
            </>
          )}
          {type === "Promo" && (
            <>
              <Column
                title={TabConst.promoCode}
                dataIndex={"promocode"}
                sorter={(a, b) => a.promocode.localeCompare(b.promocode)}
              />
              <Column
                title={TabConst.discount}
                dataIndex={"type"}
                sorter={(a, b) => a.type.localeCompare(b.type)}
              />
              <Column title={TabConst.create} dataIndex={"createdBy"} />
            </>
          )}
          {type === "sales" && (
            <>
              {/* <Column
                title={TabConst.liceId}
                dataIndex={"licenceId"}
                sorter={(a, b) => a.licenceId.localeCompare(b.licenceId)}
              /> */}
              <Column
                title={TabConst.cusName}
                dataIndex={"customerName"}
                sorter={(a, b) => a.customerName.localeCompare(b.customerNames)}
              />
              <Column
                title={TabConst.pro}
                dataIndex={"productName"}
                sorter={(a, b) => a.productName.localeCompare(b.productName)}
              />
              <Column
                title={TabConst.subType}
                dataIndex={"subscription"}
                sorter={(a, b) => a.subscription.localeCompare(b.subscription)}
              />
              <Column
                title={TabConst.commission}
                dataIndex={"commission"}
                sorter={(a, b) => b.commission - a.commission}
              />
              <Column
                title={TabConst.status}
                render={(record) => this.salesStatus(record, type)}
                sorter={(a, b) => b.status - a.status}
              // dataIndex={"licenceId"}
              // sorter={(a, b) => a.subscription.localeCompare(b.subscription)}
              />
              {/* <Column
                title={TabConst.expIn}
                dataIndex={"expiresIn"}
                sorter={(a, b) => a.expiresIn.localeCompare(b.expiresIn)}
              /> */}
              {/* <Column title={TabConst.create} dataIndex={"createdBy"} /> */}
            </>
          )}
          {type === "transaction" && (
            <>
              <Column
                title={TabConst.transId}
                dataIndex={"transactionId"}
                sorter={(a, b) =>
                  a.transactionId.localeCompare(b.transactionId)
                }
              />
              <Column
                title={TabConst.pro}
                dataIndex={"productName"}
                sorter={(a, b) => a.productName.localeCompare(b.productName)}
              />
              <Column
                title={TabConst.transType}
                dataIndex={"transactionType"}
                sorter={(a, b) =>
                  a.transactionType.localeCompare(b.transactionType)
                }
              />
              <Column
                title={TabConst.amount}
                dataIndex={"totalCommission"}
                sorter={(a, b) => b.totalCommission - a.totalCommission}
              />
              <Column
                title={TabConst.date}
                dataIndex={"date"}
                sorter={(a, b) => a.date.localeCompare(b.date)}
              />
            </>
          )}
          {type === "withdraw" && (
            <>
              <Column
                title={TabConst.req + " " + TabConst.date}
                dataIndex={"requestdate"}
                sorter={(a, b) => a.requestdate.localeCompare(b.requestdate)}
              />
              <Column
                title={TabConst.req + " " + TabConst.amount}
                dataIndex={"requestamount"}
                sorter={(a, b) => b.requestamount - a.requestamount}
              />
              <Column
                title={TabConst.reqAprAmo}
                dataIndex={"approvedAmount"}
                sorter={(a, b) => b.approvedAmount - a.approvedAmount}
              />
              <Column
                title={TabConst.status}
                render={(record) => this.salesStatus(record, type)}
                sorter={(a, b) => b.status - a.status}
              />
              <Column
                title={TabConst.action}
                render={(record, i) => this.walletAction(record, type)}
              />
            </>
          )}
          {(type === "partners" ||
            type === "userList" ||
            type === "commission" ||
            type === "request" ||
            type === "extension" ||
            type === "test" ||
            type === "pointcont" ||
            type === "packageList") && (
              <>
                {type === "partners" && (
                  <>
                    <Column
                      title={TabConst.partner}
                      dataIndex={"companyName"}
                      sorter={(a, b) =>
                        a.companyName.localeCompare(b.companyName)
                      }
                    />
                    <Column title={TabConst.mobile} dataIndex={"mobile"} />
                    <Column title={TabConst.email} dataIndex={"emailId"} />
                    <Column
                      title={TabConst.status}
                      render={(record) => this.statusUI(record, type)}
                      sorter={(a, b) => b.isActive - a.isActive}
                    />
                    <Column title={TabConst.create} dataIndex={"createdBy"} />
                    <Column title={TabConst.modify} dataIndex={"modifiedBy"} />
                  </>
                )}
                {type === "userList" && (
                  <>
                    <Column
                      title={TabConst.userName}
                      dataIndex={"firstname"}
                      sorter={(a, b) => a.firstname.localeCompare(b.firstname)}
                    />
                    <Column title={TabConst.mobile} dataIndex={"mobile"} />
                    <Column title={TabConst.email} dataIndex={"emailId"} />
                    <Column title={TabConst.create} dataIndex={"createdBy"} />
                    <Column title={TabConst.modify} dataIndex={"modifiedBy"} />
                  </>
                )}
                {type === "packageList" && (
                  <>
                    <Column
                      title={TabConst.packageType}
                      dataIndex={"packageType"}
                      sorter={(a, b) =>
                        a.packageType.localeCompare(b.packageType)
                      }
                    />
                    <Column
                      title={TabConst.annual + TabConst.price}
                      dataIndex={"annualPackage"}
                      sorter={(a, b) => b.annualPackage - a.annualPackage}
                    />
                    <Column
                      title={TabConst.monthly + TabConst.price}
                      dataIndex={"monthlyPackage"}
                      sorter={(a, b) => b.monthlyPackage - a.monthlyPackage}
                    />
                    <Column title={TabConst.create} dataIndex={"createdBy"} />
                    <Column title={TabConst.modify} dataIndex={"modifiedBy"} />
                  </>
                )}
                {type === "commission" && (
                  <>
                    <Column
                      title={TabConst.pn}
                      dataIndex={"partnerName"}
                      sorter={(a, b) =>
                        a.partnerName.localeCompare(b.partnerName)
                      }
                    />
                    <Column
                      title={TabConst.cusName}
                      dataIndex={"customerName"}
                      sorter={(a, b) =>
                        a.customerName.localeCompare(b.customerName)
                      }
                    />
                    <Column
                      title={TabConst.pro}
                      dataIndex={"productName"}
                      sorter={(a, b) =>
                        a.productName.localeCompare(b.productName)
                      }
                    />
                    <Column
                      title={TabConst.subType}
                      dataIndex={"subscriptionType"}
                      sorter={(a, b) =>
                        a.subscriptionType.localeCompare(b.productName)
                      }
                    />
                    <Column
                      title={TabConst.status}
                      render={(record) => this.salesStatus(record, type)}
                      sorter={(a, b) => b.status - a.status}
                    />
                    {/* <Column title={TabConst.create} dataIndex={"createdBy"} />
                  <Column title={TabConst.modify} dataIndex={"modifiedBy"} /> */}
                  </>
                )}
                {type === "extension" && (
                  <>
                    <Column title={TabConst.type} dataIndex={"type"} />
                    <Column title={TabConst.search} dataIndex={"search"} />
                    <Column title={TabConst.name} dataIndex={"name"} />
                    <Column
                      title={TabConst.mobile}
                      dataIndex={"mobile"}
                      width={50}
                    />
                    <Column title={TabConst.cont} dataIndex={"email"} />
                    <Column title={TabConst.address} dataIndex={"address"} />
                  </>
                )}
                {type === "test" && (
                  <>
                    <Column
                      title={TabConst.comName}
                      dataIndex={"companyName"}
                      sorter={(a, b) =>
                        a.companyName.localeCompare(b.companyName)
                      }
                    />
                    <Column
                      title={TabConst.desc}
                      dataIndex={"description"}
                      sorter={(a, b) =>
                        a.description.localeCompare(b.description)
                      }
                    />
                    <Column
                      title={TabConst.icon}
                      dataIndex={"icon"}
                      sorter={(a, b) => a.icon.localeCompare(b.icon)}
                    />
                  </>
                )}
                {type === "pointcont" && (
                  <>
                    <Column
                      title={TabConst.user}
                      dataIndex={"username"}
                      sorter={(a, b) => a.username.localeCompare(b.username)}
                    />
                    <Column
                      title={TabConst.numof + TabConst.partner}
                      dataIndex={"nuofPaetner"}
                      sorter={(a, b) => b.nuofPaetner - a.nuofPaetner}
                    />
                    {/* <Column
                    title={TabConst.status}
                    render={(record) => this.statusUI(record, type)}
                    sorter={(a, b) => b.status - a.status}
                  /> */}
                    <Column title={TabConst.create} dataIndex={"createdBy"} />
                    <Column title={TabConst.modify} dataIndex={"modifiedBy"} />
                  </>
                )}
                {type === "request" && (
                  <>
                    <Column
                      title={TabConst.req + " " + TabConst.date}
                      dataIndex={"requestdate"}
                      sorter={(a, b) =>
                        a.requestdate.localeCompare(b.requestdate)
                      }
                    />
                    <Column
                      title={TabConst.pn}
                      dataIndex={"partnerName"}
                      sorter={(a, b) =>
                        a.partnerName.localeCompare(b.partnerName)
                      }
                    />
                    <Column
                      title={TabConst.wiDra}
                      dataIndex={"withdrawalRequest"}
                      sorter={(a, b) => b.withdrawalRequest - a.withdrawalRequest}
                    />
                    <Column
                      title={TabConst.aprAmo}
                      dataIndex={"approvedAmount"}
                      sorter={(a, b) => b.approvedAmount - a.approvedAmount}
                    />
                    <Column
                      title={TabConst.status}
                      render={(record) => this.salesStatus(record, type)}
                      sorter={(a, b) => b.status - a.status}
                    />
                  </>
                )}
                {print || this.hideRights(type) ? (
                  //  &&
                  // (type === "userList" &&
                  //   !this.setRigts("usersedit") &&
                  //   !this.setRigts("usersview") &&
                  //   !this.setRigts("usersdelete"))
                  ""
                ) : (
                  <Column
                    title={TabConst.action}
                    render={(record, i) => this.adminActionUI(record, type)}
                  />
                )}
              </>
            )}
          {useractionUI && (
            <Column
              title={TabConst.action}
              render={(record, i) => this.partnerAction(record, type)}
            />
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  hideRights = (type) => {
    try {
      return type === "userList" || type === "pointcont"
        ? !this.setRigts(type === "userList" ? "usersedit" : "pocedit") &&
        !this.setRigts(type === "userList" ? "usersview" : "pocview") &&
        !this.setRigts(type === "userList" ? "usersdelete" : "pocdelete")
        : false;
    } catch (error) {
      console.log(error);
    }
  };
  searchData = () => {
    try {
      const { data, search } = this.props;
      if (search && search !== "") {
        let searchData = [];
        let display = [];
        data?.forEach((a) => {
          display.push(a.packageType, a.annualPackage, a.monthlyPackage);
          let array = [];
          display.forEach((e) => {
            if (e && e !== null && e.toString().length > 0) array.push(e);
          });
          let matches = array.filter((s) =>
            s.toString().toLowerCase().includes(search.toString().toLowerCase())
          );
          display = [];
          if (matches && matches.length > 0) searchData.push(a);
        });
        return searchData;
      } else {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  pocData = () => {
    try {
      const { data } = this.props;
      let sendData = [];
      data?.forEach((a, i) => {
        if (a.status === 0) {
          sendData.push(a);
        }
      });
      return sendData;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { pagination } = this.state;
    const { data, print, type, current, pagiTF, DoubleClick } = this.props;
    let curr = current && current > 1 ? (current - 1) * 10 : current - 1;
    let display =
      type === "packageList"
        ? this.searchData()
        : type === "pointcont"
          ? this.pocData()
          : data;
    display?.forEach((a, i) => {
      a.key = current ? curr + (i + 1) : i + 1;
      a.id =
        type === "packageList"
          ? a.packageId
          : type === "partners"
            ? a.partnerId
            : type === "userList"
              ? a.userId
              : type === "Leads"
                ? a.leadsId
                : type === "Meetings"
                  ? a.demoId
                  : type === "sales"
                    ? a.salesId
                    : type === "commission"
                      ? a.saleid
                      : type === "Promo"
                        ? a.promoId
                        : type === "pointcont"
                          ? a.pocid
                          : type === "withdraw"
                            ? a.withdrawalid
                            : type === "request"
                              ? a.withdrawalId
                              : a.id;
      if (type === "Meetings") {
        a.sales = a.sale ? "Yes" : "No";
        a.demos = a.demo ? "Yes" : "No";
      }
      // if (type === "commission" && !a.commission?.toString().includes("%"))
      //   a.commission = a.commission + "%";
      if (type === "Prospect") {
        a.status = a.leadID === 0 || !a.leadID ? "-" : "Lead";
        a.mobileNo = a.emailId ? a.mobileNo + ", " + a.emailId : a.mobileNo;
        a.emailId = null;
      } else if (type === "Leads") {
        a.status = a.meetingId === 0 || !a.meetingId ? "-" : "Meeting";
      } else if (type === "sales" && a.expiresIn?.includes("T")) {
        let tm = a.expiresIn?.split("T");
        a.expiresIn = tm[0] + " " + tm[1];
      }
      // else if (type === "wallet" && a.amount) {
      //   if (!a.amount?.toString().includes(",")) {
      //     a.amount = parseFloat(a.amount)
      //       ?.toLocaleString("en-IN")
      //       .replace(/\d(?=(\d{2})+\.)/g, "$&,");
      //   }
      //   if (a.date?.includes("T")) {
      //     let tm = a.date?.split("T");
      //     a.date = tm[0] + " " + tm[1];
      //   }
      // }
      else if (type === "pointcont") {
        let partSlice = a.partnername?.split(",");
        a.nuofPaetner = partSlice.length;
      } else if (type === "withdraw" || type === "request") {
        a.requestdate = a.requestdate?.split("T")[0];
      } else if (type === "transaction") {
        a.date = a.date?.split("T")[0];
      }
    });
    let flag = type === "Prospect" || type === "Leads" || type === "Meetings";
    if (data?.length > 0)
      return (
        <TableStyle>
          <Table
            bordered
            rowClassName={(record) =>
              !print
                ? `anime ${record.isActive === 1 && flag ? "rowDeactive" : ""
                } ${flag ? " rowHover" : ""}`
                : ""
            }
            pagination={pagiTF ? pagination : false}
            onChange={this.handleTable}
            dataSource={display}
            className={`${flag ? "ledTable" : ""}`}
            onRow={(record) => {
              return {
                onDoubleClick: (event) =>
                  DoubleClick && this.props.showModal(record.id),
              };
            }}
          >
            {this.columns()}
          </Table>
        </TableStyle>
      );
    return <></>;
  }
}
export default withRouter(TableUI);
