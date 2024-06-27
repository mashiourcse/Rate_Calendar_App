import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const CreateOrderVariant = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    const initialSelectedProducts = location.state || [];
    setSelectedProducts(initialSelectedProducts.map(product => ({
      ...product,
      variants: product.variants.map(variant => ({ ...variant, checked: false, quantity: 0 }))
    })));
  }, [location.state]);

  const handleVariantSelection = (productIndex, id) => {
    setSelectedProducts(prevSelected => {
      const updatedProducts = prevSelected.map((product, pIndex) => {
        if (pIndex === productIndex) {
          const updatedVariants = product.variants.map(variant => {
            if (variant.id === id) {
              return { ...variant, checked: !variant.checked };
            }
            return variant;
          });
          return { ...product, variants: updatedVariants };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const handleQuantityChange = (productIndex, id, quantity) => {
    setSelectedProducts(prevSelected => {
      const updatedProducts = prevSelected.map((product, pIndex) => {
        if (pIndex === productIndex) {
          const updatedVariants = product.variants.map(variant => {
            if (variant.id === id) {
              return { ...variant, quantity: Number(quantity) };
            }
            return variant;
          });
          return { ...product, variants: updatedVariants };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  return (
    <div className='product'>
      <div className='header'>
        <h4 className=''>Order</h4>
      </div>
      <div className='table'>
        <div className='top-section'>
          <select
            className='btn btn-primary'
            onChange={(e) => setProductIndex(Number(e.target.value))}
            name="product"
            value={productIndex}
          >
            {selectedProducts.map((product, index) => (
              <option key={index} value={index}>{product.name}</option>
            ))}
          </select>
          <input className='right-side mb-2' type="text" placeholder='search' />
        </div>
        <div className='main'>
          <table id="example" className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Color</th>
                <th>Specification</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts[productIndex]?.variants?.map((variant, index) => (
                <tr key={index}>
                  <td>{variant.id}</td>
                  <td>{variant.color}</td>
                  <td>{variant.specification}</td>
                  <td>{variant.size}</td>
                  <td>
                    <input
                      type='number'
                      className='form-control'
                      style={{ width: "60px" }}
                      value={variant.quantity}
                      onChange={(e) => handleQuantityChange(productIndex, variant.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={variant.checked}
                      onChange={() => handleVariantSelection(productIndex, variant.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
          <div className='submit-group'>
            <Link to="/" className='btn btn-primary mr-2' onClick={() => setSelectedProducts([])}>Cancel</Link>
            <Link to='/create-order-final' state={selectedProducts} className='btn btn-primary mr-2'>Next</Link>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default CreateOrderVariant;
