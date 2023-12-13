import {UiState} from './ui/state';

export interface AppState {
  auth: any
  ui: UiState
}

export interface AuthResponse {
  access: string
}

export interface UserResponse {
  message: string,
  data: User
}

export interface User {
  id: number,
  first_name: string | null,
  last_name: string | null,
  phone: string | null,
  email: string | null,
  image: string | null
}

export interface Categories {
  id: number,
  name: string
}

export interface ProjectFilesResponse {
  id: number
  additional_files: string
  calendar_files: string
  contract_files: string
  decision_files: string
  created_add: string
  file_code: string
  updated_at: string
  user: {id: number, username: string}
  categories: {id: number, name: string}
}
