import { defineStore } from 'pinia'

export const useMikrotikStore = defineStore('mikrotik', {
  state: () => ({
    users: [],
    isConnected: false,
    error: null
  }),

  actions: {
    async connect(hostname, password) {
      try {
        const response = await fetch('/api/mikrotik/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hostname, password })
        })

        if (!response.ok) {
          throw new Error('Failed to connect')
        }

        this.isConnected = true
        this.error = null
        return true
      } catch (error) {
        this.error = 'Failed to connect to Mikrotik server'
        this.isConnected = false
        return false
      }
    },

    async generateUsers(count, dataLimit, expirationDays) {
      try {
        const response = await fetch('/api/mikrotik/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ count, dataLimit, expirationDays })
        })

        if (!response.ok) {
          throw new Error('Failed to generate users')
        }

        const users = await response.json()
        this.users.push(...users)
        return users
      } catch (error) {
        this.error = 'Failed to generate users'
        return []
      }
    },

    async deleteUser(userId) {
      try {
        const user = this.users.find(u => u.id === userId)
        if (!user) return false

        const response = await fetch(`/api/mikrotik/users/${user.username}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete user')
        }

        const userIndex = this.users.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1)
        }
        return true
      } catch (error) {
        this.error = 'Failed to delete user'
        return false
      }
    },

    generateCommandScript(users) {
      return users.map(user => {
        const expiration = new Date(user.expirationDate)
        const expirationStr = expiration.toISOString().split('T')[0]
        return `/ip hotspot user add name=${user.username} limit-bytes-total=${user.dataLimit} limit-uptime=${expirationStr}`
      }).join('\n')
    }
  }
})
