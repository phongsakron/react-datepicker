import React, { useEffect } from "react";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.css";
// import "./lib/bootstrap-daterangepicker/daterangepicker.css";
import "./styles.css";
import moment from "moment";

export default function App() {
  const datePickerHandler = (event, picker) => {
    let value =
      picker.startDate.format("DD-MM-YYYY") +
      " to " +
      picker.endDate.format("DD-MM-YYYY");
    $("#date-picker").val(value);
  };

  const removeElement = () => {
    const ele = document.getElementsByClassName("drp-selected");
    console.log(ele);
    if (ele.length > 0) {
      // ele[0].remove();
    }
  };

  return (
    <div className="input-container">
      <i className="bi bi-alarm"></i>
      <DateRangePicker
        initialSettings={{
          timePicker: true,
          timePicker24Hour: true,
          locale: {
            daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            monthNames: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            applyLabel: "Done",
            cancelLabel: "Clear",
            selectedFormat: "DD MMM",
            format: "DD MMM YYYY HH:mm",
          },
        }}
        onApply={datePickerHandler}
        onShow={removeElement}
      >
        <input type="text" autoComplete="off" />
      </DateRangePicker>
    </div>
  );
}
