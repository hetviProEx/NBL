import React, { Component } from "react";
import { PackageStyle } from "./style";
import { Button } from "components/Form";
import { ButtonConst } from "App/AppConstant";
class PackageCard extends Component {
  render() {
    const { data, packageSelect, type, selctPackId } = this.props;
    let selected = selctPackId === data.packageId;
    return (
      <PackageStyle>
        <div
          className={`cardDiv anime ${selected ? "selected" : ""}        
          `}
          onClick={() =>
            type === "sale" && packageSelect(data.packageId, data.price)
          }
        >
          <h2 className="pakTypeDiv">{data.package}</h2>
          <div className="priceDiv">
            <div className="price">
              <i className="fas fa-rupee-sign"></i>
              {data.price + "/"}
              <small>{data.subscription}</small>
            </div>
          </div>
          <div className="contentDiv anime">
            <div
              dangerouslySetInnerHTML={{ __html: data.packageDescription }}
            />
          </div>
          {type === "sale" && (
            <div className="btnDiv">
              <Button>
                {!selected ? ButtonConst.select : ButtonConst.cancel}
              </Button>
            </div>
          )}
        </div>
      </PackageStyle>
    );
  }
}
export default PackageCard;
