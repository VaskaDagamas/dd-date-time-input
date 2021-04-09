import React                            from 'react';
import ReactDOM                         from 'react-dom';
import KeyCode                          from 'rc-util/lib/KeyCode';
import DateTable                        from './date/DateTable.jsx';
import CalendarHeader                   from './calendar/CalendarHeader.jsx';
import CalendarFooter                   from './calendar/CalendarFooter.jsx';
import CalendarMixin                    from './mixin/CalendarMixin.js';
import CommonMixin                      from './mixin/CommonMixin.js';
import DateInput                        from './date/DateInput.js';
import { getTimeConfig, getTodayTime }  from './util/index';
import PropTypes                        from 'prop-types';
import ClickOutside                     from 'react-click-outside'
import "css/calendar.scss"
import createReactClass from 'create-react-class'

function noop() {
}

function goStartMonth() {
  const next = this.state.value.clone();
  next.startOf('month');
  this.setValue(next);
}

function goEndMonth() {
  const next = this.state.value.clone();
  next.endOf('month');
  this.setValue(next);
}

function goTime(direction, unit) {
  const next = this.state.value.clone();
  next.add(direction, unit);
  this.setValue(next);
}

function goMonth(direction) {
  return goTime.call(this, direction, 'months');
}

function goYear(direction) {
  return goTime.call(this, direction, 'years');
}

function goWeek(direction) {
  return goTime.call(this, direction, 'weeks');
}

function goDay(direction) {
  return goTime.call(this, direction, 'days');
}

