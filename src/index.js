// import 'babel-polyfill'
import React      from 'react'
import TimeInput  from './TimeInput.jsx'
import { render } from 'react-dom'
import moment     from 'moment'

class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date:     new Date(),
            disabled: false
        }
        this.initialState = this.state;
    }
    render(){
        const {date, disabled} = this.state;
        return  <TimeInput  disabledDate =    {disabled}
                            onChange =        {(newDate)=>this.setState({date: newDate})}
                            minDate =         {moment().startOf('month')}
                            maxDate =         {moment().endOf('month')}
                            value =           {date}
                            name =            'end_date'/>
    }

}
render(
  <Container/>,
  document.getElementById('app_mountpoint')
)