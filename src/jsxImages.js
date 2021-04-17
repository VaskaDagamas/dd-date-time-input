import React            from 'react'

export function calendarIcon(status){
    const fill_color = status ? "#4179f8" : '#000000';
    return <svg className='calendar_triger'
                width="12px" height="14px" viewBox="0 0 12 14"
                version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
}
export function closeIcon(className, onClick) {
    return <svg     className =         {className}
                    xmlns =             "http://www.w3.org/2000/svg"
                    viewBox =           "0 0 16 16"
                    onClick =           {onClick ? onClick : null}>
                <title id="title">close</title>
                <polygon points="12.9,4.4 11.5,3 8,6.5 4.4,3 3,4.4 6.5,8 3,11.5 4.4,12.9 8,9.4 11.5,12.9 12.9,11.5 9.4,8 "/>
            </svg>
}