import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { Patient, InvoiceItem, Invoice } from '../types';

const CreateInvoice: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  
  // Form State
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Annual Check-up', quantity: 1, unitPrice: 75.00 },
    { id: '2', description: 'Dental X-Ray', quantity: 2, unitPrice: 50.00 }
  ]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    DataService.getPatients().then(setPatients);
    // Set default due date to 14 days from now
    const d = new Date();
    d.setDate(d.getDate() + 14);
    setDueDate(d.toISOString().split('T')[0]);
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = 0; // Keeping simple as per screenshots showing 0% tax sometimes, or we can calculate
  const total = subtotal - discount + tax;

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: 'New Service',
      quantity: 1,
      unitPrice: 0
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleSave = async () => {
    if (!selectedPatientId) return alert('Please select a patient');
    
    const newInvoice: Invoice = {
        id: Date.now().toString(),
        invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
        patientId: selectedPatientId,
        issueDate: invoiceDate,
        dueDate: dueDate,
        items,
        subtotal,
        tax,
        discount,
        total,
        status: 'Unpaid'
    };
    
    await DataService.createInvoice(newInvoice);
    navigate('/billing');
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-6">
        <div>
           <h1 className="text-3xl font-bold text-text-main">Create New Invoice</h1>
           <p className="text-text-sub mt-1">Fill in the details below to generate a new invoice.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => navigate('/billing')} className="px-4 h-10 rounded-lg bg-gray-200 text-text-main font-bold text-sm hover:bg-gray-300">Cancel</button>
           <button onClick={() => navigate('/billing')} className="px-4 h-10 rounded-lg bg-gray-200 text-text-main font-bold text-sm hover:bg-gray-300">Save as Draft</button>
           <button onClick={handleSave} className="px-4 h-10 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark">Generate & Print</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="flex flex-col gap-8">
            <section>
                <h3 className="text-lg font-bold text-text-main mb-4">Patient Information</h3>
                <div className="space-y-4">
                    <label className="block w-full">
                        <span className="text-sm font-medium text-text-main mb-1.5 block">Patient Lookup</span>
                        <select 
                            className="w-full h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                            value={selectedPatientId}
                            onChange={(e) => setSelectedPatientId(e.target.value)}
                        >
                            <option value="">Select a patient...</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.name} (ID: {p.id.toUpperCase()})</option>
                            ))}
                        </select>
                    </label>

                    {selectedPatient && (
                        <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-4">
                            <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <p className="font-bold text-text-main">{selectedPatient.name}</p>
                                <p className="text-sm text-text-sub">DOB: {selectedPatient.dob}</p>
                                <p className="text-sm text-text-sub">Contact: {selectedPatient.phone}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <label className="block w-full">
                            <span className="text-sm font-medium text-text-main mb-1.5 block">Invoice Date</span>
                            <input 
                                type="date" 
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                                className="w-full h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </label>
                        <label className="block w-full">
                            <span className="text-sm font-medium text-text-main mb-1.5 block">Payment Due</span>
                            <input 
                                type="date" 
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </label>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-text-main mb-4">Services & Items</h3>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-text-sub">Service / Item</th>
                                <th className="px-4 py-3 font-semibold text-text-sub w-20">Qty</th>
                                <th className="px-4 py-3 font-semibold text-text-sub w-28">Price</th>
                                <th className="px-4 py-3 font-semibold text-text-sub w-24">Total</th>
                                <th className="px-4 py-3 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2">
                                        <input 
                                            type="text" 
                                            value={item.description} 
                                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                                            className="w-full border-0 bg-transparent focus:ring-0 p-0 text-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value))}
                                            className="w-full border-0 bg-transparent focus:ring-0 p-0 text-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input 
                                            type="number" 
                                            value={item.unitPrice} 
                                            onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                                            className="w-full border-0 bg-transparent focus:ring-0 p-0 text-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-2 font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={handleAddItem} className="mt-4 flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="material-symbols-outlined text-xl">add_circle</span>
                    Add Service
                </button>
            </section>
        </div>

        {/* Right Column: Preview */}
        <div className="flex flex-col gap-8 sticky top-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
                    <div>
                        <h4 className="font-bold text-lg text-text-main">SmileBright Dental</h4>
                        <p className="text-sm text-text-sub">123 Dental Ave, Suite 100<br/>Metropolis, USA 12345</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">health_and_safety</span>
                    </div>
                </div>

                <div className="flex justify-between mb-6">
                    <div>
                        <p className="text-sm font-bold text-text-main">Billed To</p>
                        {selectedPatient ? (
                             <p className="text-sm text-text-sub">{selectedPatient.name}<br/>{selectedPatient.address}</p>
                        ) : (
                            <p className="text-sm text-gray-300 italic">Select a patient</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-text-main">Invoice #DRAFT</p>
                        <p className="text-sm text-text-sub">Date: {invoiceDate}</p>
                        <p className="text-sm text-text-sub">Due: {dueDate}</p>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-text-sub">{item.description} (x{item.quantity})</span>
                            <span className="font-medium text-text-main">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-sub">Subtotal</span>
                        <span className="text-text-main">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-text-sub">Discount</span>
                        <input 
                            type="number" 
                            className="w-20 text-right p-1 border border-gray-200 rounded text-sm"
                            value={discount}
                            onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 mt-2 border-t border-gray-100">
                        <span className="text-text-main">Total Amount Due</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <label className="block w-full">
                <span className="text-sm font-medium text-text-main mb-1.5 block">Notes / Comments</span>
                <textarea className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" rows={3} placeholder="Add public notes to the invoice..."></textarea>
            </label>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
