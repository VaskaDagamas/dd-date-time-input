import React from 'react';
import DateConstants from './DateConstants.js';
import moment from 'moment';

export default
class DateTHead extends React.Component {
  render() {
    let ops = this.props;
    const value = ops.value;
    const localeData = value.localeData();
    const prefixCls = ops.prefixCls;
    const veryShortWeekdays = [];
    const weekDays = [];
    const firstDayOfWeek = localeData.firstDayOfWeek();
    let showWeekNumberEl;
    const now = moment();
    for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
      const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
      now.day(index);
      veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
      weekDays[dateColIndex] = localeData.weekdaysShort(now);
    }
    if (ops.showWeekNumber) {
      showWeekNumberEl = (
        <th
          role="columnheader"
          className={`${prefixCls}-column-header ${prefixCls}-week-number-header`}
        >
          <span className={`${prefixCls}-column-header-inner`}>x</span>
        </th>);
    }
    const weekDaysEls = weekDays.map((day, xindex) => {
      return (
        <th
          key={xindex}
          role="columnheader"
          title={day}
          className={`${prefixCls}-column-header`}
        >
          <span className={`${prefixCls}-column-header-inner`}>
          {veryShortWeekdays[xindex]}
          </span>
        </th>);
    });
    return (<thead>
    <tr role="row">
      {showWeekNumberEl}
      {weekDaysEls}
    </tr>
    </thead>);
  }
}
