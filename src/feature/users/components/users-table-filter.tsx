import { Input } from '@/design-system/ui/input'
import { filter } from '@/store/slices/users-slice'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const INPUT_FILTERS_NAMES = ['name', 'username', 'email', 'phone'] as const

export const UsersTableFilter = () => {
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
		<div className='flex flex-wrap md:flex-nowrap justify-center gap-4'>
			{INPUT_FILTERS_NAMES.map(filterName => (
				<Input
					key={filterName}
					className='w-[45%] md:w-[25%]'
					onChange={onSearch(filterName)}
					placeholder={`Search ${filterName}`}
				/>
			))}
		</div>
	)
}
