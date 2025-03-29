import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null, // 'admin' or 'customer'
  login: (userData) => set({ 
    user: userData, 
    isAuthenticated: true, 
    role: userData.role 
  }),
  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    role: null 
  }),
}));

export default useAuthStore;