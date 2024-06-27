import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { order_url } from '../../../API/api';

export const CreateOrderFinal = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    total_quantity: 0,
    details: []
  });

  const details_quantity = (products) => {
    let details = [];
    let total_quantity = 0;

    products.forEach(product => {
      product.variants.forEach(variant => {
        let variant_id = variant.id;
        let quantity = variant.quantity;
        details.push({ variant_id, quantity });
        total_quantity += quantity;
      });
    });

    setFormData(prevFormData => ({
      ...prevFormData,
      details: details,
      total_quantity: total_quantity
    }));
  };

  useEffect(() => {
    const initialSelectedProducts = location.state || [];
    const filteredProducts = initialSelectedProducts.map(product => ({
      ...product,
      variants: product.variants.filter(variant => variant.checked)
    }));

    setSelectedProducts(filteredProducts);
    details_quantity(filteredProducts);
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError) {
      return;
    }

    const url = order_url;

    try {
      const res = await axios.post(url, formData);
      setResponse(res.data);
      navigate('/order-success');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className='product'>
      <div className='header'>
        <h4>Information</h4>
      </div>
      <div className='details'>
        <div className='form'>
          <div className='row'>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <small className="text-danger">{emailError}</small>}
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='total_quantity'
                placeholder='Total Quantity'
                value={formData.total_quantity}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className='submit-group'>
        <Link to="/create-order" className='btn btn-primary mr-2'>Back</Link>
        <button className='btn btn-primary mr-2' onClick={handleSubmit} disabled={!!emailError}>Submit</button>
      </div>
    </div>
  );
};
