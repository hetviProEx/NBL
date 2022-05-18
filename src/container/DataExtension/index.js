import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Spin, Table } from "antd";
import axios from "axios";
import {
  SearchOutlined,
  MoreOutlined,
  RightOutlined,
  PushpinOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { TabConst } from "components/Table/constant";
import { ExtensionStyle } from "./style";
import { ExtensionConst,selectData } from "./constant";
import { Menu, Header, Input, ExportModal, Button ,Select } from "components/Form";
import { ButtonConst } from "App/AppConstant";
import TableStyle from "components/Table/style";
import link from "assets/extension/fatchData.zip";
const { Column } = Table;

class DataExtension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      help: false,
      search: "",
      data: [],
      filterName:"All",
      filterID:1,
      pagination: { current: 1, pageSize: 10 },
    };
  }
  componentDidMount() {
    try {
      axios.get("https://data-extractor.naapbooks.in/api/all").then(
        (res) => {
          this.setState({ loading: false, data: res?.data?.data.reverse() });
        },
        (error) => {
          this.setState({ loading: false });
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  columns = () => {
    try {
      return (
        <>
          <Column
            title={TabConst.no}
            dataIndex={"no"}
            sorter={(a, b) => b.no - a.no}
          />
          <Column
            title={TabConst.from}
            dataIndex={"type"}
            sorter={(a, b) => a.type.localeCompare(b.type)}
          />
          <Column
            title={TabConst.search}
            dataIndex={"search"}
            sorter={(a, b) => a.search.localeCompare(b.search)}
          />
          <Column
            title={TabConst.name}
            dataIndex={"name"}
            sorter={(a, b) => a.name.localeCompare(b.name)}
          />
          {/* <Column title={TabConst.mobile} render={(record, i) => this.callUI(record)} className="callUi"/> */}
          <Column
            title={TabConst.cont}
            render={(record, i) => this.contactUI(record)}
            className="contactUI"
          />
          <Column
            title={TabConst.address}
            dataIndex={"address"}
            sorter={(a, b) => a.address.localeCompare(b.address)}
          />
          <Column
            title={TabConst.date}
            dataIndex={"date"}
            sorter={(a, b) => a.date.localeCompare(b.date)}
          />
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  callUI = (a) => {
    try {
      let mob = a?.mobile?.split(",");
      return (
        mob &&
        mob?.map((x, i) => {
          let c = x?.split("EXT");
          return (
            <>
              <a href={"tel:" + c[0]} key={i}>
                {c[0]}
                {mob.length > 1 && i !== mob.length - 1 ? ", " : ""}
              </a>
              {c.length > 1 && "EXT" + c[1]}
            </>
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  contactUI = (a) => {
    try {
      let ema = a?.contact?.split(", ");
      if (ema)
        return ema?.map((x, i) =>
          x.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") ? (
            <>
              {a.mobile && (
                <>
                  {this.callUI(a)}
                  <br />
                </>
              )}
              <a href={"mailto:" + x} key={i}>
                {x}
                {ema.length > 1 ? ", " : ""}
              </a>
            </>
          ) : (
            x && (
              <div
                className="webUI"
                onClick={() =>
                  window.open(!x.includes("http") ? "http://" + x : x, "_blank")
                }
                key={i}
              >
                {x}
              </div>
            )
          )
        );
      else return this.callUI(a);
    } catch (error) {
      console.log(error);
    }
  };
  searchData = () => {
    try {
      const { data, search ,filterID } = this.state;
      let dData = [];
      let display = [];
      data &&
        data.length > 0 &&
        data?.forEach((a) => {
          display.push(
          (filterID === 1||filterID === 3)&&  a.search,
          (filterID === 1||filterID === 4)&&  a.name,
          (filterID === 1||filterID === 5)&&  a.email,
          (filterID === 1||filterID === 6)&&  a.address,
          (filterID === 1||filterID === 2)&&  a.type,
          (filterID === 1||filterID === 5)&&  a.mobile,
          (filterID === 1||filterID === 5)&&  a.website
          ); 
          let array = [];
          display?.forEach((e) => {
            if (e && e !== null && e.toString().length > 0) array.push(e);
          });
          let matches = array.filter((s) =>
            s.toString().toLowerCase().includes(search.toString().toLowerCase())
          );
          display = [];
          if (matches && matches.length > 0) dData.push(a);
        });
      return dData;
    } catch (error) {
      console.log(error);
    }
  };
  openUrl = (url) => {
    try {
      var win = window.open(url, "_blank");
      win.focus();
    } catch (error) {
      console.log(error);
    }
  };
  spanUI = (url) => (
    <span className="txt pointer" onClick={() => this.openUrl(url)}>
      {url}
    </span>
  );
  handleTable = (pagination) => this.setState({ pagination });
  changeHelp = () => this.setState({ help: !this.state.help });
  searchChange = (e) => this.setState({ search: e.target.value.trim() });
  render() {
    const { loading, data, pagination, search, help , filterName} = this.state;
    let display =
      search.trim() === "" ? data : data.length > 0 ? this.searchData() : data;
    if (display.length > 0) {
      display?.forEach((a, i) => {
        a.no = i + 1;
        let date = a.created_date?.split("T");
        a.date = date[0] + " " + date[1]?.split(".")[0];
        a.mobile = a.mobile2 ? a.mobile + "," + a.mobile2 : a.mobile;
        a.mobile = a.extension ? a.mobile + " EXT " + a.extension : a.mobile;
        a.mobile = a.mobile3 ? a.mobile + ", " + a.mobile3 : a.mobile;
        a.mobile = a.officePhone ? a.mobile + ", " + a.officePhone : a.mobile;
        a.mobile = a.officePhone2 ? a.mobile + ", " + a.officePhone2 : a.mobile;
        a.email = a.website
          ? a.email
            ? a.email + ", " + a.website
            : a.website
          : a.email;
        a.contact = a.gMap
          ? a.email + ", " + a.gMap.replace(/&amp;/g, "&")
          : a.email;
        a.mobile2 = null;
        a.mobile3 = null;
        a.officePhone = null;
        a.officePhone2 = null;
        a.website = null;
        a.gMap = null;
        a.extension = null;
        a.all = a.mobile + " " + a.contact + " " + a.address;
      });
    }
    return (
      <Spin spinning={loading} size="large">
        <ExtensionStyle>
          <Menu />
          <div className="container">
            <Header title={"Extension Data"} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{ExtensionConst.ExtensionCode}</h2>
                  <h3 className="ma pointer" onClick={this.changeHelp}>
                    {ExtensionConst.hp}
                  </h3>
                </div>
                {help ? (
                  <div className="hlpDiv">
                    <h3>Manage/Add extensions</h3>
                    <ol>
                      <li>On your computer, open Chrome.</li>
                      <li>
                        At the top right, click More
                        <MoreOutlined />
                        <RightOutlined />
                        <strong>More</strong> <strong>tools</strong>
                        <RightOutlined />
                        <strong>Extensions</strong>.
                      </li>
                      <li>
                        Make your changes:
                        <ul>
                          <li>
                            <strong>Turn on Developer mode:</strong> Turn on the
                            Developer mode from right corner site.
                          </li>
                          <li>
                            <strong>Add Extension:</strong> Click on load
                            Unpacked and select unzip extension file name
                            "fatchData".
                          </li>
                        </ul>
                      </li>
                      <li>
                        At the top right, click More <strong>Extensions</strong>
                        .
                      </li>
                      <li>
                        Pin extension from unpin logo.
                        <PushpinOutlined />
                      </li>
                      <li>
                        Get data from given links.
                        <ul>
                          <li> {this.spanUI("indiamart.com")} </li>
                          <li>{this.spanUI("infoline.com")} </li>
                          <li> {this.spanUI("ibphub.com")} </li>
                          <li> {this.spanUI("helloindia.co")} </li>
                          <li> {this.spanUI("hindustanyellowpages.in")} </li>
                        </ul>
                      </li>
                    </ol>
                    <a href={link} className="link" download>
                      <DownloadOutlined /> download Extension
                    </a>
                    <Button onClick={this.changeHelp}>Back</Button>
                  </div>
                ) : (
                  <div className="contDIV">
                    {data.length > 0 && (
                      <div className="contHead anime highZ">
                        <div className="expoDiv">
                          {display.length > 0 && (
                            <ExportModal data={display} type="extension" />
                          )}
                        </div>
                        <div className="filterDiv">
                          <div className="filter">
                            <Select
                            value={filterName}
                            defaultValue={filterName}
                            data={selectData}
                            withID={true}
                            sortById={true}
                            onChange={(value, data) =>{
                              this.setState({filterName:value,filterID:data.id})
                            }}
                            />
                          </div>
                          <div className="filter">
                            <Input
                              placeholder={ButtonConst.search}
                              suffix={<SearchOutlined />}
                              onChange={this.searchChange}
                            />

                          </div>
                        </div>
                        {/* <div className="srchDiv">
                          <Input
                            placeholder={ButtonConst.search}
                            suffix={<SearchOutlined />}
                            onChange={this.searchChange}
                          />
                        </div> */}
                      </div>
                    )}
                    <div className="tableDIV">
                      <TableStyle>
                        <Table
                          bordered
                          rowClassName={"anime"}
                          pagination={pagination}
                          onChange={this.handleTable}
                          dataSource={display}
                        >
                          {this.columns()}
                        </Table>
                      </TableStyle>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ExtensionStyle>
      </Spin>
    );
  }
}

export default withRouter(DataExtension);
