import React, { useState } from 'react';
import './App.css';

const Invoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([
    { description: '', qty: 0, rate: 0, sgst: 0, cgst: 0, cess: 0, amount: 0 }
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to handle input changes in the item table
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Recalculate amount for the item and update total
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const qty = parseInt(updatedItems[index].qty) || 0;
    const sgst = parseFloat(updatedItems[index].sgst) || 0;
    const cgst = parseFloat(updatedItems[index].cgst) || 0;
    const cess = parseFloat(updatedItems[index].cess) || 0;

    const itemAmount = rate * qty + sgst + cgst + cess;
    updatedItems[index].amount = itemAmount;

    setItems(updatedItems);
    calculateTotal();
  };

  // Function to calculate the total amount
  const calculateTotal = () => {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmount(total);
  };

  // Function to add a new row in the item table
  const addItem = () => {
    setItems([...items, { description: '', qty: 0, rate: 0, sgst: 0, cgst: 0, cess: 0, amount: 0 }]);
  };

  return (
    <div className="invoice-container">
      <div className="header-section">
        <div className="company-info">
          <div>
            <img src="/company-logo.png" alt="Company Logo" className="logo" />
          </div>
          <div className="title-section">
            <h2>Tax Invoice</h2>
          </div>
        </div>
        <div className="company-details">
          <h2>Company Name</h2>
          <p>Company Address Line 1</p>
          <p>Company Address Line 2</p>
        </div>
      </div>

      <div className="customer-info">
        <div className="customer-address">
          <h3>Customer Address:</h3>
          <p>123 Customer Street</p>
          <p>City, State, ZIP</p>
        </div>
        <div className="invoice-details">
          <label>Invoice Number: </label>
          <input 
            type="text" 
            value={invoiceNumber} 
            onChange={(e) => setInvoiceNumber(e.target.value)} 
          />
          <label>Invoice Date: </label>
          <input 
            type="date" 
            value={invoiceDate} 
            onChange={(e) => setInvoiceDate(e.target.value)} 
          />
          <label>Due Date: </label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
          />
        </div>
      </div>

      <div className="item-table-wrapper">
        <table className="item-table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>SGST</th>
              <th>CGST</th>
              <th>Cess</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <textarea 
                    value={item.description} 
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.qty} 
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.rate} 
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.sgst} 
                    onChange={(e) => handleItemChange(index, 'sgst', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.cgst} 
                    onChange={(e) => handleItemChange(index, 'cgst', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.cess} 
                    onChange={(e) => handleItemChange(index, 'cess', e.target.value)}
                  />
                </td>
                <td>{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-item-button" onClick={addItem}>Add Item</button>

      <div className="total-section">
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>

      <div className="notes-section">
        <h4>Notes:</h4>
        <textarea placeholder="Add any notes for the customer..." />
      </div>

      <div className="terms-section">
        <h4>Terms and Conditions:</h4>
        <textarea placeholder="Add terms and conditions..." />
      </div>
    </div>
  );
};

export default Invoice;
