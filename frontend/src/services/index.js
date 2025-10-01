import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const memberService = {
  getAll: async (params) => {
    const response = await api.get('/members', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/members', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/members/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/members/stats/overview');
    return response.data;
  },
};

export const planService = {
  getAll: async (params) => {
    const response = await api.get('/plans', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/plans', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/plans/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/plans/${id}`);
    return response.data;
  },
};

export const attendanceService = {
  getAll: async (params) => {
    const response = await api.get('/attendance', { params });
    return response.data;
  },

  checkIn: async (memberId) => {
    const response = await api.post('/attendance/checkin', { memberId });
    return response.data;
  },

  checkOut: async (id) => {
    const response = await api.put(`/attendance/checkout/${id}`);
    return response.data;
  },

  getTodayCount: async () => {
    const response = await api.get('/attendance/today/count');
    return response.data;
  },
};

export const paymentService = {
  getAll: async (params) => {
    const response = await api.get('/payments', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/payments', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/payments/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/payments/${id}`);
    return response.data;
  },

  getStats: async (params) => {
    const response = await api.get('/payments/stats/overview', { params });
    return response.data;
  },
};
