import React 		from 'react';
import DateTHead 	from './DateTHead.jsx';
import DateTBody 	from './DateTBody.jsx';

export default
class DateTable extends React.Component {
  render() {
    let ops = this.props;
    const prefixCls = ops.prefixCls;
    return (<table className = {`${prefixCls}-table`} cellSpacing="0" role="grid">
      <DateTHead {...ops}/>
      <DateTBody {...ops}/>
    </table>);
  }
}
