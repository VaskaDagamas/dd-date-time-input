import React        from 'react';
import ReactDOM     from 'react-dom';
import moment       from 'moment';
import PropTypes    from 'prop-types';
import createReactClass from 'create-react-class'

const DateInput = createReactClass({
  propTypes: {
    prefixCls: PropTypes.string,
    timePicker: PropTypes.object,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    disabledTime: PropTypes.any,
    format: PropTypes.string,
    locale: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    selectedValue: PropTypes.object,
  },
  getInitialState() {
    // console.log('getInitialState', this.props)
    const selectedValue = (!!this.props.selectedValue)?(this.props.selectedValue):(this.props.defaultValue);
    return {
      str: selectedValue && selectedValue.format(this.props.format) || '',
      invalid: false,
      activationCalendar: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // when popup show, click body will call this, bug!
    const selectedValue = (!!nextProps.selectedValue)?(nextProps.selectedValue):(nextProps.defaultValue);
    this.setState({
      str: selectedValue && selectedValue.format(nextProps.format) || '',
      invalid: false,
      activationCalendar: nextProps.displaycalendar
    });
  },

  onInputChange(event) {
    const str = event.target.value;
    this.setState({
      str,
    });
    let value;
    const { disabledDate, format, onChange } = this.props;
    if (str) {
      const parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({
          invalid: true,
        });
        return;
      }
      value = this.props.value.clone();
      value
        .year(parsed.year())
        .month(parsed.month())
        .date(parsed.date())
        .hour(parsed.hour())
        .minute(parsed.minute())
        .second(parsed.second());

      if (value && (!disabledDate || !disabledDate(value))) {
        const originalValue = this.props.selectedValue;
        if (originalValue && value) {
          if (!originalValue.isSame(value)) {
            onChange(value);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else {
        this.setState({
          invalid: true,
        });
        return;
      }
    } else {
      onChange(null);
    }
    this.setState({
      invalid: false,
    });
  },

  onClear() {
    this.setState({
      str: '',
    });
    this.props.onClear(null);
  },

  getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },

  focus() {
    this.refs.dateInput.focus();
  },
  activationCalendar(){
    this.props.activationCalendar(!this.state.activationCalendar)
    this.setState({
      activationCalendar: !this.state.activationCalendar
    })
  },
  render() {
    
    let props = this.props;
    const { invalid, str } = this.state;
    const { locale, prefixCls, placeholder } = props;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    let fill_color;
    (this.state.activationCalendar == false)?(fill_color = '#000000'):(fill_color = "#4179f8");
    return (<div className={`${prefixCls}-input-wrap`}>
      <div className={`${prefixCls}-date-input-wrap`}>
        <input
          ref="dateInput"
          className={`${prefixCls}-input ${invalidClass}`}
          value={str}
          disabled={props.disabled}
          placeholder={placeholder}
          onChange={this.onInputChange}
        />
        <svg onClick={this.activationCalendar} className='calendar_triger' width="12px" height="14px" viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="Task" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="New-Task-cards-states" transform="translate(-2440.000000, -155.000000)" fill="#000000">
                          <g id="Date-&amp;-Time-Copy" transform="translate(2264.000000, 76.000000)">
                              <g id="input-1" transform="translate(0.000000, 49.000000)">
                                  <g id="dropdown" transform="translate(21.000000, 20.000000)">
                                      <path fill = {fill_color}className="symbol" d="M156.714286,22 L165.285714,22 L165.285714,15.1428571 L156.714286,15.1428571 L156.714286,22 Z M165.285714,11.7142857 L165.285714,10 L163.571429,10 L163.571429,11.7142857 L158.428571,11.7142857 L158.428571,10 L156.714286,10 L156.714286,11.7142857 C155.767143,11.7142857 155,12.4814286 155,13.4285714 L155,22 C155,22.9471429 155.767143,23.7142857 156.714286,23.7142857 L165.285714,23.7142857 C166.232857,23.7142857 167,22.9471429 167,22 L167,13.4285714 C167,12.4814286 166.232857,11.7142857 165.285714,11.7142857 L165.285714,11.7142857 Z" id="Page-1"></path>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
        </svg>
      </div>
      {props.showClear ? <a
        className={`${prefixCls}-clear-btn`}
        role="button"
        title={locale.clear}
        onClick={this.onClear}
      /> : null}
    </div>);
  },
});

export default DateInput;
