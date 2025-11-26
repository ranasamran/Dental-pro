import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { Appointment } from '../types';

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Scheduled' | 'Completed'>('All');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await DataService.getAppointments();
        setAppointments(data.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = appointments.filter(a => filter === 'All' || a.status === filter);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main">Appointments</h1>
          <p className="text-text-sub mt-1">Manage schedule and bookings.</p>
        </div>
        <button 
          onClick={() => navigate('/appointments/book')}
          className="flex items-center justify-center h-10 px-4 bg-primary text-white rounded-lg font-bold text-sm gap-2 hover:bg-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          Book Appointment
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm flex items-center gap-4">
        <span className="text-sm font-medium text-text-main">Filter Status:</span>
        <div className="flex gap-2">
            {['All', 'Scheduled', 'Completed'].map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filter === status 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-text-sub hover:bg-gray-200'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
            <div className="p-8 text-center text-text-sub">Loading appointments...</div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Date & Time</th>
                            <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Patient</th>
                            <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Type</th>
                            <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Notes</th>
                            <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs">Status</th>
                            <th className="px-6 py-3 font-semibold text-text-sub uppercase text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.length > 0 ? filtered.map((apt) => (
                            <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-text-main">
                                        {new Date(apt.dateTime).toLocaleDateString()}
                                    </div>
                                    <div className="text-text-sub text-xs">
                                        {new Date(apt.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {apt.patientAvatar && (
                                            <img src={apt.patientAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                                        )}
                                        <span className="font-medium text-text-main">{apt.patientName || 'Unknown'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-text-sub">{apt.type}</td>
                                <td className="px-6 py-4 text-text-sub max-w-xs truncate">{apt.notes}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                        ${apt.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                          apt.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                          'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                        {apt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:text-primary-dark font-medium text-xs">Edit</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="p-8 text-center text-text-sub">No appointments found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;