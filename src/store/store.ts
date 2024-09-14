import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/users-slice'

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
})




