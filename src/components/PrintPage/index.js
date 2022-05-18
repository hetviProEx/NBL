import React, { Component } from "react";
import { Table } from "components/Form";
class PrintResult extends Component {
  constructor(props) {
    super(props);
    this.state = {type: "",tblData: []};
  }
  componentDidMount() {
    try {
      if (!localStorage.pdfData) window.close();
      else if (localStorage.pdfData) {
        const report = JSON.parse(localStorage.pdfData);
        let type =
          report.type !== "partners" && report.type !== "sales"
            ? report.type.charAt(0).toUpperCase() + report.type.slice(1)
            : report.type.toLowerCase();
        this.setState({ type: type.toLowerCase(), tblData: report.data });
        if (report.print) {
          setTimeout(() => {
            window.print();
          }, 500);
          setTimeout(() => {
            localStorage.removeItem("pdfData");
            window.close();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  renderData = () => {
    try {
      const { type, tblData } = this.state;
      return (
        <div className="printDiv">
          <Table type={type} data={tblData} print={true} />
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
export default PrintResult;
