import { RouterOSAPI } from 'node-routeros'

let api = null

export default defineEventHandler(async (event) => {
  const method = event.method
  const body = await readBody(event)

  if (method === 'POST' && event.path === '/api/mikrotik/connect') {
    try {
      api = new RouterOSAPI({
        host: body.hostname,
        user: 'admin',
        password: body.password,
        keepalive: true
      })

      await api.connect()
      return { success: true }
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Failed to connect to Mikrotik server'
      })
    }
  }

  if (!api) {
    throw createError({
      statusCode: 400,
      message: 'Not connected to Mikrotik server'
    })
  }

  if (method === 'POST' && event.path === '/api/mikrotik/users') {
    const { count, dataLimit, expirationDays } = body
    const users = []

    for (let i = 0; i < count; i++) {
      const username = Math.floor(100000000 + Math.random() * 900000000).toString()
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + expirationDays)

      try {
        await api.write('/ip/hotspot/user/add', [
          '=name=' + username,
          '=limit-bytes-total=' + dataLimit,
          '=limit-uptime=' + expirationDate.toISOString().split('T')[0]
        ])

        users.push({
          id: crypto.randomUUID(),
          username,
          expirationDate: expirationDate.toISOString(),
          dataLimit
        })
      } catch (error) {
        console.error('Failed to create user:', error)
      }
    }

    return users
  }

  if (method === 'DELETE' && event.path.startsWith('/api/mikrotik/users/')) {
    const username = event.path.split('/').pop()
    try {
      await api.write('/ip/hotspot/user/remove', [
        '=numbers=' + username
      ])
      return { success: true }
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Failed to delete user'
      })
    }
  }
})
