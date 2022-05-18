import React, { Component } from "react";
// import { TabsConst } from "../constant";

class DivTabUI extends Component {
  //   tabPaneUI = () => {try {return TabsConst?.map((a, i) => <TabPane tab={a.name} key={i}></TabPane>);
  //     } catch (error) {console.log(error);}};
  render() {
    const { countHandle, count, TabsConst } = this.props;
    return (
      <div className="tabsDiv">
        {/* <Tabs defaultActiveKey= {count.toString()} onChange={countHandle} getContainer={() => 
            document.getElementById("tableTabs-Div")}>{this.tabPaneUI()}</Tabs> */}
        {TabsConst?.map((a, i) => {
          return (
            <div
              key={i}
              className={`tabComp pointer ${i === count ? "selectedTab" : ""} `}
              onClick={() => countHandle(i)}
            >
              {a.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default DivTabUI;
