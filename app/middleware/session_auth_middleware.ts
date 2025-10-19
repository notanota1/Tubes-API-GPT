import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SessionAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      // Check if user is authenticated via session
      const authToken = ctx.session.get('auth_token')
      const user = ctx.session.get('user')
      
      if (!authToken || !user) {
        // Debugging: print request and session state when redirecting
        console.debug('[SessionAuth] redirecting to /login', {
          url: ctx.request.url(),
          authTokenExists: !!authToken,
          userExists: !!user
        })

        // Redirect to login if not authenticated
        const requestUrl = ctx.request.url()
        if (requestUrl.includes('/api/')) {
          return ctx.response.unauthorized({
            message: 'Unauthorized - Please login first'
          })
        }

        return ctx.response.redirect('/login')
      }
      
      // Add user to context for use in controllers
      ;(ctx as any).authUser = user
      
      /**
       * Call next method in the pipeline and return its output
       */
      const output = await next()
      return output
    } catch (error) {
      // If any error occurs, redirect to login
      return ctx.response.redirect('/login')
    }
  }
}