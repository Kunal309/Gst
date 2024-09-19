import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import defaultLogo from './img.png';

const Invoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([
    { description: '', qty: 0, rate: 0, sgst: 0, cgst: 0, cess: 0, amount: 0 }
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    gstin: '',
    address: '',
    city: '',
    state: '',
    country: '',
    logo: defaultLogo // Add logo to companyDetails state
  });

  const fileInputRef = useRef(null); // Reference to file input element

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const rate = parseFloat(updatedItems[index].rate) || 0;
    const qty = parseInt(updatedItems[index].qty) || 0;
    const sgst = parseFloat(updatedItems[index].sgst) || 0;
    const cgst = parseFloat(updatedItems[index].cgst) || 0;
    const cess = parseFloat(updatedItems[index].cess) || 0;

    const itemAmount = rate * qty + sgst + cgst + cess;
    updatedItems[index].amount = itemAmount;

    setItems(updatedItems);
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
    const sgst = subtotal * 0.06;
    const cgst = subtotal * 0.06;
    const total = subtotal + sgst + cgst;

    setSubtotal(subtotal);
    setSgstAmount(sgst);
    setCgstAmount(cgst);
    setTotalAmount(total);
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: '', qty: 0, rate: 0, sgst: 0, cgst: 0, cess: 0, amount: 0 }
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleCompanyDetailsChange = (field, value) => {
    setCompanyDetails({ ...companyDetails, [field]: value });
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width === 240 && img.height === 240) {
        setCompanyDetails({
          ...companyDetails,
          logo: objectURL, // Use the uploaded image URL
        });
      } else {
        alert('Please upload an image with dimensions 240x240 pixels.');
      }
    };

    img.src = objectURL;
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <div className="header-section">
           <div className="title-section">
            <h2>Tax Invoice</h2>
          </div> 
          <div className="company-info">
            <div>
              <img
                src={companyDetails.logo}
                alt="Company Logo"
                className="logo"
                onClick={triggerFileInput} // Click image to trigger file input
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }} // Hide the file input
                ref={fileInputRef}
                onChange={handleLogoUpload}
              />

            </div>
            {/* <div className="title-section">
              <h2>Tax Invoice</h2>
            </div> */}
            <div className="CompanyInfo">
              <div>
                <input
                  type="text"
                  value={companyDetails.name}
                  placeholder="Your Company"
                  onChange={(e) => handleCompanyDetailsChange('name', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={companyDetails.gstin}
                  placeholder="Company's GSTIN"
                  onChange={(e) => handleCompanyDetailsChange('gstin', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={companyDetails.address}
                  placeholder="Company's Address"
                  onChange={(e) => handleCompanyDetailsChange('address', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={companyDetails.city}
                  placeholder="City"
                  onChange={(e) => handleCompanyDetailsChange('city', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={companyDetails.state}
                  placeholder="State"
                  onChange={(e) => handleCompanyDetailsChange('state', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={companyDetails.country}
                  placeholder="Country"
                  onChange={(e) => handleCompanyDetailsChange('country', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="customer-info">
          <div className="customer-address">
            <h3>Customer Address:</h3>
            <input
              type="text"
              placeholder="Your Client's Company"
            />
            <input
              type="text"
              placeholder="Client's GSTIN"
            />
            <input
              type="text"
              placeholder="Client's Address"
            />
            <input
              type="text"
              placeholder="City"
            />
            <input
              type="text"
              placeholder="State"
            />
            <input
              type="text"
              placeholder="Country"
            />
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
                <th className="description-col">Item Description</th>
                <th className="qty-col">Qty</th>
                <th className="rate-col">Rate</th>
                <th className="sgst-col">SGST</th>
                <th className="cgst-col">CGST</th>
                <th className="cess-col">Cess</th>
                <th className="amount-col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr className="item-row" key={index}>
                  <td className="description-col">
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, 'description', e.target.value)
                      }
                    />
                  </td>
                  <td className="qty-col">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(index, 'qty', e.target.value)
                      }
                    />
                  </td>
                  <td className="rate-col">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(index, 'rate', e.target.value)
                      }
                    />
                  </td>
                  <td className="sgst-col">
                    <input
                      type="number"
                      value={item.sgst}
                      onChange={(e) =>
                        handleItemChange(index, 'sgst', e.target.value)
                      }
                    />
                  </td>
                  <td className="cgst-col">
                    <input
                      type="number"
                      value={item.cgst}
                      onChange={(e) =>
                        handleItemChange(index, 'cgst', e.target.value)
                      }
                    />
                  </td>
                  <td className="cess-col">
                    <input
                      type="number"
                      value={item.cess}
                      onChange={(e) =>
                        handleItemChange(index, 'cess', e.target.value)
                      }
                    />
                  </td>
                  <td className="amount-col">
                    {item.amount.toFixed(2)}
                    <span
                      className="remove-icon-container"
                      onClick={() => removeItem(index)}
                    >
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.88 122.88"
                        className="remove-icon"
                      >
                        <defs>
                          <style>
                            {`.cls-1 { fill: #ff4141; fill-rule: evenodd; }`}
                          </style>
                        </defs>
                        <title>cross</title>
                        <path
                          className="cls-1"
                          d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"
                        />
                      </svg>

                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="add-item-button" onClick={addItem}>
          Add Item
        </button>

        <div className="total-section">
          <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
          <h3>SGST (6%): ₹{sgstAmount.toFixed(2)}</h3>
          <h3>CGST (6%): ₹{cgstAmount.toFixed(2)}</h3>
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
    </div>
  );
};

export default Invoice;
