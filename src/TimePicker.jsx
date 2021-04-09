import React            from 'react'
import  'choose_time.scss'



class TimePicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedHour:   this.props.selectedHour,
            selectedMinute: this.props.selectedMinute,
            active:         this.props.active,
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {
            selectedHour:   props.selectedHour,
            selectedMinute: props.selectedMinute,
        }
    }
    componentDidMount() {

    }
    selectHour = (hourValue) =>{

    }
    selectMinutes = (minutesValue) => {

    }
    render(){
        const {active, selectedMinute, selectedHour} = this.state;
        console.log("%c TIMEPICKER render TimeLists", coCSS, TimeLists)
        return  active ?
            <div className = 'choose_time' >
                <HoursListView  list =          { TimeLists.hoursList }
                                onSelectHour =      { this.selectHour }
                                selectedValue = { selectedHour } />
                <MinutesListView    list =          {TimeLists.minutesList}
                                    onSelectMinute = {this.selectMinutes}
                                    selectedValue = {selectedMinute} />
            </div> :
            null
    }
}
// function TimePicker(props) {
//     const {active, selectedMinute, selectedHour, idParrentContainer} = props;
//     return  active ?
//             <div className = 'choose_time' style = {{maxHeight: rect.height()}}>
//                 <HoursListView  list =          { TimeLists.hoursList }
//                                 onSelect =      { this.selectHour }
//                                 selectedValue = { selectedHour } />
//                 <MinutesListView    list =          {TimeLists.minutesList}
//                                     onSelect =      {this.selectMinutes}
//                                     selectedValue = {selectedMinute} />
//             </div> :
//             null
// }

TimePicker.prototype.TPStyles = TPStyles;
export default TimePicker;



class  GenerateTimeLists{
    hoursList = []
    minutesList = []
    secondsList = []
    millisecondsList = []
    allLists = {
            hoursList: this.hoursList,
            minutesList: this.minutesList,
            secondsList: this.secondsList,
            millisecondsList: this.generateMilliseconds,
    }
    constructor(){
        this.generateHours()
        this.generateMinuts()
        this.generateSeconds()
    }
    toDD = (value) => value < 10 ? '0' + value : String(value); //convert number to 01,02 .. etc
    generateHours() {
        for(let digit = 0; digit <= 23; digit++) {
            this.hoursList.push(digit)
        }
    }
    generateMinuts() {
        for(let digit = 0; digit <= 59; digit++) {
            this.minutesList.push(digit)
        }
    }
    generateSeconds() {
        for(let digit = 0; digit <= 59; digit++) {
            this.minutesList.push(digit)
        }
    }
    generateMilliseconds(){
        for(let digit = 0; digit <= 999; digit++) {
            this.millisecondsList.push(digit)
        }
    }
}
const TimeLists = new GenerateTimeLists();



class RectInfo{
    defHeight = '400px'
    constructor(containerId){
        this.containerId = containerId;
        window.rectInfo = this
    }
    get DOM(){
        return document.getElementById(this.containerId);
    }
    get RECT(){
        return this.DOM.getBoundingClientRect()
    }
    get styleHeight(){
        return this.RECT.height+'px'
    }
    get height() {
        return  this.RECT ? this.styleHeight : this.defHeight
    }
}

const TPStyles = {
    // Rect:  new RectInfo(idParrentContainer),
    // wrapper: function(active) {
    //     return active ? active: inactive
    // },
    // inactive: {
    //     visibility: 'hidden',
    //     opacity: '0',
    //     maxHeight: '0px'
    // },
    // active: {
    //     maxHeight: this.timePickerHeight + 'px',
    //     visibility: 'visible',
    //     opacity: '1'
    // },

    forSelectedEl: function(selectedValue, elValue) {
        return selectedValue == elValue ? { backgroundColor: "#4179f8" } : { backgroundColor: "#4179f8" }
    }
}

function HoursListView(props) {
    return  <ul className = 'hours' >
                <li className = "choose_time_name">часы</li>
                <HHList {...props} />
            </ul>
}

function HHList(props) {
    const {list, onSelectHour, selectedValue} = props;
    return list.map(key =>  <li className =     'hh'
                                key =           {'hour-'+key}
                                data-value =    {key}
                                data-name =     'chooshour'
                                style =         { TPStyles.forSelectedEl(selectedValue, key)  }
                                onClick =       {()=>onSelect(key)}>
                                {TimeLists.toDD(key)}
                            </li> )
}

function MinutesListView(props) {
    return  <ul className = 'minutes'>
                <li className = "choose_time_name">минуты</li>
                <MMListView {...props} />
            </ul>
}

function MMListView(props) {
    const {list, onSelectMinute, selectedValue} = props;
    return list.map(key =>  <li className =     'mm'
                                key =           {'minute-'+key}
                                data-value =    {key}
                                data-name =     'minute'
                                style =         { TPStyles.forSelectedEl(selectedValue, key)  }
                                onClick =       { ()=>onSelect(key) }>
                                {TimeLists.toDD(key)}
                            </li> )
}






// const Day = (Base) => class Day extends Base {
// }

