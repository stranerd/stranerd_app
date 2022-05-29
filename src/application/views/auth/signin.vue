<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Welcome back</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<h1 class="md:block text-5xl hidden font-extrabold mb-8 text-center">Log in</h1>
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="signin">
					<div class="flex flex-col w-full">
						<IonLabel class="font-bold text-sm mb-2">Email</IonLabel>
						<IonInput v-model.trim="factory.email"
							:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
							:size="24"
							inputmode="email" placeholder="Email Address" position="floating" type="email" />
						<DisplayError :error="factory.errors.email" />
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold text-sm mb-2">Password</IonLabel>
						<IonInput v-model="factory.password"
							:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
							:size="24"
							placeholder="Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.password" />
					</div>
					<IonButton :disabled="loading || !factory.valid" class="w-full text-sm btn-primary mt-2"
						type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Login</span>
					</IonButton>
					<div class="w-full flex justify-center items-center">
						<router-link class="text-primaryBg" to="/auth/forgot">
							Forgot Password?
						</router-link>
					</div>
					<AuthProviders />
					<span class="w-full flex justify-center items-center text-secondaryText mt-2">
						Don’t have an account?
						<router-link class="text-primaryBg font-bold ml-1" to="/auth/signup">
							Create account
						</router-link>
					</span>
				</form>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignin } from '@app/composable/auth/signin'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'AuthSignin',
	displayName: 'Login',
	components: { AuthProviders, Auth },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		const { factory, loading, error, signin } = useEmailSignin()
		return { factory, loading, error, signin }
	}
})
</script>
