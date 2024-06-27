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
    }, []);

    console.log("Inside the Rate Calendar")

 

  const getDayName = (dateStr) =>{
    const dayNames = [
        "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"
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
                    return <div>
                    {
                           i==0 &&  <table className='table table-responsive scrollable'>
                           {
                        <tr>
                       <th className='border-1 fixed-column'  style={{color: 'white'}}>Min. advance reservation</th>
                     <React.Fragment className="vertical-list">
                     {
                          room?.rate_plans[0]?.calendar.map((item, index)=>{
                               return <td 
                               //style={{color: "white"}}
                               className='border-1'
                               style={{color: i>0? 'white' : 'black'}}
                               >
                                   {getDayName(item.date)}<br></br>
                                   Open
                                   {/* {item.date} */}
                                   {/* <p>{getMonth(item.date)} {" "} {getYear(item.date)}</p> */}
                                   {/* <span>{getDayName(item.date)} </span> */}
                                   {/* <span>{getDay(item.date)}</span> */}
                               </td>
                           })
                           }
                     </React.Fragment>
                       
                   </tr>
                   }
                   
                           </table>
                        }
                          
                           <h2 className='float-left'>{room.name}</h2>
                   <table className='table table-responsive scrollable'>
                   
                       
                       {/* <tr>
                           <th className='border-1'>{room.name}</th>
                       </tr> */}
                   
                       <tr>
                           <th className='border-1 fixed-column'>Room status</th>
                           {
                               room?.inventory_calendar?.map((item, index)=>{
                                   if(item?.status)
                                       return <td className='border-1'>{"Open"}</td>;
                                   else
                                       return <td className='border-1'>{"Close"}</td>;
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
                           <th className='border-1 fixed-column'>Standard Rate
                               icon x {room?.occupancy}
                   
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
