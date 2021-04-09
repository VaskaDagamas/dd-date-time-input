import React, {useReducer, Component, Fragment}  	from 'react'
import {connect}                        		from 'react-redux';
import moment 					from 'moment'
import _ 	 					from "lodash"
import NewCalendar				from  'components/InfiniteCalendar/NewCalendar.jsx'
import {calendarIcon} 			from "images/simple_svg_icons.jsx"
import ClickOutside  			from 'react-click-outside'
import InputInstructions,
{SplitClasses, arrayClasses}	from "./temp.js"
// import ChooseTime  				from "oftenUsed/ChooseTime.jsx"
import TimePicker  				from "oftenUsed/TimePicker.jsx"
import 'css/timeInput.scss'

// window.UpdateInstructions = new UpdateInstructions({});
console.log("%c IMPORT TimePicker", coCSS, TimePicker)


const TimeInput = (Base) => class TimeInput extends Base{
	constructor(props){
		super(props);
		this.state = {
			dateTimePickerVisibility: 	false,
			value: 					this.props.value,
			isEmptyDate: 			!moment(this.props.value).isValid()
		}
		this.initialState = this.state;
		this.secondsVisibility = this.props.withSeconds ? true : false;
		this.valueWasChange = false;
		window.T = this
	}
	static getDerivedStateFromProps(props, state) {
		return {
			value: props.value,
			isEmptyDate: !moment(props.value).isValid(),
			messageText: moment(props.value).isValid() ? null : state.messageText,
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevState.isEmptyDate && !this.state.isEmptyDate){
			this.updateInputs(moment(this.state.value))
		}
	}
	componentDidMount() {
		this.addListenners()
	}
	componentWillUnmount() {
		this.removeListenner()
	}
	setNewDate = (newValue) => {
		this.valueWasChange = true;
		this.props.onChange({name: this.props.name, value: newValue})
	}
	validateDate = () => {
		if(this.valueWasChange){
			if(!this.allValuesIsValid){
				let messageText = '';
				const isBeforePeriod = this.periodIsDefined && !this.isBeforePeriod;
				const isAfterPeriod = this.periodIsDefined && !this.isAfterPeriod;
				switch(true){
					case !this.enteredDateIsValid :
						messageText = 'Проверьте правильность ввода даты'
					break;
					case isBeforePeriod :
						messageText = 'Дата не может быть раньше чем ' + moment(this.tempDate).format('DD.MM.YYYY - hh.mm.ss' )
					break;
					case isAfterPeriod :
						messageText = 'Дата не может быть позже чем ' + moment(this.tempDate).format('DD.MM.YYYY - hh.mm.ss' )
					break;
				}

				this.setState({
					messageText: messageText
				})
				return
			}
		}
		if(this.valueWasChange && !this.state.value){
			this.setState({
				messageText: 'Заполните дату'
			})
			return
		}
		if(this.valueWasChange && !this.state.value._isValid()){
			this.setState({
				messageText: 'Неверно указана дата'
			})
			return
		}

	}
	tooglePicker = () => {
		const {dateTimePickerVisibility} = this.state;
		this.setState({dateTimePickerVisibility: !dateTimePickerVisibility})
	}
	hidePicker = () => this.setState({dateTimePickerVisibility: false})
	onClickOutside = () => {
		this.validateDate();
		this.clearSelectedElement();
	}
	render(){
		const {dateTimePickerVisibility, value} = this.state;
		const { className, name, placeholder,
				textLabel, onChange, id, defaultValue, minDate, maxDate} = this.props;
		const idContainer = name + 'dateTimePicker';
		return 	<ClickOutside 	className = {'time_input_container ' + className}
								onClickOutside = {this.onClickOutside}>
					<label htmlFor = {id?id:name+'Id'} className = 'time_input_label'>{textLabel}</label>
					<div className = 'group_inputs' >
						<input 	type =        'text'
								className =   'days_input'
								onChange =    {(e)=>this.setDay(e.target.value)}
								value =       {this.getDay}
								onFocus =     {this.selectElement}
								ref =         {this.registerElement}
								onBlur =      {this.onBlurDay}
								placeholder = 'дд'
								name =        'Day' />
								.
						<input 	type =        'text'
								className =   'month_input'
								onChange =    {(e)=>this.setMonth(e.target.value)}
								value =       {this.getMonth}
								onBlur =      {this.onBlurMonth}
								onFocus =     {this.selectElement}
								ref =         {this.registerElement}
								placeholder = 'мм'
								name =        'Month' />
								.
						<input 	type =        'text'
								className =   'year_input'
								onChange =    {(e)=>this.setYear(e.target.value)}
								value =       {this.getYear}
								onBlur =      {this.onBlurYear}
								onFocus =     {this.selectElement}
								ref =         {this.registerElement}
								placeholder = 'гггг'
								name =        'Year' />
						<input 	type =        'text'
								className =   'hours_input'
								onChange =    {(e)=>this.setHours(e.target.value)}
								value =       {this.getHours}
								onBlur =      {this.onBlurMinutes}
								onFocus =     {this.selectElement}
								ref =         {this.registerElement}
								placeholder = 'чч'
								name =        'Hour' />
								:
						<input 	type =        'text'
								className =   'minutes_input'
								onChange =    {(e)=>this.setMinutes(e.target.value)}
								value =       {this.getMinutes}
								onBlur =      {this.onBlurMinutes}
								onFocus =     {this.selectElement}
								ref =         {this.registerElement}
								placeholder = 'мм'
								name =        'Minute' />
						{
							this.secondsVisibility ?
							<Fragment>
								:
								<input type =        'text'
										className =   'seconds_input'
										onChange =    {(e)=>this.setSetSeconds(e.target.value)}
										value =       {this.getSeconds}
										onBlur =      {this.onBlurSeconds}
										onFocus =     {this.selectElement}
										ref =         {this.registerElement}
										placeholder = 'сс'
										name =        'Second' />
							</Fragment>:
							null
						}
					</div>
					<button name = 		'showCalendar'
							className = 'time_input_show_button'
							onClick = 	{() => this.tooglePicker(!dateTimePickerVisibility) }>
						{calendarIcon(dateTimePickerVisibility)}
					</button>
					<Tooltip {...this.state} />
					<DateTimePicker onSelectDate =             { this.selectDateFromPickerInstructions }
									onSelectTime =             { this.selectTimeFromPickerInstructions }
									dateTimePickerVisibility = { dateTimePickerVisibility }
									hidePicker =               { this.hidePicker }
									idContainer = 			   { idContainer }
									name =                     { name } />

				</ClickOutside>
	}
}


