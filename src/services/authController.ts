import { api } from '../services'

export function signIn(email: string, password: string) {
  return api.post('/login', { email, password })
}
export function getUser(id: number) {
  return api.get(`/users/${id}`)
}
