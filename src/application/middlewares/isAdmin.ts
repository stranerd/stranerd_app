import { useAuth } from '@/application/composable/auth/auth' 



export default async ( data: any) => {
	const  { to,  from, next } = data
	if (!useAuth().isAdmin.value) next({ path: '/dashboard/home' })
}
