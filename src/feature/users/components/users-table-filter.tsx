import { Input } from '@/components/ui/input'
import { filter } from '@/store/slices/users-slice'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const UsersTableFilter = () => {
	const dispatch = useDispatch()
	const [appliedFilter, setAppliedFilter] = useState({
		name: '',
		username: '',
		email: '',
		phone: '',
	})

	useEffect(() => {
		dispatch(filter(appliedFilter))
	}, [dispatch, appliedFilter])

	
	const onSearch = useCallback(
		(field: keyof typeof appliedFilter) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setAppliedFilter(prevFilter => ({
					...prevFilter,
					[field]: e.target.value,
				}))
			},
		[]
	)

	return (
		<div className='flex gap-4'>
			<Input onChange={onSearch('name')} placeholder='Search users' />
			<Input onChange={onSearch('username')} placeholder='Search username' />
			<Input onChange={onSearch('email')} placeholder='Search email' />
			<Input onChange={onSearch('phone')} placeholder='Search phone' />
		</div>
	)
}

export default UsersTableFilter
