import {UiState} from './ui/state';

export interface AppState {
    auth: any;
    ui: UiState;
}

export interface AuthResponse {
  token: string,
  user: User,
  message: string
}
export interface User {
  id: number
  username: string
  is_chief_director: boolean
  is_director: boolean
  is_designer: boolean
  is_supervisor: boolean
  is_chief_supervisor: boolean
  is_tex_supervisor: boolean
  is_builder: boolean
}
