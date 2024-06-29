import { format } from 'date-fns';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePicker = ({startDate, setStartDate, endDate, setEndDate}) => {
  return (
    <div className='product '>
      <h3>Rate Calendar</h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', border: '1px solid #A8A8A8', borderRadius: '5px', width: "600px" }}>
        <DatePicker

          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
          className="datepicker btn btn-alert"
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
          className="datepicker btn btn-alert"
        />
      </div>
    </div>
  );
};

