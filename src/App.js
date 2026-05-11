import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: '노트북', quantity: 10 },
    { id: 2, name: '마우스', quantity: 50 }
  ]);
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState(0);

  const addItem = () => {
    if (newName === '') return;
    setItems([...items, { id: Date.now(), name: newName, quantity: parseInt(newQty) }]);
    setNewName('');
    setNewQty(0);
  };

  const deleteItem = (id) => setItems(items.filter(item => item.id !== id));

  const updateQty = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📦 재고 관리 시스템</h1>
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="상품명" />
        <input type="number" value={newQty} onChange={(e) => setNewQty(e.target.value)} style={{ width: '60px', marginLeft: '5px' }} />
        <button onClick={addItem} style={{ marginLeft: '10px' }}>상품 추가</button>
      </div>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>상품명</th>
            <th>수량</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
                <button onClick={() => updateQty(item.id, -1)} style={{ marginLeft: '5px' }}>-</button>
                <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '15px', color: 'red' }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;