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
