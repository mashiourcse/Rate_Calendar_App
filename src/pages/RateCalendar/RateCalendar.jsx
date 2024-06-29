import React, { useEffect, useRef } from 'react'

export const RateCalendar = ({rooms}) => {
  
    const containerRef = useRef(null);
    const elementsRef = useRef([]);
  
    useEffect(() => {
      const container = containerRef.current;
      const elements = Array.from(container.querySelectorAll('.scrollable'));
      elementsRef.current = elements;
  
      const syncScroll = (scrolledEle, ele) => {
        const top = scrolledEle.scrollTop;
        const left = scrolledEle.scrollLeft;
        ele.scrollTo({
          behavior: 'instant',
          top,
          left,
        });
      };
      console.log(rooms)
      const handleScroll = (e) => {
        const scrolledEle = e.target;
        elements
          .filter((item) => item !== scrolledEle)
          .forEach((ele) => {
            ele.removeEventListener('scroll', handleScroll);
            syncScroll(scrolledEle, ele);
            window.requestAnimationFrame(() => {
              ele.addEventListener('scroll', handleScroll);
            });
          });
      };
  
      elements.forEach((ele) => {
        ele.addEventListener('scroll', handleScroll);
      });
  
   
      return () => {
        elements.forEach((ele) => {
          ele.removeEventListener('scroll', handleScroll);
        });
      };
    }, );

    console.log("Inside the Rate Calendar")

 

  const getDayName = (dateStr) =>{
    const dayNames = [
        "Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"
      ];
      
    const date = new Date(dateStr);
    const index = date.getDay();
    return dayNames[index];
  }
  const getDay = (dateStr) => {
const date = new Date(dateStr);
return date.getDate();
  }
  const getMonth = (dateStr) =>{
    const date = new Date(dateStr);
    const index = date.getMonth();
    const names = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    return names[index];
  }
  const getYear = (dateStr) =>{
    const date = new Date(dateStr);
    return date.getFullYear();
  }

  console.log(rooms)
    return (
        <>
        
        <div className='product' ref={containerRef}>
            {
                rooms.map((room,i)=>{
                    return <div className='scrollable'>
                    
                          {
                           i==0 &&  <table className='table table-responsive scrollable '>
                            {
                        <tr>
                       <th className='border-1 fixed-column'  style={{color: 'white'}}>
                        <div className='title_header'>
                        <span style={{color: "white"}}>Min. advance reservation</span>
                        </div>
                        
                        </th>
                     <React.Fragment className="vertical-list">
                     {
  room?.rate_plans[0]?.calendar.map((item, index) => {
    const currentItem = item;
    const prevItem = index > 0 ? room?.rate_plans[0]?.calendar[index - 1] : undefined;

    const currentMonth = getMonth(currentItem.date);
    const currentYear = getYear(currentItem.date);
    const prevMonth = prevItem ? getMonth(prevItem.date) : null;
    const prevYear = prevItem ? getYear(prevItem.date) : null;

    return (
      <>
      
      
      <td
        className='border-1'
        key={index}
        
      >
        <div style={{ width: "85px" }}>
          {(currentMonth !== prevMonth || currentYear !== prevYear) && (
            <span>{`${currentMonth} ${currentYear}`}</span>
          )}
       
          </div>
      </td>
      
      </>
    );
  })
}
                     </React.Fragment>
                       
                   </tr>
                   }
                           {
                            
                        <tr>
                       <th className='border-1 fixed-column'  style={{color: 'white'}}><div className='title_header'>
                        <span style={{color: "white"}}>Min. advance reservation</span>
                        </div></th>
                     <React.Fragment className="vertical-list">
                     {
  room?.rate_plans[0]?.calendar.map((item, index) => {
    const currentItem = item;
    const prevItem = index > 0 ? room?.rate_plans[0]?.calendar[index - 1] : undefined;

    const currentMonth = getMonth(currentItem.date);
    const currentYear = getYear(currentItem.date);
    const prevMonth = prevItem ? getMonth(prevItem.date) : null;
    const prevYear = prevItem ? getYear(prevItem.date) : null;

    return (
      <>
      
      
      <td
        className='border-1'
        key={index}
        
      >
        <div style={{ width: "85px" }}>
          
          {getDayName(item.date)}<br />
          <span>{getDay(item.date)}</span><br />
          </div>
      </td>
      
      </>
    );
  })
}
                     </React.Fragment>
                       
                   </tr>
                   }
                   
                           </table>
                        }
                           <h2 className='float-left'>{room.name}</h2>
                   <table className='table table-responsive scrollable hidescroll'>
                   
                       
                       {/* <tr>
                           <th className='border-1'>{room.name}</th>
                       </tr> */}
                   
                       <tr>
                           <th className='border-1 fixed-column'>
                           <div className='title_header'>
                        <span>Room Status</span>
                        </div>
                           </th>
                           {
                               room?.inventory_calendar?.map((item, index)=>{
                                   if(item?.status)
                                       return <td className='border-1 '>
                                        <div style={{width: "85px"}}>
                                        {"Open"} 
                                        </div>
                                        </td>;
                                   else
                                       return <td className='border-1 '>
                                        <div style={{width: "85px"}}>
                                        {"Close"}
                                        </div>
                                        </td>;
                               })
                               }
                       </tr>
                       <tr>
                           <th className='border-1 fixed-column'>Room to sell</th>
                           {
                               room?.inventory_calendar?.map((item, index)=>{
                                   return <td className='border-1'>{item.available}</td>
                               })
                               }
                       </tr>
                       <tr>
                           <th className='border-1 fixed-column'>Net booked</th>
                           {
                               room?.inventory_calendar?.map((item, index)=>{
                                   return <td className='border-1'>{item.booked}</td>
                               })
                               }
                       </tr>
                       <tr>
                           <th className='border-1 fixed-column'>

                            <span>Standard Rate</span>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> x {room?.occupancy}</p>
                               
                   
                           </th>
                           {
                               room?.rate_plans[0]?.calendar.map((item, index)=>{
                                   return <td className='border-1'>{item.rate}</td>
                               })
                               }
                       </tr>
                       <tr>
                           <th className='border-1 fixed-column' >Min. length of stay</th>
                           {
                               room?.rate_plans[0]?.calendar.map((item, index)=>{
                                   return <td className='border-1'>{item.min_length_of_stay}</td>
                               })
                               }
                       </tr>
                       <tr>
                           <th className='border-1 fixed-column' >Min. advance reservation</th>
                           {
                               room?.rate_plans[0]?.calendar.map((item, index)=>{
                                   return <td className='border-1'>{item.reservation_deadline}</td>
                               })
                               }
                       </tr>
                   </table>
                    </div>
                })
            }
             
           
               </div>
      
    
    </>
  )
}
