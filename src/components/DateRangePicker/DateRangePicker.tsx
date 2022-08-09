import React from "react";
import $ from "jquery";
import "../../assets/js/bootstrap-daterangepicker/daterangepicker";
import "../../assets/js/bootstrap-daterangepicker/daterangepicker.css";
import "./styles.css";

export interface EventHandler {
  (event: JQuery.Event, picker: any): any;
}
export interface CallbackHandler {
  (start?: any, end?: any, label?: string): any;
}
export interface Props {
  initialSettings?: any;

  // events supported by the upstream lib
  onApply?: EventHandler;
  onCancel?: EventHandler;
  onHide?: EventHandler;
  onHideCalendar?: EventHandler;
  onShow?: EventHandler;
  onShowCalendar?: EventHandler;

  // custom events in this lib
  onEvent?: EventHandler;
  onCallback?: CallbackHandler;
  children?: React.ReactNode;
}

export class DateRangePicker extends React.Component<Props> {
  ref: any;
  $picker: JQuery<any> | null;
  constructor(props: Props) {
    super(props);
    this.ref = null;
    this.$picker = null;
  }
  componentDidMount() {
    // initialize daterangepicker
    this.$picker = $(this.ref);
    this.$picker?.daterangepicker(
      this.props.initialSettings,
      this.handleCallback.bind(this)
    );
    // attach event listeners
    ["Show", "Hide", "ShowCalendar", "HideCalendar", "Apply", "Cancel"].forEach(
      (event) => {
        const lcase = event.toLowerCase();
        this.$picker?.on(
          lcase + ".daterangepicker",
          this.makeEventHandler("on" + event)
        );
      }
    );
  }
  componentWillUnmount() {
    this.$picker?.data("daterangepicker")?.remove();
  }
  handleCallback(...args: any) {
    if (typeof this.props.onCallback === "function") {
      this.props.onCallback(...args);
    }
  }
  makeEventHandler(eventType: string) {
    const { onEvent } = this.props;
    return (event: JQuery.Event, picker: any) => {
      if (typeof onEvent === "function") {
        onEvent(event, picker);
      }
      if (typeof this.props[eventType] === "function") {
        this.props[eventType](event, picker);
      }
    };
  }
  setStartDate(dateOrString: daterangepicker.DateOrString) {
    this.$picker?.data("daterangepicker")?.setStartDate(dateOrString);
  }
  setEndDate(dateOrString: daterangepicker.DateOrString) {
    this.$picker?.data("daterangepicker")?.setEndDate(dateOrString);
  }
  render() {
    const childElement: any = React.Children.only(this.props.children);
    return React.cloneElement(childElement, {
      ref: (el: any) => (this.ref = el),
    });
  }
}

export default DateRangePicker;
