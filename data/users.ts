import bcrypt from 'bcryptjs'
import { User } from '@/types/userType'

const rawUsers: Array<{ id: string; username: string; password: string }> = [
  { id: 'user_visitor', username: 'Visitor', password: 'password' },
  { id: 'user_nico', username: 'nico', password: 'admin' },
]

const users: Array<{ id: string; username: string; passwordHash: string }> =
  rawUsers.map((u) => ({
    id: u.id,
    username: u.username,
    passwordHash: bcrypt.hashSync(u.password, 10),
  }))

export default users

export type DemoUser = {
  id: string
  username: string
  passwordHash: string
}
