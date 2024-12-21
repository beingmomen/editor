export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Allow access to login page
  if (to.path === '/login') {
    return
  }

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }

  // Redirect to Mikrotik setup if not connected
  if (to.path !== '/mikrotik-setup' && !auth.mikrotikCredentials) {
    return navigateTo('/mikrotik-setup')
  }
})
