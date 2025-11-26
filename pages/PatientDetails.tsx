import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { Patient, Appointment } from '../types';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [history, setHistory] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        const load = async () => {
            try {
                const p = await DataService.getPatientById(id);
                if (p) {
                    setPatient(p);
                    const appts = await DataService.getAppointmentsByPatient(id);
                    setHistory(appts);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center text-text-sub">Loading patient details...</div>;
  if (!patient) return <div className="p-8 text-center text-text-sub">Patient not found.</div>;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/patients')} 
        className="mb-6 flex items-center text-sm font-medium text-text-sub hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-lg mr-1">arrow_back</span>
        Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Patient Profile */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <div className="flex flex-col items-center text-center mb-6">
                <img src={patient.avatar} alt={patient.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-50" />
                <h1 className="text-2xl font-bold text-text-main">{patient.name}</h1>
                <p className="text-sm text-text-sub mt-1">ID: {patient.id.toUpperCase()}</p>
                <div className="mt-4">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium
                        ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 
                          patient.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {patient.status}
                    </span>
                </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
                <div>
                    <label className="text-xs font-semibold text-text-sub uppercase">Date of Birth</label>
                    <p className="text-text-main font-medium">{patient.dob}</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-text-sub uppercase">Phone</label>
                    <p className="text-text-main font-medium">{patient.phone}</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-text-sub uppercase">Email</label>
                    <p className="text-text-main font-medium">{patient.email}</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-text-sub uppercase">Address</label>
                    <p className="text-text-main font-medium">{patient.address}</p>
                </div>
            </div>

            <button className="w-full mt-8 h-10 rounded-lg border border-gray-200 text-text-main font-bold text-sm hover:bg-gray-50">
                Edit Profile
            </button>
        </div>

        {/* Right: History & Actions */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-text-main">Appointment History</h2>
                    <button 
                        onClick={() => navigate('/appointments/book')}
                        className="text-sm font-bold text-primary hover:underline"
                    >
                        + Book New
                    </button>
                </div>

                {history.length > 0 ? (
                    <div className="space-y-4">
                        {history.map(apt => (
                            <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-primary">
                                        <span className="material-symbols-outlined">event</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-main">{apt.type}</p>
                                        <p className="text-xs text-text-sub">{new Date(apt.dateTime).toLocaleDateString()} at {new Date(apt.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded ${apt.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {apt.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-text-sub text-center py-4">No appointment history found.</p>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-text-main">Billing & Invoices</h2>
                    <button 
                        onClick={() => navigate('/billing/create')}
                        className="text-sm font-bold text-primary hover:underline"
                    >
                        Create Invoice
                    </button>
                </div>
                <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">receipt_long</span>
                    <p className="text-text-sub text-sm">No recent invoices for this patient.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;