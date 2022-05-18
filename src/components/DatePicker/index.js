import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { StyledComponent } from "./style";
const dateFormat = "YYYY/MM/DD";
const timeFormat = "HH:mm";

class Datepicker extends Component {
  handleChange = (date, dateString) => {
    this.props.handleChange(dateString);
  };
  disabledDate(current) {
    try {
      let prev_date = new Date();
      prev_date.setDate(prev_date.getDate() - 1);
      return current && current.valueOf() < prev_date.getTime();
    } catch (error) {
      console.log(error);
    }
  }
  disabledNextDate(current) {
    try {
      let prev_date = new Date();
      prev_date.setDate(prev_date.getDate());
      return current && current.valueOf() > prev_date.getTime();
    } catch (error) {
      console.log(error);
    }
  }
  getDisabledHours = () => {
    let hours = [];
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  getDisabledMinutes = (selectedHour) => {
    const { name } = this.props;
    let minutes = [];
    let time = moment();
    if (name === "endTime") time = moment().add(5, "minutes");
    if (selectedHour === time.hour()) {
      for (let i = 0; i < time.minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };
  render() {
    const {
      className,
      disabled,
      disableDate,
      disableTime,
      picker,
      defaultValue,
      value,
      name,
      id,
      disNext,
    } = this.props;
    let did = id ? "form-dropdown" + id : "form-dropdown";
    return (
      <StyledComponent id={did}>
        <DatePicker
          placeholder=""
          picker={picker}
          showToday={false}
          className={className}
          disabled={disabled}
          showNow={name === "endTime" ? false : true}
          format={picker === "time" ? timeFormat : dateFormat}
          value={
            value && moment(value, picker === "time" ? timeFormat : dateFormat)
          }
          defaultValue={defaultValue && moment(defaultValue, dateFormat)}
          onChange={this.handleChange}
          disabledDate={
            disableDate && (disNext ? this.disabledNextDate : this.disabledDate)
          }
          disabledHours={disableTime && this.getDisabledHours}
          disabledMinutes={disableTime && this.getDisabledMinutes}
          getPopupContainer={() => document.getElementById(did)}
          // value={moment(value, "YYYY-MM-DD")}
        />
      </StyledComponent>
    );
  }
}
Datepicker.defaultProps = {};
export default Datepicker;
