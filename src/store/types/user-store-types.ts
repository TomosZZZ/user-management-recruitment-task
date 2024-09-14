import { User } from '@/feature/users/types/User'
import { store } from '../store'

export type Action<T> = {
	type: string
	payload?: T
}
export interface UsersState {
	users: User[]
	filteredUsers: User[]
	loading: boolean
	error: string
}

export type UsersFilter = {
	name: string
	username: string
	email: string
	phone: string
}
export type RootState = ReturnType<typeof store.getState>
