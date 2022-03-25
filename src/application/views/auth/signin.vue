<template>
	<Auth>
		<div class="w-full h-full flex bg-white">
			<div class="bg-primary w-7/12 lg:flex flex-col items-center justify-center h-full hidden ">
				<h1 class="text-5xl text-white font-extrabold mb-12">Welcome back</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center justify-center lg:w-5/12 w-full p-4">
				<h1 class="md:text-5xl text-2xl text-main_dark font-extrabold mb-8 text-center">Log in</h1>
				<div class="h-[65%]">
					<form class="flex flex-col gap-4" @submit.prevent="signin">
						<div>
							<ion-input v-model.trim="factory.email" :size="24" inputmode="email"
								placeholder="Email Address" position="floating"
								type="email" />
							<DisplayError :error="factory.errors.email" />
						</div>
						<div>
							<ion-input v-model="factory.password" :size="24" placeholder="Password"
								position="floating"
								type="password"></ion-input>
							<DisplayError :error="factory.errors.password" />
						</div>
						<ion-button :disabled="loading" class="w-full capitalize" type="submit">Login
							<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
						</ion-button>
					</form>
					<div class="w-full flex justify-end items-center text-main_dark">
						<router-link class="text-primary" to="/auth/forgot">
							Forgot Password ?
						</router-link>
					</div>
					<div class="flex justify-between px-5 items-center mt-8">
						<div class="border-faded_gray border-b h-1 w-4/12" />
						<span class="text-gray text-2xl">or use</span>
						<div class="border-faded_gray border-b h-1 w-4/12" />
					</div>
					<AuthProviders />
					<span class="text- w-full flex justify-center items-center text-icon_inactive mt-8">
						Don’t have an account?
						<router-link class="text-primary font-bold ml-2" to="/auth/signup">
							Sign Up
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
import { IonSpinner } from '@ionic/vue'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'

export default defineComponent({
	name: 'AuthSignin',
	displayName: 'Signin',
	components: { AuthProviders, IonSpinner, Auth },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, error, signin } = useEmailSignin()
		return { factory, loading, error, signin }
	}
})
</script>
