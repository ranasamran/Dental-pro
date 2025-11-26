import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { Patient } from '../types';
import { useNavigate } from 'react-router-dom';

const PatientList: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await DataService.getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main">Patient Hub</h1>
          <p className="text-text-sub mt-1">Search, view, and manage patient records.</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center justify-center h-10 px-4 bg-primary text-white rounded-lg font-bold text-sm gap-2 hover:bg-primary-dark transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
                Register New Patient
            </button>
            <button className="flex items-center justify-center h-10 px-4 bg-gray-100 text-text-main rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
                Today's Appointments
            </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text"
            placeholder="Search by Patient Name, ID, or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
         <span className="text-sm font-medium text-text-main">Filter by:</span>
         <button className="flex items-center gap-2 h-8 px-3 rounded-lg bg-primary/10 text-primary text-sm font-medium">
            Status: All
            <span className="material-symbols-outlined text-base">arrow_drop_down</span>
         </button>
         <button className="flex items-center gap-2 h-8 px-3 rounded-lg border border-gray-200 bg-white text-text-sub text-sm font-medium hover:bg-gray-50">
            Last Visit
            <span className="material-symbols-outlined text-base">arrow_drop_down</span>
         </button>
         <button className="flex items-center gap-2 h-8 px-3 rounded-lg border border-gray-200 bg-white text-text-sub text-sm font-medium hover:bg-gray-50">
            Next Appointment
            <span className="material-symbols-outlined text-base">arrow_drop_down</span>
         </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Patient Name</th>
                        <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Patient ID</th>
                        <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Last Visit</th>
                        <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Next Appointment</th>
                        <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Status</th>
                        <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                       <tr><td colSpan={6} className="p-8 text-center text-text-sub">Loading patients...</td></tr>
                    ) : filteredPatients.length > 0 ? (
                        filteredPatients.map(patient => (
                            <tr 
                                key={patient.id} 
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => navigate(`/patients/${patient.id}`)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={patient.avatar} alt={patient.name} className="w-8 h-8 rounded-full object-cover" />
                                        <span className="font-medium text-text-main">{patient.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-text-sub font-mono text-xs">{patient.id.toUpperCase()}</td>
                                <td className="px-6 py-4 text-text-sub">{patient.lastVisit}</td>
                                <td className="px-6 py-4 text-text-sub">
                                    {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                        ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                          patient.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${patient.status === 'Active' ? 'bg-green-500' : patient.status === 'New' ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan={6} className="p-8 text-center text-text-sub">No patients found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Pagination mock */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <span className="text-sm text-text-sub">Showing <span className="font-semibold text-text-main">{filteredPatients.length > 0 ? 1 : 0}-{filteredPatients.length}</span> of <span className="font-semibold text-text-main">100</span></span>
            <div className="flex gap-1">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm text-text-sub">Previous</button>
                <button className="px-3 py-1 bg-primary/10 border border-primary text-primary rounded text-sm font-medium">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm text-text-sub">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm text-text-sub">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;