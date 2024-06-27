import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {product_url} from '../../../API/api';
export const ViewProduct = () => {

  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: '',
    origin: '',
    variants: [{ color: '', specification: '', size: '' }]
  });
  const res = {
    name: '',
    brand: '',
    type: '',
    origin: '',
    variants: [{ color: '', specification: '', size: '' }]
  };

  useEffect( ()=>{

    setFormData(location.state)
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = formData.variants.map((variant, i) => (
      i === index ? { ...variant, [name]: value } : variant
    ));
    setFormData({
      ...formData,
      variants: newVariants
    });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { color: '', specification: '', size: '' }]
    });
  };

  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      variants: newVariants
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = product_url;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(formData)
  return (
    <div className='product'>
      <div className='header'>
        <h4 className=''>Product</h4>
      </div>
      <div className='details'>
        <h5>Edit Product</h5>
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
                disabled
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='brand'
                placeholder='Brand'
                value={formData.brand}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='type'
                placeholder='Type'
                value={formData.type}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='origin'
                placeholder='Origin'
                value={formData.origin}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className='details'>
        <h5>Variants</h5>
        <div className='form row'>
          {formData.variants.map((variant, index) => (
            <div className="row col-12" key={index}>
              <div className="col-2 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, e)}
                  disabled
                />
              </div>
              <div className="col-5 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="specification"
                  placeholder="Specification"
                  value={variant.specification}
                  onChange={(e) => handleVariantChange(index, e)}
                  disabled
                />
              </div>
              <div className="col-2 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, e)}
                  disabled
                />
              </div>
              <div className="col-3 mb-3">
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={addVariant}
                  hidden
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={() => removeVariant(index)}
                  hidden
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      
    </div>
  );
};
