import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,setsearch]=useState('')
  const changehandle =(e) => {
    setsearch(e.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filtered = data.filter(item => (
    item.title.toLowerCase().includes(search.toLowerCase())||
    item.category.includes(search.toLowerCase())

  ))

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <input type='search' name='searchbar' placeholder='Search' value={search} onChange={changehandle} />
      <h1>Product Transactions</h1>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>Price</th>
            <th>Discription</th>
            <th>Category</th>
            <th>sold</th>
            <th>Image</th>

          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.sold ? 'sold':'Not sold'}</td>
              <td><img src={item.image} alt="product" style={{ width: '50px', height: '50px' }}></img></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
