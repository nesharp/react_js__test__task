import { useSearchParams } from 'react-router-dom'

export const useOldParams = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const oldParams = Object.fromEntries(searchParams.entries())
	return { oldParams, searchParams, setSearchParams }
}
