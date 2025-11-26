export interface Patient {
  id: string;
  name: string;
  avatar: string;
  dob: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive' | 'New';
  address: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string; // Helper for UI
  patientAvatar?: string; // Helper for UI
  dateTime: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes: string;
  dentistId?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
}