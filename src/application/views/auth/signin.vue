<template>
	<div class="gap-1 gap-md-2 flex flex-col">
		<form class="gap-1 gap-md-2 flex flex-col" @submit.prevent="signin">
			<Heading class="text-center" variant="1">
				Sign In
			</Heading>
			<div>
				<input
					id="email"
					autocomplete="email"
					class="form-control text-sub p-4 rounded-md border border-sub outline-none"
					name="email"
					placeholder="Email"
					required
					type="email"
				>
				<!-- <DynamicText v-if="factory.errors.email" class="small text-danger d-block">
					{{ factory.errors.email }}
				</DynamicText> -->
			</div>
			<div>
				<input
					id="password"
					autocomplete="password"
					class="form-control text-sub p-4 rounded-md border border-sub outline-none"
					name="password"
					placeholder="Password"
					required
					type="password"
				>
				<!-- <DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText> -->
				<div class="text-end mt-1">
					<RouterLink class="text-primary font-bold underline text-decoration-none" to="/auth/forgot">
						Forgot Password
					</RouterLink>
				</div>
			</div>
			<button  class="btn text-base text-white bg-primary border-2 rounded-md font-bold py-4" type="submit">
				Sign In
			</button>
		
		</form>
		<div class="flex gap-1 align-items-center">
			<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
			<span>or sign in with</span>
			<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
		</div>
		<AuthProviders />
		<div class="flex align-items-center justify-content-center gap-0-25">
			<span>Not a member yet?</span>
			<RouterLink class="text-primary font-bold underline" to="/auth/signup">
				Sign Up
			</RouterLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import AuthProviders from '@/application/components/auth/AuthProviders.vue'
import Heading from '@/application/components/core/text/Heading.vue'
// import { usePassword } from '@/application/hooks/core/forms'
// import { useEmailSignin } from '@/application/hooks/auth/signin'

export default defineComponent({
	name: 'AuthSigninPage',
	components: {  Heading },
	layout: 'auth',
	// middleware: ['isNotAuthenticated'],
	// setup () {
	// 	const { show, toggle } = usePassword()
	// 	const { loading, signin, factory, error } = useEmailSignin()
	// 	// useMeta(() => ({
	// 	// 	title: 'Sign in for Stranerd'
	// 	// }))
	// 	return { show, toggle, factory, loading, error, signin }
	// },
	head: {}
})
</script>

