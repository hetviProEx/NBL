import React, { Component } from "react";
import PDF, { Text, Html, Table } from "jspdf-react";
import PrintPage from "components/PrintPage";
import { PartRow, ProRow, LeadsRow, SalesRow, ExptRow } from "./constant";

class PDFResult extends Component {
  constructor(props) {
    super(props);
    this.state = { header: "", head: [], body: [], print: false };
  }
  componentDidMount() {
    try {
      if (!localStorage.pdfData) window.close();
      else if (localStorage.pdfData) {
        const report = JSON.parse(localStorage.pdfData);
        this.setState({ print: report.print });
        if (!report.print) {
          let body = [];
          let head =
            report.type === "prospect"
              ? ProRow
              : report.type === "leads"
              ? LeadsRow
              : report.type === "sales"
              ? SalesRow
              : report.type === "extension"
              ? ExptRow
              : PartRow;
          report.data?.forEach((a, i) => {
            if (report.type === "partners") {
              body.push([a.no, a.companyName, a.mobile, a.emailId, a.status]);
            } else if (report.type === "prospect") {
              body.push([
                a.no,
                a.customerName,
                a.companyName,
                a.emailId,
                a.mobileNo,
                a.status,
              ]);
            } else if (report.type === "leads") {
              body.push([
                a.no,
                a.customerName,
                a.leadName,
                a.products,
                a.company,
                a.status,
              ]);
            } else if (report.type === "sales") {
              body.push([
                a.no,
                a.licenceId,
                a.customerName,
                a.subscription,
                a.expiresIn,
              ]);
            } else if (report.type === "extension") {
                body.push([
                  a.no,
                  a.type,
                  a.search,
                  a.name,
                  a.mobile + " " + a.contact,
                  a.address,
                ]);
            }
          });
          this.setState({ header: report.type, head, body });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  renderData = () => {
    try {
      const { header, head, body, print } = this.state;
      if (print) return <PrintPage />;
      else
        return (
          <div className="pdfDiv">
            <PDF properties={{ header: "Acme" }} preview={true}>
              <Text x={80} y={15} size={30}>
                {header}
              </Text>
              <Table head={[head]} body={body} margin={[25, 5]} />
              <Html sourceById="page" />
            </PDF>
            <div id="page" className="none" />
          </div>
        );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return <>{this.renderData()}</>;
  }
}
export default PDFResult;
