import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {list_url} from '../../../API/api';

export const OrderList = () => {
    const [orders, setorders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [firstpage, setFirstpage] = useState(1);
    function formatDateString(isoString) {
        const date = new Date(isoString);
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }
        const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    
        return formattedDate;
    }
    const fetchData = async () => {
        try {
            const url = list_url;
            const response = await fetch(`${url}orders?&page=${currentPage}`);
            
            const data = await response.json();
            
            setorders(data.data.data);
            setCurrentPage(data.data.current_page);
            setLastPage(data.data.last_page);
          //  setFirstpage(data.data.current_page);

        } catch (error) {
            console.error('Error fetching the orders:', error);
        }
    };

    const deleteOrder = (id) => {
        const url = list_url;
        fetch(`${url}orders/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              setorders(orders.filter(order => order.id !== id));
            } else {
              console.error('Failed to delete order:', response);
            }
          })
          .catch(error => console.error('Error deleting order:', error));
      };

useEffect( ()=>{
    //const url = 'https://reactjr.coderslab.online/api/orders?search=Ru&per_page=10&page=1'                                                                                           
    fetchData();
    if(currentPage>firstpage+3){
        setFirstpage(currentPage)
    }
    else if(currentPage<firstpage){
        setFirstpage(firstpage-4);
    }
},[currentPage])
    console.log(orders)
    return (
    <div className='product'>
       <div className='header'>
       <h4 className=''>Order</h4>

       </div>
        
       <div className='table'>
            <div className='top-section'>

            <Link to='/create-order' className=' btn btn-primary left-side'>Create</Link>
          
            <input className='right-side' type="text" placeholder='search'/>
            </div>
            <div className='main'>
            <table id="example" className="table table-striped" 
            // style="width:100%"
            >
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>

                <th>Address</th>
                <th>Total Quantity</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011-04-25</td>
                <td>$320,800</td>
            </tr> */}
        {
            orders.length > 0 && orders.map( (order, index)=>{

                return  <tr key={index}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.total_quantity}</td>
                <td>{formatDateString(order.created_at)}</td>
                <td>
                    <Link className='btn btn-primary mr-2' to={`/edit-order/${order.id}`} state={order}>Edit</Link> 
                    <Link className='btn btn-info mr-2' to={`/view-order/${order.id}`} state={order}>View</Link> 
                    <Link className='btn btn-danger' onClick={()=>{
                        deleteOrder(order.id)
                    }}>Delete</Link> 
                   
                    </td>
            </tr>
            })
        }
        </tbody>
        <tfoot>
            {/* <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr> */}
        </tfoot>
    </table>
            </div>
       </div>

       <div className='pagination'>
       <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous" onClick={()=>{
      if(currentPage!=1)
      setCurrentPage(currentPage-1);
    }}>
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
   
    <li 
   // className="page-item active"
    className={`page-item ${firstpage==currentPage ? 'active' : ''}`}
    ><a className="page-link" 
    onClick={()=>{
      setCurrentPage(firstpage)
    }} 
    href="#">{firstpage}</a></li>

    <li  className={`page-item ${firstpage+1==currentPage ? 'active' : ''}`  } ><a className="page-link" href="#"
     onClick={()=>{
        setCurrentPage(firstpage+1)
      }}
    >{firstpage+1}</a></li>

    <li  className={`page-item ${firstpage+2==currentPage ? 'active' : ''}`}><a className="page-link" href="#"
     onClick={()=>{
        setCurrentPage(firstpage+2)
    }}
    >{firstpage+2}</a></li>
    <li  className={`page-item ${firstpage+3==currentPage ? 'active' : ''}`}><a className="page-link" href="#"
     onClick={()=>{
     setCurrentPage(firstpage+3)
    }}
    >{firstpage+3}</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={()=>{
      if(currentPage!=lastpage)
      setCurrentPage(currentPage+1);
    }}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>

       </div>
    </div>
  )
}
