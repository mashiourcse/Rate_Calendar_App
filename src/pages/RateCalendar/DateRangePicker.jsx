import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePicker = ({startDate,setStartDate,endDate,setEndDate}) => {
  
  return (
    <div className='product'>
      <h3>Rate Calendar</h3>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
        />
        {' - '}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="MM/dd/yyyy"
          placeholderText="End Date"
        />
      </div>
      {/* {startDate && endDate && (
        <div>
          <p>Selected Date Range: {format(startDate, 'yyyy-MM-dd')} - {format(endDate, 'yyyy-MM-dd')}</p>
        </div>
      )} */}
    </div>
  );
};

