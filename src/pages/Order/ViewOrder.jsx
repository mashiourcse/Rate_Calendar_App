import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {order_url} from '../../../API/api';
export const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(location.state)
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevOrder => ({ ...prevOrder, [name]: value }));
  };

  const handleDetailChange = (detailId, fieldName, value) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      details: prevOrder.details.map(detail =>
        detail.id === detailId ? { ...detail, [fieldName]: value } : detail
      )
    }));
  };

  const handleVariantChange = (detailId, fieldName, value) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      details: prevOrder.details.map(detail =>
        detail.id === detailId ? { ...detail, variant: { ...detail.variant, [fieldName]: value } } : detail
      )
    }));
  };


  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product'>
      <div className='header'>
        <h4 className=''>Order</h4>
      </div>
      <div className='details'>
        <h5>Edit Order</h5>
        <div className='form'>
          <div className='row'>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='name'
                placeholder='Name'
                value={order.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='email'
                name='email'
                placeholder='Email'
                value={order.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='address'
                placeholder='Address'
                value={order.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='number'
                name='total_quantity'
                placeholder='Total Quantity'
                value={order.total_quantity}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='details'>
        <h5>Variants</h5>
        <div className='form row'>
          {order.details.map((detail, index) => (
            <div className="row col-12" key={index}>
              <div className="col-2 mb-3">
                <select className="form-control" name="color" id="" defaultValue={detail.variant.color} onChange={(e) => handleVariantChange(detail.id, 'color', e.target.value)}>
                  <option value="Yellow">Yellow</option>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                </select>
              </div>
              <div className="col-5 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="specification"
                  placeholder="Specification"
                  value={detail.variant.specification}
                  onChange={(e) => handleVariantChange(detail.id, 'specification', e.target.value)}
                />
              </div>
              <div className="col-2 mb-3">
                <select className="form-control" name="size" id="" defaultValue={detail.variant.size} onChange={(e) => handleVariantChange(detail.id, 'size', e.target.value)}>
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
              </div>
              <div className="col-3 mb-3">
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={detail.quantity}
                  onChange={(e) => handleDetailChange(detail.id, 'quantity', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className='submit-group'>
        <button className='btn btn-primary mr-2' onClick={() => navigate(-1)}>Cancel</button>
        <button className='btn btn-primary mr-2' onClick={handleSubmit}>Update</button>
      </div> */}
    </div>
  );
};


