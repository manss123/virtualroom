// src/types/express.d.ts
import 'express-serve-static-core'
import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: string
      email?: string
      roles?: string[]
    }
  }
}
