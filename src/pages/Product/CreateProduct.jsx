import React, { useState } from 'react';
import axios from 'axios';
import {product_url} from '../../../API/api';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: 'Mug',
    origin: '',
    variants: [{ color: 'Yellow', specification: '', size: 'small' }]
  });
  const res = {
    name: '',
    brand: '',
    type: '',
    origin: '',
    variants: [{ color: '', specification: '', size: '' }]
  };
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
      const res = await axios.post(url, formData);
      setResponse(res.data);

      navigate('/product-success');
  } catch (err) {
      setError(err);
  }
  
  };

 

  console.log(formData)
  return (
    <div className='product'>
      <div className='header'>
        <h4 className=''>Product</h4>
      </div>
      <div className='details'>
        <h5>Create Product</h5>
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
                name='brand'
                placeholder='Brand'
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            <div className='col-6 mb-3'>
             
              <select className="form-control" name="type" id="" value={formData.type} onChange={handleChange}>
                <option value="Mug">Mug</option>
                <option value="Cup">Cup</option>
                <option value="Glass">Glass</option>
                
              </select>
            </div>
            <div className='col-6 mb-3'>
              <input
                className='form-control'
                type='text'
                name='origin'
                placeholder='Origin'
                value={formData.origin}
                onChange={handleChange}
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
                {/* <input
                  className="form-control"
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, e)}
                /> */}
                <select className="form-control" name="color" id="" defaultValue={variant.color} onChange={(e) => handleVariantChange(index, e)}>
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
                  value={variant.specification}
                  onChange={(e) => handleVariantChange(index, e)}
                />
              </div>
              <div className="col-2 mb-3">
                {/* <input
                  className="form-control"
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, e)}
                /> */}
                <select className="form-control" name="size" id="" onChange={(e) => handleVariantChange(index, e)}>
                  <option value="small">small</option>
                  <option value="large">large</option>
                  <option value="medium">medium</option>
                </select>
              </div>
              <div className="col-3 mb-3">
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={addVariant}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={() => removeVariant(index)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='submit-group'>
        <button className='btn btn-primary mr-2' onClick={()=>{
          setFormData(res)
        }}>Cancel</button>
        <button className='btn btn-primary mr-2' onClick={handleSubmit}>Submit</button>
      </div>
     
    </div>
  );
};
