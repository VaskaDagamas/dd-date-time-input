import React, { useReducer, Component, Fragment }        from 'react'
import moment                                            from 'moment'
import NewCalendar                                       from './InfiniteCalendar/NewCalendar.jsx'
import { calendarIcon, closeIcon }                       from "./jsxImages.js"
import ClickOutside                                      from 'react-click-outside'
import InputInstructions, { SplitClasses, arrayClasses } from "./instructons.js"
import TimePicker                                        from "./TimePicker.jsx"
import ReactDOM                                          from "react-dom";

import './timeInput.scss'

export const TIContext = React.createContext(null);
		

//dublicate in src\InfiniteCalendar\util\index.js
export function getSavedLocale(localeFromProps) {
	const savedLocale = localeFromProps ? localeFromProps : localStorage.getItem('lang') ;
	if(savedLocale == 'ua' ){
		return 'uk'
	  
	}
	return savedLocale ? savedLocale : 'uk'
	
}
const TimeInput = (Base) => class TimeInput extends Base{
	constructor(props){
		super(props);

		const {locale} = this.props;
		const componentLocale = getSavedLocale(locale);
		moment.locale(componentLocale);

		this.state = {
			dateTimePickerVisibility: 	false,
			value: 					this.props.value ? moment(this.props.value) : null,
			isEmptyDate: 			!moment(this.props.value).isValid(),
			locale: 				componentLocale
		}
		this.initialState = this.state;
		this.secondsVisibility = this.props.withSeconds ? true : false;
		this.valueWasChange = false;
		if(this.props.value){
			this.tempDate = moment(this.props.value)
		}
		window.T = this
		this.displayName = 'TimeInput';
		
	}
	static getDerivedStateFromProps(props, state) {
		return {
			value: props.value ? moment(props.value) : null,
			isEmptyDate: !moment(props.value).isValid(),
			// messageText: moment(props.value).isValid() ? null : state.messageText,
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const {value} = this.props;
		if(prevState.isEmptyDate == false && value == null){
			this.clearEnteredValues();
			this.forceUpdate();
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
		this.validateDate(newValue);
		this.valueWasChange = true;
		this.props.onChange({name: this.props.name, value: newValue})
	}
	validateDate = (value) => {
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
		if(this.valueWasChange && !value){
			this.setState({
				messageText: 'Заполните дату'
			})
			return
		}
		if(this.valueWasChange && !moment(value).isValid()){
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
	tooglePicker = (e) => {
		e.preventDefault();
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
			this.validateDate(this.state.value);
			this.clearSelectedElement();
		}
	}
	hideMessage = () => {
		this.messageWasShowed = true
		this.setState({messageText: ''})
	}
	clearDate = (e) => {
		e.preventDefault();
		this.clearEnteredValues();
		this.valueWasChange = false;
		this.props.onChange({name: this.props.name, value: null})
	}
	render(){
		const {dateTimePickerVisibility, value, isEmptyDate, locale} = this.state;
		const { className, name, placeholder, hiddenTime,
				textLabel, onChange, id, defaultValue, minDate, maxDate,
				disabledDate, orangeStyle, clearHidden} = this.props;
		const idContainer = name + 'dateTimePicker';
		if(!this.isSelected && !isEmptyDate){//crutch for situation when date was received from props
			this.updateInputs(value)
		}
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
									style = {{display: hiddenTime ? 'none' : 'inline-block'}}
									onChange =    {(e)=>this.setHours(e.target.value)}
									value =       {this.getHours}
									onBlur =      {this.onBlurMinutes}
									onFocus =     {this.selectElement}
									ref =         {(el)=>this.registerElement(el)}

									placeholder = 'чч'
									name =        'Hour' />
							{ hiddenTime ? null : ':' }
							<input 	type =        'text'
									className =   'minutes_input'
									style = {{display: hiddenTime ? 'none' : 'inline-block'}}
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
									<input  type =        'text'
											className =   'seconds_input'
											onChange =    {(e)=>this.setSeconds(e.target.value)}
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
						{
							!clearHidden ?
							<button name = 		'clearDate'
									className = 'time_input_clear_button'
									style  = 	{{visibility: value ? 'visible' :'hidden' }}
									disabled =  {disabledDate}
									onClick = 	{this.clearDate }>
								{closeIcon('time_input_close_icon')}
							</button> :
							null
						}
					</div>
					<TIContext.Provider value = { locale }>		
						<Tooltip {...this.state} clearMessage = {this.hideMessage}/>
						<DateTimePicker onSelectDate =             { this.selectDateFromPickerInstructions }
										onSelectTime =             { this.selectTimeFromPickerInstructions }
										dateTimePickerVisibility = { dateTimePickerVisibility }
										selectedHour = 			   { this.getHours}
										selectedMinute = 		   { this.getMinutes}
										hidePicker =               { this.hidePicker }
										minDate = 				   {minDate}
										maxDate = 				   {maxDate}
										value = 				   {value}
										idContainer = 			   { idContainer }
										orangeStyle = 			   {orangeStyle}
										name =                     { name } />
					</TIContext.Provider>					

				</ClickOutside>
	}
}


arrayClasses.push({el: TimeInput, name: 'TimeInput'});
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
		orangeStyle, locale,
		selectedHour, selectedMinute} = props;
	const disabledDate = (value) => {
		if(props.maxDate && props.minDate){
			return value > props.maxDate || value < props.minDate
		}
		if(props.minDate){
			return value < props.minDate
		}
		if(props.maxDate){
			return value > props.maxDate
		}
		return false
	}
	return 	dateTimePickerVisibility ?
			ReactDOM.createPortal(
				<ClickOutside 	onClickOutside = {hidePicker}
								id = {idContainer}
							  	className = 'date_time_picker_wrapper ABSFixCent'>
					<button onClick = {hidePicker} className = 'close_picker_btn'>{closeIcon('close_icon')}</button>
					<NewCalendar 	onSelect = 		{onSelectDate}
									prefixCls = 	{'time_input_calendar'}
									locale = 		{locale}
									disabledDate = 	{disabledDate}
									minDate = 		{props.minDate}
									maxDate =   	{props.maxDate}
									onChange = 		{e => onSelectDate({name: name, value:e}) }
									value = 		{moment(props.value).isValid() ? props.value : moment()}
									name = 	   		{name}/>
					<TimePicker active = 				{true}
								orangeStyle = 			{orangeStyle}
								locale = 				{locale}
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




