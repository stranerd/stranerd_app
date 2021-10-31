import { useAuth } from '@/application/composable/auth/auth' 


export default async ( data: any) => {
	const  { to,  from, next } = data
	console.log(await useAuth())
	console.log(await useAuth().isLoggedIn.value)
	
	if (useAuth().isLoggedIn.value) {
		 next({ path: '/dashboard/home'  })

		 return true
	}
    
}
