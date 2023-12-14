import {UiState} from './ui/state';

export interface AppState {
  auth: any
  ui: UiState
}

export interface AuthResponse {
  access: string
  refresh: string
  id: number
  is_builder: boolean
  is_chief_director: boolean
  is_chief_supervisor: boolean
  is_designer: boolean
  is_director: boolean
  is_pto: boolean
  is_supervisor: boolean
  is_tex_supervisor: boolean
  is_uzg: boolean
}

export interface UserResponse {
  message: string
  data: User
}

export interface User {
  id: number
  first_name: string | null
  last_name: string | null
  phone: string | null
  email: string | null
  image: string | null
}

export interface Categories {
  id: number
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

export interface ProjectsResponse {
  id: number
  arxiv_number: string
  graphic_number: string
  working_project_name: string
  file_autocad: string
  file_pdf: string
  simeta_pdf: string
  simeta_autocad: string
  created_add: string
  is_redirect_designer: boolean
  is_active_designer: boolean
  project_files: ProjectFilesResponse
}

export interface ProjectsDto {
  archiveNumber: string
  graphicNumber: string
  workingProjectName: string
  createdAt: Date
  isAccepted?: boolean
}
