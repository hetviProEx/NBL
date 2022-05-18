import React, { Component } from "react";
import { Select } from "antd";
import { SelectContainer } from "./style";
const { Option } = Select;

class FormSelect extends Component {
  getOptions = () => {
    try {
      const { data, withID, sortById } = this.props;
      if (data?.length > 0) {
        if (withID) {
          let array = sortById
            ? data.sort((a, b) => b.no - a.no)
            : data.sort((a, b) => a.value.localeCompare(b.value));
          return array?.map((l, i) => {
            return (
              l.id &&
              l.value?.toString().trim() !== "" && (
                <Option value={l.value} key={i} id={l.id}>
                  {l.value}
                </Option>
              )
            );
          });
        } else
          return data?.map((element, i) => {
            return (
              element?.toString().trim() !== "" && (
                <Option value={element} key={i}>
                  {element}
                </Option>
              )
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      id,
      onChange,
      selectClass,
      defaultValue,
      className,
      disable,
      value,
    } = this.props;
    return (
      <SelectContainer id={id ? id : "form-select"} className={className}>
        <Select
          showSearch
          showArrow={false}
          onChange={onChange}
          value={value}
          optionFilterProp="children"
          defaultValue={defaultValue}
          dropdownClassName="dropdown-custom"
          disabled={disable ? disable : false}
          className={`select-custom ${selectClass ? selectClass : ""}`}
          filterSort={(a, b) => a.value.localeCompare(b.value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          getPopupContainer={() =>
            document.getElementById(id ? id : "form-select")
          }
          dropdownRender={(mountNode, prop) => {
            return (
              <div className="dropdown-section">
                <div>{mountNode}</div>
              </div>
            );
          }}
        >
          {this.getOptions()}
        </Select>
      </SelectContainer>
    );
  }
}
FormSelect.defaultProps = {
  placeholder: null,
  className: "",
  disabled: false,
};
export default FormSelect;
