import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { Invoice, Patient } from '../types';
import { useNavigate } from 'react-router-dom';

const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Record<string, Patient>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invData, patData] = await Promise.all([
            DataService.getInvoices(),
            DataService.getPatients()
        ]);
        setInvoices(invData);
        // Create a map for easy lookup
        const pMap: Record<string, Patient> = {};
        patData.forEach(p => pMap[p.id] = p);
        setPatients(pMap);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
       <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main">Invoice Management</h1>
          <p className="text-text-sub mt-1">View, create, and manage all patient invoices.</p>
        </div>
        <button 
            onClick={() => navigate('/billing/create')}
            className="flex items-center justify-center h-10 px-4 bg-primary text-white rounded-lg font-bold text-sm gap-2 hover:bg-primary-dark transition-colors"
        >
            <span className="material-symbols-outlined text-xl">add</span>
            Create New Invoice
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                    type="text" 
                    placeholder="Search by patient name or ID..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
                />
            </div>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">calendar_today</span>
                <input 
                    type="text" 
                    placeholder="Select Date Range" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
                />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
                <button className="px-3 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg whitespace-nowrap">All</button>
                <button className="px-3 py-2 text-text-sub hover:bg-gray-100 text-sm font-medium rounded-lg whitespace-nowrap">Paid</button>
                <button className="px-3 py-2 text-text-sub hover:bg-gray-100 text-sm font-medium rounded-lg whitespace-nowrap">Unpaid</button>
                <button className="px-3 py-2 text-text-sub hover:bg-gray-100 text-sm font-medium rounded-lg whitespace-nowrap">Overdue</button>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="w-12 px-6 py-3"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></th>
                        <th className="px-4 py-3 font-semibold text-text-main">Invoice #</th>
                        <th className="px-4 py-3 font-semibold text-text-main">Patient Name</th>
                        <th className="px-4 py-3 font-semibold text-text-main">Issue Date</th>
                        <th className="px-4 py-3 font-semibold text-text-main">Due Date</th>
                        <th className="px-4 py-3 font-semibold text-text-main">Total Amount</th>
                        <th className="px-4 py-3 font-semibold text-text-main">Status</th>
                        <th className="px-4 py-3 font-semibold text-text-main text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                         <tr><td colSpan={8} className="p-8 text-center text-text-sub">Loading invoices...</td></tr>
                    ) : invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                             <td className="px-4 py-4 text-text-sub">{inv.invoiceNumber}</td>
                             <td className="px-4 py-4 font-medium text-text-main">{patients[inv.patientId]?.name || 'Unknown'}</td>
                             <td className="px-4 py-4 text-text-sub">{inv.issueDate}</td>
                             <td className="px-4 py-4 text-text-sub">{inv.dueDate}</td>
                             <td className="px-4 py-4 font-semibold text-text-main">${inv.total.toFixed(2)}</td>
                             <td className="px-4 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                    ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 
                                      inv.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' : 
                                      'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                    {inv.status}
                                </span>
                             </td>
                             <td className="px-4 py-4 text-right">
                                <button className="text-primary hover:text-primary-dark font-medium text-xs">View</button>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