arrayClasses.push({el: TimeInput, name: 'TimeInput'})
// arrayClasses.push({el: TimePicker, name: 'TimePicker'})
const ViewTimeInput = TimeInput(SplitClasses(arrayClasses, Component));

export default ViewTimeInput;



function Tooltip(props){
	const {messageText} = props;
	return 	messageText ?
			<div className = 'time_input_tooltip'>{messageText}</div> :
			null
}

function DateTimePicker(props){//add here value for calendar
	const {dateTimePickerVisibility, onSelectDate, name, hidePicker, onSelectTime, timeValue, idContainer} = props;
	return 	dateTimePickerVisibility ?
			<ClickOutside 	onClickOutside = {()=>dateTimePickerVisibility?hidePicker(false):null}
							id = {idContainer}
						  	className = 'date_time_picker_wrapper'>
				<NewCalendar 	onSelect = {onSelectDate}
								name = 	   {name}/>
				<TimePicker value = 				{timeValue}
							active = {true}
							idParrentContainer = 	{idContainer}
							onSelect = 				{onSelectTime}/>
			</ClickOutside> :
			<div 	id = {idContainer}
					className = 'date_time_picker_wrapper'
					style = {{visibility: 'hidden'}}>
			</div>
}

// function TimePicker(props) {
// 	//algorithm
// }




