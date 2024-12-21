import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    mikrotikCredentials: null,
    isAuthenticated: false
  }),

  actions: {
    login(username, password) {
      // In a real app, this would make an API call
      if (password === 'admin123' && username === 'admin') {
        this.user = { username, role: 'admin' }
        this.isAuthenticated = true
        return true
      } else if (password === 'tech123' && username === 'tech') {
        this.user = { username, role: 'technician' }
        this.isAuthenticated = true
        return true
      }
      return false
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.mikrotikCredentials = null
    },

    setMikrotikCredentials(credentials) {
      this.mikrotikCredentials = credentials
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isTechnician: (state) => state.user?.role === 'technician'
  }
})
