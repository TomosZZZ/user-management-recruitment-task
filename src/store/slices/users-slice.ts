import { User } from '@/feature/users/types/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface usersState {
	users: User[]
	filteredUsers: User[]
	loading: boolean
	error: string
}


type usersFilter = {
	name: string
	username: string
	email: string
	phone: string
}

const initialState: usersState = {
	users: [],
	filteredUsers: [],
	loading: false,
	error: '',
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		fetchUsersRequest: state => {
			state.loading = true
		},
		fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
			state.loading = false
			state.users = action.payload
			state.filteredUsers = action.payload
			state.error = ''
		},
		fetchUsersFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.users = []
			state.filteredUsers = []
			state.error = action.payload
		},
		filter: (state, action: PayloadAction<usersFilter>) => {
			state.filteredUsers = state.users.filter(
				user =>
					user.name
						.toLowerCase()
						.includes(action.payload.name.toLocaleLowerCase()) &&
					user.username
						.toLowerCase()
						.includes(action.payload.username.toLowerCase()) &&
					user.email
						.toLowerCase()
						.includes(action.payload.email.toLowerCase()) &&
					user.phone.toLowerCase().includes(action.payload.phone.toLowerCase())
			)
		},
	},
})

export const {
	fetchUsersRequest,
	fetchUsersSuccess,
	fetchUsersFailure,
	filter,
} = usersSlice.actions
export default usersSlice.reducer
