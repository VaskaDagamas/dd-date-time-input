import React from 'react';
import CalendarHeader from '../calendar/CalendarHeader.jsx';
import DateTable from '../date/DateTable.jsx';
import DateInput from '../date/DateInput.js';
import { getTimeConfig } from '../util/index.js';
import PropTypes from 'prop-types';
import moment from 'moment'
import createReactClass from 'create-react-class'

const CalendarPart = createReactClass({
  propTypes: {
    value: PropTypes.any,
    direction: PropTypes.any,
    prefixCls: PropTypes.any,
    locale: PropTypes.any,
    selectedValue: PropTypes.any,
    hoverValue: PropTypes.any,
    showTimePicker: PropTypes.bool,
    format: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    onInputSelect: PropTypes.func,
    timePickerDisabledTime: PropTypes.object,
  },
  render() {
    const props = this.props;

    const {
      value, direction, prefixCls,
      locale, selectedValue, format, placeholder,
       timePicker, disabledDate, disabledTime,
      timePickerDisabledTime, showTimePicker,
      hoverValue, onInputSelect,
    } = props;
   // let disabledDate = moment().add(-2, 'days');
    const disabledTimeConfig = showTimePicker && disabledTime && timePicker ?
      getTimeConfig(selectedValue, disabledTime) : null;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
      showTimePicker,
    };
    const index = direction === 'left' ? 0 : 1;
    const timePickerEle = showTimePicker && timePicker &&
      React.cloneElement(timePicker, {
        showHour: true,
        showMinute: true,
        showSecond: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        ...timePickerDisabledTime,
        onChange: onInputSelect,
        defaultOpenValue: value,
        value: selectedValue[index],
      });
    return (
      <div className={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
        <DateInput
          format={format}
          locale={locale}
          prefixCls={prefixCls}
          timePicker={timePicker}
          disabledDate={disabledDate}
          placeholder={placeholder}
          disabledTime={disabledTime}
          value={value}
          showClear={false}
          selectedValue={selectedValue[index]}
          onChange={onInputSelect}
        />
        <div style={{ outline: 'none' }}>
          <CalendarHeader
            {...newProps}
            enableNext={direction === 'right'}
            enablePrev={direction === 'left'}
            onValueChange={props.onValueChange}
          />
          {showTimePicker ? <div className={`${prefixCls}-time-picker`}>
            <div className={`${prefixCls}-time-picker-panel`}>
              {timePickerEle}
            </div>
          </div> : null}
          <div className={`${prefixCls}-body`}>
            <DateTable
              {...newProps}
              hoverValue={hoverValue}
              selectedValue={selectedValue}
              dateRender={props.dateRender}
              onSelect={props.onSelect}
              onDayHover={props.onDayHover}
              disabledDate={disabledDate}
              showWeekNumber={props.showWeekNumber}
            />
          </div>
        </div>
      </div>);
  },
});

export default CalendarPart;
