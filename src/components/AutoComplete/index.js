import React, { Component } from "react";
import { AutoComplete } from "antd";

import { FormWrapper } from "./style";

class FormAutoCumplete extends Component {
  render() {
    const { handleChange, selectData, className, value , onSelect} = this.props;
    return (
      <FormWrapper>
        <AutoComplete
          value={value}
          onChange={handleChange}
          onSelect ={onSelect}
          options={selectData}
          className={className}
        />
      </FormWrapper>
    );
  }
}
export default FormAutoCumplete;
