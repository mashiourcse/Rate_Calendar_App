import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RateCalendar } from './RateCalendar';
import { DateRangePicker } from './DateRangePicker';
import { format } from 'date-fns';


export const ParentComponent = () => {
  const [ rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async()=>{
    try{
        const start = format(startDate, 'yyyy-MM-dd');
        const end = format(endDate, 'yyyy-MM-dd');
        console.log(start);
        console.log(end);
        const response = await axios.get(`https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${start}&end_date=${end}`);
        const data = response.data.data;
        setRooms(data);
    }
    catch(error){
        console.error('Error fetching the orders:', error);
    }
    
  
}
useEffect( ()=>{
    fetchData();

},[startDate,endDate])
    console.log(rooms)
    return (
        <>
        <DateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
       <RateCalendar  rooms={rooms} />
    </>
  )
}

