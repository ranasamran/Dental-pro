import { Patient, Invoice, User, Appointment } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Dr. Emily Carter',
  role: 'General Dentist',
  email: 'emily@dentalflow.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz1RWHmFeJYjrwJSfPuMMMFQeFvnmX1oBUmQfjNhRBxPEfiu6rZQwcA7W8uC2PRjfzfnKghYqf_-7q73m0XLANlMWhQc02xehW_6GiCfad49Pnt6cc_CGyTBNjT2Z4HbRF71hmyXMHOIIYwbwYv6y9Q7_oiqMnysaRKQaHaBc7c070sZbQvaRKXS1PFO77RtOQstZlccHuVBroJmYnn1v0qlTlsa_LAaQ8qUuVU-2kHtRASCyLnUvcKQYchJ9xTjULp8GNx_x4tM3G'
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Olivia Rhye',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBowvhJPC1clgH16MaxYW4g3OJ9Q-_I4DDFSwofJNILOhJq5pARyryVKnfOHsjlsM6hPUWCONZmoSouis0ThZ8j2GGgSwzEjsgxew1nP9tENUa-xxRRgw94sany9fnvXk0yVPDd2OCIkqO-eoGbsL6NtiXhoEC6cMq5mwTJRHUXDEcOB3AxIN8RXDE_bReZjjD9yMzUeaduhe4kQKTKLdMLwt2fbCll1elqyJIl5D2n7VssJ8oy1wvuJwgyH6I4NCJhN7rChPR4j8yJ',
    dob: '1992-08-15',
    phone: '(555) 123-4567',
    email: 'olivia@example.com',
    lastVisit: '2023-10-15',
    nextAppointment: '2024-04-22T10:00:00',
    status: 'Active',
    address: '123 Maple Ave, Springfield'
  },
  {
    id: 'p2',
    name: 'Phoenix Baker',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArw7zZxyQ6tI_sStpuNXj0hT8NNcC0Sufdr-M21injVXUVZOwXT3V26osWLnJJRdExP4L1neklZBt1Lg3l53eycyOA3QbE2aRXQvPhkngG1oiDnxGyqdtwmR2aDQqh7-kNaUdxpzi8LhFh08FWNvPCFMPlD4w8r0FWtEiIA4jBxEpwtgP50axRZRYDIdwZAMQIU-LJSPneFaDhYKVBEHuMaYsCbyQCYZyxGFA3NuYtWtCPHuTB_B2ansqbaBlel7SfWpqOJT8yRLkz',
    dob: '1985-11-20',
    phone: '(555) 987-6543',
    email: 'phoenix@example.com',
    lastVisit: '2023-09-01',
    nextAppointment: '2024-05-10T14:30:00',
    status: 'Active',
    address: '456 Oak St, Metropolis'
  },
  {
    id: 'p3',
    name: 'Lana Steiner',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5LbT8282dyA3sKweWOL_vbgaMND8cfsRIl8ekHPkxAW6KMbSSquy4qFg-rdsrUWXDI1v86j9FYqlngbSGe1rCbuEmXt_zlmd3064Ij3uxCNW0mVKf7jzF4MCYbFz3_-dN5c8DOwEk8dlZRVhNk_fgs8ygyOarm1pkopmKViuPX9WxCRkZYYIUbIG1P5tGBb9yLpP7PejoktmS9hBR2PpbCsTDGiKNm4fxLK0YbjIZDjbuuIeEjp1CwHIBQp-EgsV0Seqz804g-LqJ',
    dob: '2001-05-30',
    phone: '(555) 234-5678',
    email: 'lana@example.com',
    lastVisit: '2024-03-20',
    status: 'New',
    address: '789 Pine Ln, Gotham'
  },
  {
    id: 'p4',
    name: 'Demi Wilkinson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVGa07j1kwerpkDOjZdaYvMZa0Hb-bVaKGSlpb0pHKNpcdzFP3kgyFOv6WKVIdTr74_4OU4W6MGjUZIEevIT5_GXsrpBxu35EQV0iwHzFUWmTC7xEFrBNI0xypNo9IDXSZZ34OOS0orJBYxsz_WwgieSaTcwlN1m_zYwJdJKKEWpUfWjC20Qu3r9yhbLsbQKXkeGu4N2SkNFSiXLHt4MhHoVPPKZr2sTPWTaCdKbgkEr6Og2y9yeupoRGq3YX78F9178Y2eTBEO5MD',
    dob: '1978-02-10',
    phone: '(555) 876-5432',
    email: 'demi@example.com',
    lastVisit: '2022-05-18',
    status: 'Inactive',
    address: '321 Elm St, Smallville'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt1',
    patientId: 'p1',
    patientName: 'Olivia Rhye',
    patientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBowvhJPC1clgH16MaxYW4g3OJ9Q-_I4DDFSwofJNILOhJq5pARyryVKnfOHsjlsM6hPUWCONZmoSouis0ThZ8j2GGgSwzEjsgxew1nP9tENUa-xxRRgw94sany9fnvXk0yVPDd2OCIkqO-eoGbsL6NtiXhoEC6cMq5mwTJRHUXDEcOB3AxIN8RXDE_bReZjjD9yMzUeaduhe4kQKTKLdMLwt2fbCll1elqyJIl5D2n7VssJ8oy1wvuJwgyH6I4NCJhN7rChPR4j8yJ',
    dateTime: '2024-04-22T10:00:00',
    type: 'Routine Check-up',
    status: 'Scheduled',
    notes: 'Patient reported minor sensitivity.'
  },
  {
    id: 'appt2',
    patientId: 'p2',
    patientName: 'Phoenix Baker',
    patientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArw7zZxyQ6tI_sStpuNXj0hT8NNcC0Sufdr-M21injVXUVZOwXT3V26osWLnJJRdExP4L1neklZBt1Lg3l53eycyOA3QbE2aRXQvPhkngG1oiDnxGyqdtwmR2aDQqh7-kNaUdxpzi8LhFh08FWNvPCFMPlD4w8r0FWtEiIA4jBxEpwtgP50axRZRYDIdwZAMQIU-LJSPneFaDhYKVBEHuMaYsCbyQCYZyxGFA3NuYtWtCPHuTB_B2ansqbaBlel7SfWpqOJT8yRLkz',
    dateTime: '2024-05-10T14:30:00',
    type: 'Root Canal',
    status: 'Scheduled',
    notes: 'Follow up from last x-ray.'
  },
  {
    id: 'appt3',
    patientId: 'p3',
    patientName: 'Lana Steiner',
    patientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5LbT8282dyA3sKweWOL_vbgaMND8cfsRIl8ekHPkxAW6KMbSSquy4qFg-rdsrUWXDI1v86j9FYqlngbSGe1rCbuEmXt_zlmd3064Ij3uxCNW0mVKf7jzF4MCYbFz3_-dN5c8DOwEk8dlZRVhNk_fgs8ygyOarm1pkopmKViuPX9WxCRkZYYIUbIG1P5tGBb9yLpP7PejoktmS9hBR2PpbCsTDGiKNm4fxLK0YbjIZDjbuuIeEjp1CwHIBQp-EgsV0Seqz804g-LqJ',
    dateTime: '2024-03-20T09:00:00',
    type: 'Consultation',
    status: 'Completed',
    notes: 'New patient intake.'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-00124',
    patientId: 'p2',
    issueDate: '2024-10-15',
    dueDate: '2024-10-30',
    items: [
      { id: 'item1', description: 'Dental X-Ray', quantity: 2, unitPrice: 50 },
      { id: 'item2', description: 'Standard Cleaning', quantity: 1, unitPrice: 150 }
    ],
    subtotal: 250,
    tax: 0,
    discount: 0,
    total: 250.00,
    status: 'Paid'
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-00123',
    patientId: 'p1',
    issueDate: '2024-10-12',
    dueDate: '2024-10-27',
    items: [
      { id: 'item3', description: 'Consultation', quantity: 1, unitPrice: 80 },
      { id: 'item4', description: 'Fluoride Treatment', quantity: 1, unitPrice: 100.50 }
    ],
    subtotal: 180.50,
    tax: 0,
    discount: 0,
    total: 180.50,
    status: 'Unpaid'
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-00122',
    patientId: 'p3',
    issueDate: '2024-09-25',
    dueDate: '2024-10-10',
    items: [
      { id: 'item5', description: 'Whitening Kit', quantity: 1, unitPrice: 300 },
      { id: 'item6', description: 'Custom Trays', quantity: 1, unitPrice: 250 }
    ],
    subtotal: 550,
    tax: 0,
    discount: 0,
    total: 550.00,
    status: 'Overdue'
  }
];