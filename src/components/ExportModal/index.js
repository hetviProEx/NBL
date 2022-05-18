import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import { CSVLink } from "react-csv";
import Workbook from "react-excel-workbook";

import {
  PageConst,
  PartnerArray,
  ProspectArray,
  LeadsArray,
  SalesArray,
  ExtenArray,
} from "./constant";
import { Button } from "components/Form";

class ExportModal extends Component {
  constructor(props) {
    super(props);
    this.state = { disable: false };
  }
  setData = (a) => {
    try {
      const { type, data } = this.props;
      localStorage.setItem(
        "pdfData",
        JSON.stringify({ type: type, print: a === "PRINT", data: data })
      );
      window.open("/result", "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  csvUI = () => {
    try {
      const { type, data } = this.props;
      let headers =
        type === "partners"
          ? PartnerArray
          : type === "prospect"
          ? ProspectArray
          : type === "leads"
          ? LeadsArray
          : type === "extension"
          ? ExtenArray
          : SalesArray;
      return (
        <CSVLink
          data={data}
          headers={headers}
          filename={type + ".csv"}
          target="_blank"
        >
          <Button>
            <span className="droptxt">{PageConst.csv}</span>
          </Button>
        </CSVLink>
      );
    } catch (error) {
      console.log(error);
    }
  };
  excleUI = () => {
    try {
      const { type } = this.props;
      let name = type.toLowerCase();
      return (
        <Workbook
          filename={name + ".xlsx"}
          element={
            <Button className="exclebtn">
              <span className="droptxt">{PageConst.excel}</span>
            </Button>
          }
        >
          {this.inside()}
        </Workbook>
      );
    } catch (error) {
      console.log(error);
    }
  };
  inside = () => {
    try {
      const { type, data } = this.props;
      let workColData =
        type === "partners"
          ? PartnerArray
          : type === "prospect"
          ? ProspectArray
          : type === "leads"
          ? LeadsArray
          : type === "extension"
          ? ExtenArray
          : SalesArray;
      return (
        <Workbook.Sheet data={data} name={type}>
          {this.workBookColum(workColData)}
        </Workbook.Sheet>
      );
    } catch (error) {
      console.log(error);
    }
  };
  workBookColum = (data) => {
    try {
      return data?.map((a, i) => (
        <Workbook.Column label={a.label} value={a.key} key={i} />
      ));
    } catch (error) {
      console.log(error);
    }
  };
  exportUI = (text) => (
    <div className="exportAction pointer" onClick={() => this.exprt(text)}>
      {text}
    </div>
  );
  exprt = (txt) => {
    try {
      const { disable } = this.state;
      const { data } = this.props;
      if (!disable) {
        if (txt === "COPY") {
          navigator.clipboard.writeText(JSON.stringify(data));
          message.success("Code Copied");
        } else this.setData(txt);
        this.setState({ disable: true });
        setTimeout(() => {
          this.setState({ disable: false });
        }, 4500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { data } = this.props;
    return (
      <div className="exportDiv">
        <div className="expo anime">
          {this.exportUI(PageConst.copy)}
          {this.csvUI(PageConst.csv)}
          {this.excleUI(PageConst.excel)}
          {data.length< 1467&& this.exportUI(PageConst.pdf)}
          {this.exportUI(PageConst.print)}
        </div>
      </div>
    );
  }
}

export default withRouter(ExportModal);
