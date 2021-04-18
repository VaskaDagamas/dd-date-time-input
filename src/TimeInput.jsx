import React, { useReducer, Component, Fragment }        from 'react'
import moment                                            from 'moment'
import NewCalendar                                       from './InfiniteCalendar/NewCalendar.jsx'
import { calendarIcon, closeIcon }                       from "./jsxImages.js"
import ClickOutside                                      from 'react-click-outside'
import InputInstructions, { SplitClasses, arrayClasses } from "./instructons.js"
import TimePicker                                        from "./TimePicker.jsx"
import ReactDOM                                          from "react-dom";

import './timeInput.scss'

const TimeInput = (Base) => class TimeInput extends Base{
	constructor(props){
		super(props);
		this.state = {
			dateTimePickerVisibility: 	false,
			value: 					moment(this.props.value),
			isEmptyDate: 			!moment(this.props.value).isValid()
		}
		this.initialState = this.state;
		this.secondsVisibility = this.props.withSeconds ? true : false;
		this.valueWasChange = false;
		if(this.props.value){
			this.tempDate = moment(this.props.value)
		}
		window.T = this
	}
	static getDerivedStateFromProps(props, state) {
		return {
			value: moment(props.value),
			isEmptyDate: !moment(props.value).isValid(),
			// messageText: moment(props.value).isValid() ? null : state.messageText,
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevState.isEmptyDate && !this.state.isEmptyDate){
			this.updateInputs(moment(this.state.value))
		}
	}
	componentDidMount() {
		// this.addListenners()
		this.mounted = true;
	}
	componentWillUnmount() {
		this.mounted = false;
		this.selectedElement = null;
		// this.removeListenner()
	}
	setNewDate = (newValue) => {//
		this.messageWasShowed = false;
		this.tempDate = newValue;
		this.validateDate();
		this.valueWasChange = true;
		this.props.onChange({name: this.props.name, value: newValue})
	}
	validateDate = () => {
		if(this.valueWasChange && !this.messageWasShowed){
			if(!this.allValuesIsValid){
				let messageText = '';
				const isBeforePeriod = this.periodIsDefined && !this.isBeforePeriod;
				const isAfterPeriod = this.periodIsDefined && !this.isAfterPeriod;
				switch(true){
					case !this.enteredDateIsValid :
						messageText = 'Проверьте правильность ввода даты'
					break;
					case isBeforePeriod :
						messageText = 'Дата больше максимальной'//не может быть раньше чем  + moment(this.props.maxDate).format('DD.MM.YYYY - HH.mm.ss' )
					break;
					case isAfterPeriod :
						messageText = 'Дата меньше минимальной'//не может быть позже чем ' + moment(this.props.minDate).format('DD.MM.YYYY - HH.mm.ss' )
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
		if(this.valueWasChange && !moment(this.state.value).isValid()){
			this.setState({
				messageText: 'Неверно указана дата'
			})
			return
		}
		if(this.allValuesIsValid){
			this.setState({
				messageText: ''
			})
		}
	}
	tooglePicker = () => {
		const {dateTimePickerVisibility} = this.state;
		const {name} = this.props;
		const idContainer = name + 'dateTimePicker';
		const idPsevdoInput = name + 'input';
		const setPositionOfPicker = () => 	!dateTimePickerVisibility ?
											 setTimeout(()=>setPicketInToView(idContainer, idPsevdoInput), 100) :
											 null;
		this.setState({dateTimePickerVisibility: !dateTimePickerVisibility}, setPositionOfPicker)
	}
	hidePicker = (e) => {
		const idContainer = this.props.name + 'input';
		const getTimePicker = (path) => {
			return 	path ?
					path.find(el => typeof el.id == 'string' ? el.id.search(idContainer) !== -1 : false) :
					false
		}
		if(!getTimePicker(e.path)){
			this.setState({dateTimePickerVisibility: false})
		}
	}
	onClickOutside = () => {
		if(this.mounted){
			this.validateDate();
			this.clearSelectedElement();
		}
	}
	hideMessage = () => {
		this.messageWasShowed = true
		this.setState({messageText: ''})
	}
	render(){
		const {dateTimePickerVisibility, value} = this.state;
		const { className, name, placeholder,
				textLabel, onChange, id, defaultValue, minDate, maxDate, disabledDate} = this.props;
		const idContainer = name + 'dateTimePicker';
		return 	<ClickOutside 	className = {'time_input_container ' + className}
								onClickOutside = {this.onClickOutside}>

					{
						textLabel ?
						<label htmlFor = {id?id:name+'Id'} className = 'time_input_label'>{textLabel}</label> :
						null
					}
					<div className = 'psevdo_time_input' id = {name + 'input'}>
						<div className = 'group_inputs' >
							<input 	type =        'text'
									className =   'days_input'
									onChange =    {(e)=>this.setDay(e.target.value)}
									value =       {this.getDay}
									onFocus =     {this.selectElement}
									ref =         {(el)=>this.registerElement(el)}
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
									ref =         {(el)=>this.registerElement(el)}

									placeholder = 'мм'
									name =        'Month' />
									.
							<input 	type =        'text'
									className =   'year_input'
									onChange =    {(e)=>this.setYear(e.target.value)}
									value =       {this.getYear}
									onBlur =      {this.onBlurYear}
									onFocus =     {this.selectElement}
									ref =         {(el)=>this.registerElement(el)}

									placeholder = 'гггг'
									name =        'Year' />
							<input 	type =        'text'
									className =   'hours_input'
									onChange =    {(e)=>this.setHours(e.target.value)}
									value =       {this.getHours}
									onBlur =      {this.onBlurMinutes}
									onFocus =     {this.selectElement}
									ref =         {(el)=>this.registerElement(el)}

									placeholder = 'чч'
									name =        'Hour' />
									:
							<input 	type =        'text'
									className =   'minutes_input'
									onChange =    {(e)=>this.setMinutes(e.target.value)}
									value =       {this.getMinutes}
									onBlur =      {this.onBlurMinutes}
									onFocus =     {this.selectElement}
									ref =         {(el)=>this.registerElement(el)}

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
											ref =         {(el)=>this.registerElement(el)}

											placeholder = 'сс'
											name =        'Second' />
								</Fragment>:
								null
							}
						</div>
						<button name = 		'showCalendar'
								className = 'time_input_show_button'
								disabled =    {disabledDate}
								onClick = 	{this.tooglePicker }>
							{calendarIcon(dateTimePickerVisibility)}
						</button>
					</div>
					<Tooltip {...this.state} clearMessage = {this.hideMessage}/>
					<DateTimePicker onSelectDate =             { this.selectDateFromPickerInstructions }
									onSelectTime =             { this.selectTimeFromPickerInstructions }
									dateTimePickerVisibility = { dateTimePickerVisibility }
									selectedHour = 			   { this.getHours}
									selectedMinute = 		   { this.getMinutes}
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
			<ClickOutside className = 'time_input_tooltip' onClickOutside = {props.clearMessage}>{messageText}</ClickOutside> :
			null
}

function DateTimePicker(props){//add here value for calendar
	const {dateTimePickerVisibility, onSelectDate, name, hidePicker, onSelectTime, timeValue, idContainer,
		selectedHour, selectedMinute} = props;
	return 	dateTimePickerVisibility ?
			ReactDOM.createPortal(
				<ClickOutside 	onClickOutside = {hidePicker}
								id = {idContainer}
							  	className = 'date_time_picker_wrapper ABSFixCent'>
					<button onClick = {hidePicker} className = 'close_picker_btn'>{closeIcon('close_icon')}</button>
					<NewCalendar 	onSelect = {onSelectDate}
									name = 	   {name}/>
					<TimePicker active = {true}
								selectedHour = 			{selectedHour}
								selectedMinute = 		{selectedMinute}
								idParrentContainer = 	{idContainer}
								onSelect = 				{onSelectTime}/>
				</ClickOutside>,
				document.body
			):
			null
}

function setPicketInToView(timePickerId) {
	const pickerContainer = document.getElementById(timePickerId);
	const rect = pickerContainer.getBoundingClientRect();
	const maxBottom = window.innerHeight;
	const maxRight = window.innerWidth;
	pickerContainer.classList.add('ABSFixCent')
	// if(window.innerWidth >= rect.width+15 && window.innerHeight >= rect.height){
	// 	if(rect.bottom > maxBottom){
	// 		pickerContainer.style.top = maxBottom -rect.bottom  + 'px';

	// 	}
	// 	if(rect.right > maxRight){
	// 		pickerContainer.style.left = maxRight - rect.right - 15  + 'px';
	// 	}

	// }
}




