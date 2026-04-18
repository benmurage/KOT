export const attendanceCodes = ['P', 'UA', 'AL', 'SL', 'VOP', 'OFF', 'PH'];

export const leaveTypes = ['Annual', 'Sick', 'Maternity', 'Paternity', 'Compassionate', 'Unpaid'];

export const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'Admin', email: 'admin@mas.co.ke' },
  { username: 'hr', password: 'hr123', role: 'HR', email: 'hr@mas.co.ke' },
  { username: 'linelead', password: 'line123', role: 'Line Leader', email: 'linelead@mas.co.ke' },
];

export const initialEmployees = [
  { id: 'E1001', name: 'Asha Njeri', classification: 'Direct', line: 'KN001', section: 'Section 1', shift: 'A', department: 'Sewing' },
  { id: 'E1002', name: 'Peter Mwangi', classification: 'Direct', line: 'KN002', section: 'Section 2', shift: 'B', department: 'Cutting' },
  { id: 'E1003', name: 'Mary Atieno', classification: 'Indirect', line: 'CPU', section: 'Support', shift: 'General', department: 'HR' },
  { id: 'E1004', name: 'John Kamau', classification: 'Direct', line: 'KN011', section: 'Section 3', shift: 'Continental', department: 'Packing' },
  { id: 'E1005', name: 'Faith Akinyi', classification: 'Indirect', line: 'CPU', section: 'Support', shift: 'General', department: 'Quality' },
];

export const initialState = {
  attendance: {
    '2026-04-01': { E1001: 'P', E1002: 'UA', E1003: 'P', E1004: 'SL', E1005: 'P' },
    '2026-04-02': { E1001: 'P', E1002: 'P', E1003: 'P', E1004: 'P', E1005: 'AL' },
    '2026-04-03': { E1001: 'UA', E1002: 'P', E1003: 'P', E1004: 'P', E1005: 'P' },
  },
  leaves: [
    { id: 'L1', employeeId: 'E1004', type: 'Sick', category: 'Unplanned', startDate: '2026-04-01', endDate: '2026-04-05', reason: 'Medical review', status: 'Approved' },
    { id: 'L2', employeeId: 'E1005', type: 'Annual', category: 'Planned', startDate: '2026-04-02', endDate: '2026-04-10', reason: 'Family vacation', status: 'Approved' },
  ],
  movements: [
    { id: 'M1', employeeId: 'E1002', from: 'KN002', to: 'KN007', effectiveDate: '2026-04-12', status: 'Pending' },
    { id: 'M2', employeeId: 'E1001', from: 'KN001', to: 'KN003', effectiveDate: '2026-04-06', status: 'Approved' },
  ],
  vops: [
    { id: 'V1', employeeId: 'E1003', stage: 'Requested', requestedDate: '2026-04-05', effectiveDate: '2026-04-19' },
    { id: 'V2', employeeId: 'E1005', stage: 'Active VOP', requestedDate: '2026-04-02', effectiveDate: '2026-04-16' },
  ],
  auditTrail: [],
};
