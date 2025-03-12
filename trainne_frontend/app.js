// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  
  // Fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Add a new item
  const handleAddItem = () => {
    const item = { id: items.length + 1, name: newItem };
    axios.post('http://localhost:5000/api/items', item)
      .then(response => {
        setItems([...items, response.data]);
        setNewItem('');
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  };

  // Delete an item
  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the item!', error);
      });
  };

  return (
    <div className="App">
      <h1>Items List</h1>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

