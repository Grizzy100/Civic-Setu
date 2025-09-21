//types/globals.d.ts

// Create a type for the roles
export type Roles = 'admin' | 'dist_head' | 'user'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}