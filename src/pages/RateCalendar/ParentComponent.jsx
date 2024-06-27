import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RateCalendar } from './RateCalendar';

export const ParentComponent = () => {
  const [ rooms, setRooms] = useState([]);


  const fetchData = async()=>{
    try{
        const response = await axios.get('https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=2024-05-01&end_date=2024-06-15');
        const data = response.data.data;
        setRooms(data);
    }
    catch(error){
        console.error('Error fetching the orders:', error);
    }
    
  
}
useEffect( ()=>{
    fetchData();

},[])
    console.log(rooms)
    return (
        <>
        {
            rooms?.length > 0 && rooms?.map( (room, i)=>{
                return <RateCalendar key={i} i={i} room={room} />

            })
            
        }
    </>
  )
}

