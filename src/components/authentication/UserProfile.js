import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// This is janky as fuck and I know that but it works so it stays
// redirects to leaderboard. thats all it does
export default function UserProfile() {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/leaderboard')
	}, [])
}