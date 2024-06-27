import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {list_url} from '../../../API/api';
export const CreateOrder = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [firstPage, setFirstPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchData = async () => {
    try {
      const url = list_url;
      const response = await fetch(`${url}products?search=Ru&per_page=5&page=${currentPage}`);
      const data = await response.json();
      setProducts(data.data.data);
      setCurrentPage(data.data.current_page);
      setLastPage(data.data.last_page);
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };

  useEffect(() => {
    fetchData();
    if (currentPage > firstPage + 3) {
      setFirstPage(currentPage);
    } else if (currentPage < firstPage) {
      setFirstPage(firstPage - 4);
    }
  }, [currentPage]);

  const handleProductSelection = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.some((p) => p.id === product.id)) {
        return prevSelected.filter((p) => p.id !== product.id);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  
console.log(selectedProducts)
  return (
    <div className='product'>
      <div className='header'>
        <h4 className=''>Order</h4>
      </div>
      <div className='table'>
        <div className='top-section'>
          <Link to='/create-product' className='btn btn-primary left-side'>Create</Link>
          <input className='right-side mb-2' type="text" placeholder='search' />
        </div>
        <div className='main'>
          <table id="example" className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 && products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.type}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.some((p) => p.id === product.id)}
                      onChange={() => handleProductSelection(product)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
          <div className='submit-group'>
            <Link  className='btn btn-primary mr-2' onClick={()=> { setSelectedProducts([])}}>Cancel</Link>
            <Link to='/create-order-variant' state={selectedProducts} className='btn btn-primary mr-2' >Next</Link>
          </div>
        </div>
      </div>
      <div className='pagination'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => {
                if (currentPage !== 1) setCurrentPage(currentPage - 1);
              }}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {[...Array(4)].map((_, index) => {
              const page = firstPage + index;
              return (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(page)}>{page}</a>
                </li>
              );
            })}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => {
                if (currentPage !== lastPage) setCurrentPage(currentPage + 1);
              }}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CreateOrder;
