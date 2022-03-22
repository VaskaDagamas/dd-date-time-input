import moment from 'moment'window.moment = moment;function replaceAllIsNotNumber(value) {    return value.replace(/\D/g, '')}function modifyVehiclesList(vehiclesList){//tempDesission    const modifiedList = [];    return  arrayIsEmpty(vehiclesList) ?            Array.from(vehiclesList, vehicleDto => vehicleDto.vehicle) :            null}const isValid = (date) => date ? moment(date).isValid : false;const Day = (Base) => class Day extends Base { //is date in momentjs	_entered_day_ = null;	get entered_day() {		return this._entered_day_	}	set entered_day(value) {		if(value.length > 2) {			let length = value.length;			value = value.slice(length - 2, length);		}		this._entered_day_ = value;		if(value.length == 2 && this.isValidDay) {			this.setSelectedNextInput(this.getDOMInput('Day'))		}		this.forceUpdate()	}	dayInputSelect = () => {		this.isSelected = true;	}	validateDay() {		if(this.isValidDay) {			this.setElementValid(this.getDOMInput('Day'));		} else {			this.setElementInvalid(this.getDOMInput('Day'));		}	}	onBlurDay = (e) => {		this.validateDay();		this.addZerroIfNeed(this.entered_day)	}	addZerroIfNeed(value){		return 	value !== this.doNiceValue(value) ?				this.setDay(this.doNiceValue(value)) :				null	}	get isValidDay() {		const minDay = 1;		const maxDay = !this.state.isEmptyDate ? this.state.value.daysInMonth() : 31;		const itsBetween = Number(this.entered_day) >= minDay && Number(this.entered_day) <= maxDay;		return this.entered_day !== null && itsBetween	}	setDay(value) {		this.entered_day = replaceAllIsNotNumber(value); //Number(value) < 10 ? '0' + value : value;		if(this.isValidDay) {			this.updateDateFromInputs('date', this.entered_day)		}	}	get getDay() {		const dayFromDate = String(this.getValueFromDate('date'));		const dayForView = this.doNiceValue(dayFromDate);		this._entered_day_ = this._entered_day_ === null ? dayForView : this._entered_day_;		return this.entered_day	}}const Month = (Base) => class Month extends Base {	_entered_month_ = null	get entered_month() {		return this._entered_month_	}	set entered_month(value) {		if(value && value.length > 2) {			let length = value.length;			value = value.slice(length - 2, length)		}		this._entered_month_ = value;		if(value && value.length == 2 && this.isValidMonth) {			this.setSelectedNextInput(this.getDOMInput('Month'))		}		this.forceUpdate()	}	get isValidMonth() {		const minValue = 1;		const maxValue = 12;		const itsBetween = Number(this.entered_month) >= minValue && Number(this.entered_month) <= maxValue;		return this.entered_month !== null && itsBetween	}	onBlurMonth = (e) => {		const {isEmptyDate} = this.state;		if(this.isValidMonth) {			this.setElementValid(this.getDOMInput('Month'));			!isEmptyDate?this.validateDay():null		} else {			this.setElementInvalid(this.getDOMInput('Month'))		}		this.isSelected = false;	}	setMonth(value) {		this.entered_month = replaceAllIsNotNumber(value);		if(this.isValidMonth) {			if(Number(this.entered_month) !== 0) {				this.updateDateFromInputs('month', this.entered_month)			}		}	}	upMonthForMoment(){}	get getMonth() {		const monthFromDate = this.getValueFromDate('month') ? String(this.getValueFromDate('month')+1) : '';		const monthForView = this.doNiceValue(monthFromDate);		this._entered_month_ = this._entered_month_ === null ? monthForView : this._entered_month_;		return this.entered_month	}}const Year = (Base) => class Year extends Base {	_entered_year_ = null	get entered_year() {		return this._entered_year_	}	set entered_year(value) {		if(value.length > 4) {			let length = value.length;			value = value.slice(length - 4, length);		}		this._entered_year_ = value;		if(value.length == 4 && this.isValidYear) {			this.setSelectedNextInput(this.getDOMInput('Year'))			this.isSelected = false;		}		this.forceUpdate()	}	get isValidYear() {		const minYear = 1970;		const maxYear = 2221;		const itsBetween = Number(this.entered_year) >= minYear && Number(this.entered_year) <= maxYear;		return this.entered_year !== null && itsBetween;	}	onBlurYear = (e) => {		const {isEmptyDate} = this.state;		if(this.isValidYear) {			this.setElementValid(this.getDOMInput('Year'));			!isEmptyDate?this.validateDay():null;		} else {			this.setElementInvalid(this.getDOMInput('Year'))		}		this.isSelected = false;	}	setYear(value) {		this.entered_year = replaceAllIsNotNumber(value);		if(this.isValidYear) {			this.updateDateFromInputs('year', this.entered_year)		}	}	get getYear() {		const yearFromDate = String(this.getValueFromDate('year'));		this._entered_year_ = this._entered_year_ === null ? yearFromDate : this._entered_year_;		return this.entered_year	}}const Hour = (Base) => class Hour extends Base {	_entered_hour_ = null;	get entered_hour() {		return this._entered_hour_	}	set entered_hour(value) {		if(value.length > 2) {			let length = value.length;			value = value.slice(length - 2, length);		}		this._entered_hour_ = value;		if(value.length == 2 && this.isValidHour) {			this.setSelectedNextInput(this.getDOMInput('Hour'))			this.isSelected = false;		}		this.forceUpdate()	}	onBlurHours = (e) => {		if(this.isValidHour) {			this.setElementValid(this.hourInput);		} else {			this.setElementInvalid(this.hourInput)		}		this.isSelected = false;	}	get isValidHour() {		const minValue = 0;		const maxValue = 23;		const itsBetween = Number(this.entered_hour) >= minValue && Number(this.entered_hour) <= maxValue;		return this.entered_hour !== null && itsBetween	}	setHours(value) {		this.entered_hour = replaceAllIsNotNumber(value);		if(this.isValidHour) {			this.updateDateFromInputs('hour', this.entered_hour)		}	}	get getHours() {		const hourFromDate = String(this.getValueFromDate('hour'));		const hourForView = hourFromDate.length == 1 ? '0' + hourFromDate : hourFromDate;		this._entered_hour_ = this._entered_hour_ === null ? hourForView : this._entered_hour_;		return this.entered_hour	}}const Minute = (Base) => class Minute extends Base {	#name = 'Minute'	_entered_minute_ = null	get entered_minute() {		return this._entered_minute_	}	set entered_minute(value) {		if(value.length > 2) {			let length = value.length;			value = value.slice(length - 2, length);		}		this._entered_minute_ = value;		if(value.length == 2 && this.isValidMinute) {			this.setSelectedNextInput(this.getDOMInput('Minute'))			this.isSelected = false;		}		this.forceUpdate();	}	onBlurMinutes = (e) => {		if(this.isValidMinute) {			this.setElementValid(this.getDOMInput('Minute'));		} else {			this.setElementInvalid(this.getDOMInput('Minute'))		}		this.isSelected = false;	}	get isValidMinute() {		const minValue = 0;		const maxValue = 59;		const itsBetween = Number(this.entered_minute) >= minValue && Number(this.entered_minute) <= maxValue;		return this.entered_minute !== null && itsBetween	}	setMinutes(value) {		this.entered_minute = replaceAllIsNotNumber(value);		if(this.isValidMinute) {			this.updateDateFromInputs('minute', this.entered_minute)		}	}	get getMinutes() {		const minuteFromDate = String(this.getValueFromDate('minute'));		const minuteForView = this.doNiceValue(minuteFromDate);		this._entered_minute_ = this._entered_minute_ === null ? minuteForView : this.entered_minute		return this.entered_minute	}}const Second = (Base) => class Second extends Base {	#name = 'Second'	_entered_second_ = null	get entered_second() {		return this._entered_second_	}	set entered_second(value) {		if(value.length > 2) {			let length = value.length;			value = value.slice(length - 2, length);		}		this._entered_second_ = value;		if(value.length == 2 && this.isValidSeconds) {			const updateOnTimeOut = () => {				this.updateDateFromInputs('second', this.entered_second)				this.onBlurSeconds();			}			clearTimeout(this.timeOutOnUpdateSecond);			this.timeOutOnUpdateSecond = setTimeout(updateOnTimeOut, 150);			// this.setSelectedNextInput(this.getDOMInput('Second'))			// this.isSelected = false;		}		this.forceUpdate();	}	onBlurSeconds = (e) => {		if(this.isValidSeconds) {			this.setElementValid(this.getDOMInput('Second'));		} else {			this.setElementInvalid(this.getDOMInput('Second'))		}		this.isSelected = false;	}	get isValidSeconds() {		const minValue = 0;		const maxValue = 59;		const itsBetween = Number(this.entered_second) >= minValue && Number(this.entered_second) <= maxValue;		if(!this.secondsVisibility) {			return true		} else {			return this.entered_second !== null && itsBetween		}	}	setSeconds(value) {		this.entered_second = replaceAllIsNotNumber(value);		if(this.isValidSeconds) {			this.updateDateFromInputs('second', this.entered_second)		}		if(this.allValuesIsValid) {			this.setNewDate(this.tempDate)		}	}	get getSeconds() {		const secondsFromDate = String(this.getValueFromDate('second'));		const secondsForView = this.doNiceValue(secondsFromDate);		this._entered_second_ = this._entered_second_ === null ? secondsForView : this.entered_second		return this.entered_second ? this.entered_second : secondsForView;	}}const UpdateInstructions = Base => class extends Base {	listMountedInputs = new Array();	tempDate = moment();	get allValuesIsEntered(){		const isSecondsNotEmpty = (this.secondsVisibility && this._entered_second_) || !this.secondsVisibility;		return this._entered_hour_ && this._entered_minute_ && this._entered_day_ && this._entered_year_ && this._entered_month_ && isSecondsNotEmpty	}	get allValuesIsCleared(){		const isSecondsNotEmpty = (this.secondsVisibility && this._entered_second_) || !this.secondsVisibility;		return !this._entered_hour_ && !this._entered_minute_ && !this._entered_day_ && !this._entered_year_ && !this._entered_month_ && !isSecondsNotEmpty	}	get allValuesIsValid() {		const validationRules = [			this.isInPeriod,			!this.isBeforePeriod,			!this.isAfterPeriod,		];		const checkPeriodResult = this.periodIsDefined ? !validationRules.includes(false) : true;		return 	isValid(this.tempDate) ?				checkPeriodResult :				false	}	get enteredDateIsValid() {		return isValid(this.tempDate)	}	get periodIsDefined() {		const { minDate, maxDate } = this.props;		return isValid(minDate) || isValid(maxDate)	}	get isInPeriod() {		const { minDate, maxDate } = this.props;		if(isValid(minDate) && isValid(maxDate)) {			return new Date(minDate) <= this.tempDate && this.tempDate <= new Date(maxDate);		}		return true	}	get isBeforePeriod() {		const { minDate, maxDate } = this.props;		if(isValid(minDate)) {  //&& !isValid(maxDate)			return new Date(minDate) > this.tempDate		}	}	get isAfterPeriod() {		const { minDate, maxDate } = this.props;		if(isValid(maxDate) ) { //&& !isValid(minDate)			return this.tempDate > new Date(maxDate)		}	}	getNextInput(currentInputName) {		const curentIndex = this.listMountedInputs.findIndex(el => currentInputName == el.name);		return 	curentIndex + 1 < this.listMountedInputs.length ?				this.listMountedInputs[curentIndex + 1] :				null	}	getDOMInput(name) {		return this[name]	}	setSelectedNextInput(currentInput) {		const nextInput = this.getNextInput(currentInput.name);		if(nextInput) {			nextInput.focus()			nextInput.select()		} else {			this.setValuesFromInputToDate()			if(this.allValuesIsValid) {				this.setNewDate(this.tempDate)			}		}	}	setValuesFromInputToDate = () => {		this.tempDate.set({			'year': Number(this._entered_year_),			'month': Number(this._entered_month_)-1,			'date': Number(this._entered_day_),			'hour': Number(this._entered_hour_),			'minute': Number(this._entered_minute_),			'second': Number(this._entered_second_),		})	}	setValuesFromDateToInput(newDate) {		const dd = (value) => this.doNiceValue(String(value));		this.setYear(String(newDate.get('year')))		this.setMonth(dd(newDate.get('month')+1));		this.setDay(dd(newDate.get('date')));		this.setHours(dd(newDate.get('hour')))		this.setMinutes(dd(newDate.get('minute')))		this.secondsVisibility ? this.setSeconds(dd(newDate.get('second'))) : null;	}	updateInputs(newDate) {		const day = newDate.get('date');		const month = newDate.get('month');		const year = newDate.get('year');		const hour = newDate.get('hour');		const minute = newDate.get('minute');		const second = newDate.get('second');		this._entered_year_ = this.doNiceValue(String(year))		this._entered_month_ = this.doNiceValue(String(month+1))		this._entered_day_ = this.doNiceValue(String(day))		this._entered_hour_ = this.doNiceValue(String(hour))		this._entered_minute_ = this.doNiceValue(String(minute))		this._entered_second_ = this.doNiceValue(String(second))		// this.forceUpdate();	}	updateDateFromInputs = (name, valueFromInput) => {		const { isEmptyDate, value } = this.state;		if(Number(valueFromInput) !== 0) {			if(name == 'month'){				valueFromInput = Number(valueFromInput)-1			}			if(isEmptyDate) {				this.tempDate.set(name, Number(valueFromInput));				if(this.allValuesIsEntered){					this.setNewDate(this.tempDate)				}			} else {				value.set(name, Number(valueFromInput));				this.setNewDate(value)			}		}else{			if(name == 'minute'||name == 'hour'||name == 'second'){				if(value !== ''){					if(isEmptyDate) {						this.tempDate.set(name, Number(valueFromInput));						if(this.allValuesIsEntered){							this.setNewDate(this.tempDate)						}					} else {						value.set(name, Number(valueFromInput));						this.setNewDate(value)					}				}			}		}		// if(!this.allValuesIsCleared){		// 	this.setNewDate(null)		// }	}	registerElement = (el) => {		if(el){			if(!this.listMountedInputs.find(elM => elM.name == el.name)){				this.listMountedInputs.push(el);			}			this[el.name] = el;		}	}	checkOnEmptyEnteredValues() {		arrayIsEmpty(this.listMountedInputs) ?			this.listMountedInputs.find(el => {				console.log("%c CHECKONEMPTYENTEREDVALUES el.name, this.value", coCSS, el, el.name, this.value)				return el.name == 'xz'			}) :			null	}	getValueFromDate = (valueName) => {		const { value, isEmptyDate } = this.state;		if(isEmptyDate) {			return ''		} else {			return value.get(valueName);		}	}	doNiceValue(value) {		if(typeof value == 'string' && value.length) {			return Number(value) < 10 ? '0' + value : value		}		return ''	}	setElementInvalid(element) {		element.style = 'box-shadow: inset 0px 0px 90px -66px red;'	}	setElementValid(element) {		element.style = 'box-shadow: none'	}	selectElement = (e) => {		const element = e.target;		element.select();		this.selectedElement = e.target;		this.isSelected = true;	}	clearSelectedElement = () => {		this.selectedElement = null;	}	selectDateFromPickerInstructions = (e) => {		const newDate = moment(e.value);		let { value, isEmptyDate } = this.state;		if(isEmptyDate) {			newDate.set('hour', 0);			newDate.set('minute', 0);			newDate.set('second', 0);			this.setNewDate(newDate);		}else{			newDate.set('hour', Number(this._entered_hour_));			newDate.set('minute',Number(this._entered_minute_));			newDate.set('second', Number(this._entered_second_));		}		this.setValuesFromDateToInput(newDate)	}	selectTimeFromPickerInstructions = (e) => {		if(e.name == 'hour'){			this.setHours(this.doNiceValue(String(e.value)))		}		if(e.name == 'minute'){			this.setMinutes(this.doNiceValue(String(e.value)))		}	}	clearEnteredValues = (data) => {//crutch for update date in input from props		this._entered_hour_ = null;		this._entered_minute_ = null;		this._entered_day_ = null;		this._entered_year_ = null;		this._entered_month_ = null;	}	// onKeyPress = (e) => {	// 	e = e || window.event;	// 	if(this.selectedElement && this.isEmptyDate) {	// 		let value = Number(this.selectedElement.value);	// 		const name = this.selectedElement.name;	// 		if(e.keyCode == '38') { // up arrow	// 			value += 1;	// 		}	// 		if(e.keyCode == '40') { // down arrow	// 			value -= 1;	// 		}	// 		this['set' + name](value)	// 	}	// }	// addListenners() {	// 	document.addEventListener('keydown', this.onKeyPress)	// }	// removeListenner() {	// 	document.removeEventListener('keydown', this.onKeyPress)	// }}export const arrayClasses = [	{ el: UpdateInstructions, name: 'UpdateInstructions' },	{ el: Day,                name: 'Day'                },	{ el: Month,              name: 'Month'              },	{ el: Year,               name: 'Year'               },	{ el: Hour,               name: 'Hour'               },	{ el: Minute,             name: 'Minute'             },	{ el: Second,             name: 'Second'             },]export const SplitClasses = (arrayClasses, BaseClass) => {	let temp; //temp = ViewClass + One;	let resultClass = class resultClass extends BaseClass {};	for(let index in arrayClasses) {		if(!temp) {			temp = arrayClasses[index].el(resultClass, index.name);		} else {			temp = arrayClasses[index].el(temp, index.name);		}	}	return temp}