const Calendar = createReactClass({
  propTypes: {
    disabledDate: PropTypes.func,
    disabledTime: PropTypes.any,
    value: PropTypes.object,
    selectedValue: PropTypes.object,
    defaultValue: PropTypes.object,
    className: PropTypes.string,
    locale: PropTypes.object,
    showWeekNumber: PropTypes.bool,
    style: PropTypes.object,
    showToday: PropTypes.bool,
    showDateInput: PropTypes.bool,
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    onOk: PropTypes.func,
    showOk: PropTypes.bool,
    prefixCls: PropTypes.string,
    onKeyDown: PropTypes.func,
    timePicker: PropTypes.element,
    dateInputPlaceholder: PropTypes.any,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    renderFooter: PropTypes.func,
    renderSidebar: PropTypes.func,
  },

  mixins: [CommonMixin, CalendarMixin],

  getDefaultProps() {
    return {
      showToday: false,
      showDateInput: true,
      timePicker: null,
      onOk: noop,
    };

  },
  getInitialState() {
    return {
      showTimePicker: false,
      displaycalendar: this.props.displaycalendar,
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      displaycalendar: nextProps.displaycalendar
    })
  },
  onKeyDown(event) {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
    const keyCode = event.keyCode;
    // mac
    const ctrlKey = event.ctrlKey || event.metaKey;
    switch (keyCode) {
      case KeyCode.DOWN:
        goWeek.call(this, 1);
        event.preventDefault();
        return 1;
      case KeyCode.UP:
        goWeek.call(this, -1);
        event.preventDefault();
        return 1;
      case KeyCode.LEFT:
        if (ctrlKey) {
          goYear.call(this, -1);
        } else {
          goDay.call(this, -1);
        }
        event.preventDefault();
        return 1;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          goYear.call(this, 1);
        } else {
          goDay.call(this, 1);
        }
        event.preventDefault();
        return 1;
      case KeyCode.HOME:
        goStartMonth.call(this);
        event.preventDefault();
        return 1;
      case KeyCode.END:
        goEndMonth.call(this);
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_DOWN:
        goMonth.call(this, 1);
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_UP:
        goMonth.call(this, -1);
        event.preventDefault();
        return 1;
      case KeyCode.ENTER:
        this.onSelect(this.state.value, {
          source: 'keyboard',
        });
        event.preventDefault();
        return 1;
      default:
        this.props.onKeyDown(event);
        return 1;
    }
  },

  onClear() {
    this.onSelect(null);
    this.props.onClear();
  },

  onOk() {
    const { selectedValue } = this.state;
    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  },

  onDateInputChange(value) {
    this.onSelect(value, {
      source: 'dateInput',
    });
    this.props.giveform({
                          name: this.props.name,
                          value: value
                        });

  },
  onDateTableSelect(value) {
    this.onSelect(value);
    this.props.giveform({
                      name: this.props.name,
                      value: value
                    });

  },
  onToday() {
    const { value } = this.state;
    const now = getTodayTime(value);
    this.onSelect(now, {
      source: 'todayButton',
    });
  },
  getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },
  openTimePicker() {
    this.setState({
      showTimePicker: true,
    });
  },
  closeTimePicker() {
    this.setState({
      showTimePicker: false,
    });
  },
  activationCalendar(event){
    let value;
    (!event)?(value = 'none'):(value='block');
      this.setState({
        displaycalendar: value
      }, this.checkPosition)
  },
  hideCalendar(){
    this.setState({displaycalendar: false});
  },
  checkPosition(){
    if(this.state.displaycalendar == 'block'){
        window.temp = this.containerCalendar;
        let bottom = window.outerHeight - this.containerCalendar.getBoundingClientRect().bottom;
        let right = window.outerWidth - this.containerCalendar.getBoundingClientRect().right;
        if(bottom < 0){
            this.containerCalendar.style.bottom = 0;
        }
        if(right < 0){
             this.containerCalendar.style.right = 0;
        }
    }
  },
  render() {
    const props = this.props;
    const {
      locale, prefixCls, disabledDate,
      dateInputPlaceholder, timePicker,
      disabledTime, defaultValue,
    } = props;
    const state = this.state;
    const { value, selectedValue, showTimePicker } = state;
    const disabledTimeConfig = showTimePicker && disabledTime && timePicker ?
      getTimeConfig(selectedValue, disabledTime) : null;

    const timePickerEle = timePicker && showTimePicker ? React.cloneElement(timePicker, {
      showHour: true,
      showSecond: true,
      showMinute: true,
      ...timePicker.props,
      ...disabledTimeConfig,
      onChange: this.onDateInputChange,
      defaultOpenValue: value,
      value: selectedValue,
      disabledTime,
    }) : null;
    // console.log(defaultValue)
    const dateInputElement = props.showDateInput ? (

      <DateInput
        ref="dateInput"
        format={this.getFormat()}
        key="date-input"
        value={value}
        defaultValue = {defaultValue}
        locale={locale}
        placeholder= {dateInputPlaceholder}//'25.08.2018'
        showClear
        disabledTime={disabledTime}
        disabledDate={disabledDate}
        onClear={this.onClear}
        prefixCls={prefixCls}
        selectedValue={selectedValue}
        onChange={this.onDateInputChange}
        displaycalendar = {(this.state.displaycalendar == 'block')?true:false}
        activationCalendar = {this.activationCalendar}
      />
    ) : null;
    const children = [
      props.renderSidebar(),
      (<ClickOutside onClickOutside={this.hideCalendar} className={`${prefixCls}-panel`} key="panel">
            {dateInputElement}
            <div    className = {`${prefixCls}-date-panel`}
                    style =     {{display: this.state.displaycalendar}}
                    ref = {(containerCalendar)=>this.containerCalendar = containerCalendar}>
                <CalendarHeader     locale={locale}
                                    onValueChange={this.setValue}
                                    value={value}
                                    showTimePicker={showTimePicker}
                                    prefixCls={prefixCls} />
                {timePicker && showTimePicker ?
                    (<div className={`${prefixCls}-time-picker`}>
                      <div className={`${prefixCls}-time-picker-panel`}>
                        {timePickerEle }
                      </div>
                    </div>)
                : null}
                <div className={`${prefixCls}-body`}>
                    <DateTable
                      locale={locale}
                      value={value}
                      selectedValue={selectedValue}
                      prefixCls={prefixCls}
                      dateRender={props.dateRender}
                      onSelect={this.onDateTableSelect}
                      disabledDate={disabledDate}
                      showWeekNumber={props.showWeekNumber}
                    />
                </div>

                <CalendarFooter     showOk={props.showOk}
                                    renderFooter={props.renderFooter}
                                    locale={locale}
                                    prefixCls={prefixCls}
                                    showToday={props.showToday}
                                    disabledTime={disabledTime}
                                    showTimePicker={showTimePicker}
                                    showDateInput={props.showDateInput}
                                    timePicker={timePicker}
                                    selectedValue={selectedValue}
                                    value={value}
                                    disabledDate={disabledDate}
                                    okDisabled={!this.isAllowedDate(selectedValue)}
                                    onOk={this.onOk}
                                    onSelect={this.onSelect}
                                    onToday={this.onToday}
                                    onOpenTimePicker={this.openTimePicker}
                                    onCloseTimePicker={this.closeTimePicker} />
        </div>
    </ClickOutside>),
    ];

    return  (
                this.renderRoot({
                  children,
                  className: props.showWeekNumber ? `${prefixCls}-week-number` : '',
                })
                )
  },
});

export default Calendar;
