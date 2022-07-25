import axios from 'axios'
import { parseCookies } from 'nookies'

const BaseUrl = 'http://localhost:3004'
const { 'q2bank.accessToken': accessToken } = parseCookies()

export const api = axios.create({
  baseURL: BaseUrl,
})

if (accessToken) {
  api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
}
