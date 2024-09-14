import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/design-system/ui/table'
import { Card } from '@/design-system/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchUsersFailure,
	fetchUsersRequest,
	fetchUsersSuccess,
} from '@/store/slices/users-slice'
import { RootState } from '@/store/types/user-store-types'

import { UsersTableFilter } from './users-table-filter'

import { useEffect } from 'react'
import { User } from '../types/User'

export const UsersTable = () => {
	const dispatch = useDispatch()
	const { filteredUsers, loading, error } = useSelector(
		(state: RootState) => state.users
	)

	useEffect(() => {
		const fetchUsers = async () => {
			dispatch(fetchUsersRequest())
			const response = await fetch('https://jsonplaceholder.typicode.com/users')
			if (!response.ok) {
				dispatch(fetchUsersFailure('Failed to fetch users'))
				return
			}
			const data: User[] = await response.json()

			dispatch(fetchUsersSuccess(data))
		}

		fetchUsers()
	}, [dispatch])

	return (
		<Card className='w-full py-6 px-2 md:px-10 flex flex-col gap-6 min-h-[40vh]'>
			<h1 className='font-semibold'>Users</h1>
			{error && <p className='text-lg text-red-500'>{error}</p>}
			{loading && <p className='text-lg'>Loading...</p>}
			{!loading && !error && (
				<>
					<UsersTableFilter />
					<Table className='border-t text-xs md:text-sm '>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Username</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Phone</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.map(user => (
								<TableRow className='text-left' key={user.id}>
									<TableCell className='font-medium '>{user.name}</TableCell>
									<TableCell>{user.username}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.phone}</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={4}>
									Total users: {filteredUsers.length}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</>
			)}
		</Card>
	)
}
