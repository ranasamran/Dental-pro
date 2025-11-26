import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { Patient } from '../types';

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('Routine Check-up');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    DataService.getPatients().then(setPatients);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const dateTime = new Date(`${date}T${time}`).toISOString();
        await DataService.createAppointment({
            patientId,
            dateTime,
            type,
            notes,
            status: 'Scheduled'
        });
        navigate('/appointments');
    } catch (error) {
        console.error(error);
        alert('Failed to book appointment');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-text-main mb-6">Book New Appointment</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div>
            <label className="block text-sm font-medium text-text-main mb-2">Patient</label>
            <select 
                required
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12"
            >
                <option value="">Select a patient...</option>
                {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-text-main mb-2">Date</label>
                <input 
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-main mb-2">Time</label>
                <input 
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-text-main mb-2">Appointment Type</label>
            <select 
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12"
            >
                <option>Routine Check-up</option>
                <option>Cleaning</option>
                <option>Root Canal</option>
                <option>Extraction</option>
                <option>Consultation</option>
                <option>Whitening</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-text-main mb-2">Notes</label>
            <textarea 
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                placeholder="Add any specific details..."
            />
        </div>

        <div className="flex gap-4 pt-4">
            <button 
                type="button"
                onClick={() => navigate('/appointments')}
                className="flex-1 h-12 rounded-lg border border-gray-300 text-text-main font-bold hover:bg-gray-50"
            >
                Cancel
            </button>
            <button 
                type="submit"
                disabled={loading}
                className="flex-1 h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark disabled:opacity-70"
            >
                {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;