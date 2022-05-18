import React, { Component } from "react";
import { Image } from "antd";
import {
  TwitterOutlined,
  DribbbleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Wrapper } from "./style";
import { ColumnConst, LinkConst, ProdConst, LearnConst } from "./constant";
import { logowhite } from "components/Images";

class Footer extends Component {
  liUI = (val) => {
    try {
      let array =
        val === "Product"
          ? LinkConst
          : val === "Company"
          ? ProdConst
          : LearnConst;
      return array?.map((a, i) => (
        <li key={i}>
          <a href="#">{a}</a>
        </li>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  columnUI = () => {
    try {
      return ColumnConst?.map((a, i) => (
        <div key={i} className="column">
          <div className="footer-column">
            <div className="footer-header">
              <h3>{a}</h3>
            </div>
            <ul className="link-list">{this.liUI(a)}</ul>
          </div>
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <Wrapper>
        <footer id="dark-footer" className="footer footer-dark">
          <div className="container">
            <div className="columns">
              {this.columnUI()}
              <div className="column">
                <div className="footer-column">
                  <div className="footer-logo">
                    <Image
                      className="switcher-logo-w"
                      src={logowhite}
                      preview={false}
                    />
                  </div>
                  <div className="footer-header">
                    <nav className="level is-mobile">
                      <div className="level-left level-social">
                        <a href="#">
                          <div className="fbimg" />
                        </a>
                        <a href="#" className="level-item">
                          <span className="icon">
                            <TwitterOutlined className="fa fa-twitter" />
                          </span>
                        </a>
                        <a href="#">
                          <div className="lkimg" />
                        </a>
                        <a href="#" className="level-item">
                          <span className="icon">
                            <DribbbleOutlined className="fa fa-dribbble" />
                          </span>
                        </a>
                        <a href="#" className="level-item">
                          <span className="icon">
                            <GithubOutlined className="fa fa-github" />
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    );
  }
}
export default Footer;
