import React from 'react';


const IconWarning = ({fill, title, onClick, id}) =>
{
    return (
        <svg id={id} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick} title={title ? title : title}>
        <path fillRule="evenodd" clipRule="evenodd" d="M0.5 16H17.5L9 1L0.5 16ZM10 14H8V12H10V14ZM10 11H8V7H10V11Z" fill={fill}/>
      </svg>
    )
}

export default IconWarning;