import type { User } from 'firebase/auth'
// interface IUser {
//   id: string
//   login: string | number
//   password: string | number
//   courses: string[]
// }

export interface ICustomUser extends User {
  password: string
}

