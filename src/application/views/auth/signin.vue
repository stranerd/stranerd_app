<template>
	<Auth>
		<div class="w-full h-full flex bg-white ">
			<div class="bg-primary w-7/12 lg:flex flex-col items-center justify-center h-full hidden ">
				<h1 class="text-5xl text-white font-extrabold mb-12">Welcome back</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<h1 class="md:block text-5xl hidden text-main_dark font-extrabold mb-8 text-center">Log in</h1>
				<div class="h-[65%] w-full md:w-[70%]">
					<form class="flex flex-col gap-4" @submit.prevent="signin">
						<div class="flex flex-col w-full">
							<ion-label class="font-bold text-sm text-main_dark mb-2">Email</ion-label>
							<ion-input v-model.trim="factory.email" :size="24" inputmode="email" 
								placeholder="Email Address" position="floating"
								type="email" />
							<DisplayError :error="factory.errors.email" />
						</div>
						<div class="flex flex-col">
							<ion-label class="font-bold text-sm text-main_dark mb-2">Password</ion-label>
							<ion-input v-model="factory.password" :size="24" placeholder="Password"
								position="floating"
								type="password"></ion-input>
							<DisplayError :error="factory.errors.password" />
						</div>
						<ion-button :disabled="loading" class="w-full capitalize mt-4 font-normal text-sm" type="submit">
							<span v-if="!loading">Login</span> 
							<ion-spinner v-else />
						</ion-button>
					</form>
					<div class="w-full flex justify-center items-center mt-8 text-main_dark">
						<router-link class="text-primary" to="/auth/forgot">
							Forgot Password ?
						</router-link>
					</div>
					<div class="flex justify-between px-5 items-center my-4">
						<div class="border-faded_gray border-b h-1 w-4/12" />
						<span class="text-primary">or use</span>
						<div class="border-faded_gray border-b h-1 w-4/12" />
					</div>
					<AuthProviders />
					<span class="text- w-full flex justify-center items-center text-icon_inactive mt-12">
						Don’t have an account?
						<router-link class="text-primary font-bold ml-2" to="/auth/signup">
							Create account
						</router-link>
					</span>
				</div>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignin } from '@app/composable/auth/signin'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'
import { IonSpinner, IonLabel } from '@ionic/vue'

export default defineComponent({
	name: 'AuthSignin',
	displayName: 'Login',
	components: { AuthProviders, Auth, IonSpinner, IonLabel },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, error, signin } = useEmailSignin()
		return { factory, loading, error, signin }
	}
})
</script>
