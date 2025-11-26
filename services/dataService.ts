import { supabase } from '../supabaseClient';
import { MOCK_PATIENTS, MOCK_INVOICES, CURRENT_USER, MOCK_APPOINTMENTS } from './mockData';
import { Patient, Invoice, Appointment, User } from '../types';

// Helper to simulate async delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DataService = {
  // --- Auth ---
  getCurrentUser: async (): Promise<User | null> => {
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch profile if exists, otherwise fallback
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        return {
          id: user.id,
          email: user.email || '',
          name: profile?.full_name || user.email?.split('@')[0] || 'User',
          role: profile?.role || 'Dentist',
          avatar: profile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz1RWHmFeJYjrwJSfPuMMMFQeFvnmX1oBUmQfjNhRBxPEfiu6rZQwcA7W8uC2PRjfzfnKghYqf_-7q73m0XLANlMWhQc02xehW_6GiCfad49Pnt6cc_CGyTBNjT2Z4HbRF71hmyXMHOIIYwbwYv6y9Q7_oiqMnysaRKQaHaBc7c070sZbQvaRKXS1PFO77RtOQstZlccHuVBroJmYnn1v0qlTlsa_LAaQ8qUuVU-2kHtRASCyLnUvcKQYchJ9xTjULp8GNx_x4tM3G'
        };
      }
      return null;
    }
    // Fallback for demo without keys
    return CURRENT_USER;
  },

  // --- Patients ---
  getPatients: async (): Promise<Patient[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('patients').select('*');
      if (!error && data) return data.map((p: any) => ({
        ...p,
        avatar: p.avatar_url || 'https://via.placeholder.com/150',
        lastVisit: p.last_visit || '', // Mapping snake_case from DB if needed
      })) as Patient[];
    }
    await delay(300);
    return MOCK_PATIENTS;
  },

  getPatientById: async (id: string): Promise<Patient | undefined> => {
    if (supabase) {
      const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();
      if (!error && data) return {
         ...data,
         avatar: data.avatar_url,
         lastVisit: data.last_visit // Assume DB col is last_visit
      } as Patient;
    }
    await delay(300);
    return MOCK_PATIENTS.find(p => p.id === id);
  },

  createPatient: async (patient: Omit<Patient, 'id'>): Promise<Patient | null> => {
    if (supabase) {
       const { data, error } = await supabase.from('patients').insert([{
         name: patient.name,
         email: patient.email,
         phone: patient.phone,
         dob: patient.dob,
         address: patient.address,
         status: patient.status,
         avatar_url: patient.avatar
       }]).select().single();
       
       if (error) throw error;
       return data as Patient;
    }
    await delay(500);
    const newP = { ...patient, id: Date.now().toString() };
    MOCK_PATIENTS.push(newP);
    return newP;
  },

  // --- Appointments ---
  getAppointments: async (): Promise<Appointment[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('appointments').select(`
        *,
        patients ( name, avatar_url )
      `);
      if (!error && data) {
        return data.map((a: any) => ({
          id: a.id,
          patientId: a.patient_id,
          patientName: a.patients?.name,
          patientAvatar: a.patients?.avatar_url,
          dateTime: a.date_time,
          type: a.type,
          status: a.status,
          notes: a.notes,
          dentistId: a.dentist_id
        }));
      }
    }
    await delay(300);
    return MOCK_APPOINTMENTS;
  },

  getAppointmentsByPatient: async (patientId: string): Promise<Appointment[]> => {
    if (supabase) {
        const { data, error } = await supabase.from('appointments').select('*').eq('patient_id', patientId);
        if(!error && data) {
            return data.map((a: any) => ({
                id: a.id,
                patientId: a.patient_id,
                dateTime: a.date_time,
                type: a.type,
                status: a.status,
                notes: a.notes,
                dentistId: a.dentist_id
              }));
        }
    }
    await delay(300);
    return MOCK_APPOINTMENTS.filter(a => a.patientId === patientId);
  },

  createAppointment: async (appt: Omit<Appointment, 'id' | 'patientName' | 'patientAvatar'>): Promise<void> => {
    if (supabase) {
      const { error } = await supabase.from('appointments').insert([{
        patient_id: appt.patientId,
        date_time: appt.dateTime,
        type: appt.type,
        status: appt.status,
        notes: appt.notes
      }]);
      if (error) throw error;
    } else {
      await delay(500);
      const patient = MOCK_PATIENTS.find(p => p.id === appt.patientId);
      MOCK_APPOINTMENTS.push({
        ...appt,
        id: Date.now().toString(),
        patientName: patient?.name,
        patientAvatar: patient?.avatar
      });
    }
  },

  // --- Invoices ---
  getInvoices: async (): Promise<Invoice[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('invoices').select('*');
      if (error) throw error;
      // In a real app we would also fetch invoice_items join
      return data.map((i: any) => ({
          ...i,
          issueDate: i.issue_date,
          dueDate: i.due_date,
          invoiceNumber: i.invoice_number
      })) as Invoice[];
    }
    await delay(300);
    return MOCK_INVOICES;
  },

  createInvoice: async (invoice: Invoice): Promise<void> => {
    if (supabase) {
      // 1. Insert Invoice
      const { data: invData, error: invError } = await supabase.from('invoices').insert([{
        invoice_number: invoice.invoiceNumber,
        patient_id: invoice.patientId,
        issue_date: invoice.issueDate,
        due_date: invoice.dueDate,
        subtotal: invoice.subtotal,
        tax: invoice.tax,
        discount: invoice.discount,
        total: invoice.total,
        status: invoice.status
      }]).select().single();

      if (invError) throw invError;

      // 2. Insert Items
      if (invData) {
        const items = invoice.items.map(item => ({
          invoice_id: invData.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice
        }));
        const { error: itemError } = await supabase.from('invoice_items').insert(items);
        if (itemError) throw itemError;
      }
    } else {
      await delay(500);
      MOCK_INVOICES.unshift(invoice);
    }
  },
};