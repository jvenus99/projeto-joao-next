import { api } from '../services'

type User = {
  id: number
  name?: string
  document?: string
  bank?: {
    bankName?: string
    code?: string
    agency?: string
    account?: string
  }
}

export function getUsersData(page: number) {
  return api.get(`/dataUsers?_page=${page}&_limit=8`)
}

export function updateUserData(id: number, user: User) {
  return api.patch(`/dataUsers/${id}`, user)
}
