import PropTypes    from 'prop-types';
import en           from '../locale/en_US.js';
import ru           from '../locale/ru_RU.js'
import ua           from '../locale/ua_UA.js'
let list = {
    en: en,
    ru: ru,
    ua: ua,
}
function noop() {
}

export default {
  propTypes: {
    className: PropTypes.string,
    locale: PropTypes.object,
    style: PropTypes.object,
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    onOk: PropTypes.func,
  },

  getDefaultProps() {
    let locale = localStorage.getItem('lang');
    return {
      locale: list[locale],
      style: {},
      visible: true,
      prefixCls: 'calendar',
      className: '',
      onSelect: noop,
      onChange: noop,
      onClear: noop,
      renderFooter() {
        return null;
      },
      renderSidebar() {
        return null;
      },
    };
  },

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  getFormat() {
    let { format } = this.props;
    const { locale, timePicker } = this.props;
    if (!format) {
      if (timePicker) {
        format = locale.dateTimeFormat;
      } else {
        format = locale.dateFormat;
      }
    }
    return format;
  },

  focus() {
    if (this.refs.root) {
      this.refs.root.focus();
    }
  },
};
