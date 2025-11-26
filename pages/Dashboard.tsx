import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { Invoice } from '../types';

const Dashboard: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    DataService.getInvoices().then(setInvoices);
  }, []);

  const totalRevenue = invoices.reduce((acc, curr) => acc + curr.total, 0);
  const pendingInvoices = invoices.filter(i => i.status !== 'Paid').length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-text-main mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                        <span className="material-symbols-outlined text-3xl">attach_money</span>
                    </div>
                    <div>
                        <p className="text-sm text-text-sub">Total Revenue</p>
                        <p className="text-2xl font-bold text-text-main">${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        <span className="material-symbols-outlined text-3xl">receipt_long</span>
                    </div>
                    <div>
                        <p className="text-sm text-text-sub">Pending Invoices</p>
                        <p className="text-2xl font-bold text-text-main">{pendingInvoices}</p>
                    </div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                        <span className="material-symbols-outlined text-3xl">people</span>
                    </div>
                    <div>
                        <p className="text-sm text-text-sub">Total Patients</p>
                        <p className="text-2xl font-bold text-text-main">102</p>
                    </div>
                </div>
            </div>
        </div>

        <h2 className="text-xl font-bold text-text-main mb-4">Recent Invoices</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                         <th className="px-6 py-3 font-semibold text-text-sub">Invoice #</th>
                         <th className="px-6 py-3 font-semibold text-text-sub">Date</th>
                         <th className="px-6 py-3 font-semibold text-text-sub">Amount</th>
                         <th className="px-6 py-3 font-semibold text-text-sub">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {invoices.slice(0, 5).map(inv => (
                        <tr key={inv.id}>
                            <td className="px-6 py-4 font-medium">{inv.invoiceNumber}</td>
                            <td className="px-6 py-4 text-text-sub">{inv.issueDate}</td>
                            <td className="px-6 py-4 text-text-main">${inv.total.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                    ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 
                                      inv.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' : 
                                      'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                    {inv.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Dashboard;
