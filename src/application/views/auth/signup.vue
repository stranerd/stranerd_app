<template>
	<Auth>
		<div class="w-full h-full flex bg-white">
			<div
				class="bg-primary w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl text-white font-extrabold mb-12">Studying has never been easier</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center justify-center lg:w-5/12 w-full h-full ml-auto p-4">
				<h1 class="md:text-5xl text-2xl text-main_dark font-extrabold mb-8 text-center">Sign up today</h1>
				<div>
					<form class="flex flex-col gap-4" @submit.prevent="signup">
						<div>
							<ion-input v-model="factory.firstName" :size="24" placeholder="First Name"
								position="floating"
								type="text"></ion-input>
							<DisplayError :error="factory.errors.firstName" />
						</div>
						<div>
							<ion-input v-model="factory.lastName" :size="24" placeholder="Last Name" position="floating"
								type="text"></ion-input>
							<DisplayError :error="factory.errors.lastName" />
						</div>
						<div>
							<ion-input v-model.trim="factory.email" :size="24" inputmode="email"
								placeholder="Email Address"
								position="floating" type="email" />
							<DisplayError :error="factory.errors.email" />
						</div>
						<div>
							<ion-input v-model="factory.password" :size="24" placeholder="Password"
								position="floating"
								type="password"></ion-input>
							<DisplayError :error="factory.errors.password" />
						</div>
						<div>
							<ion-input v-model="factory.cPassword" :size="24" placeholder="Confirm Password"
								position="floating"
								type="password"></ion-input>
							<DisplayError :error="factory.errors.cPassword" />
						</div>
						<ion-button class="w-full !capitalize" type="submit">Sign up
							<ion-spinner v-if="loading" />
						</ion-button>
					</form>
					<div class="flex justify-between px-5 items-center mt-8">
						<div class="border-faded_gray border-b h-1 w-4/12" />
						<span class="font-nuni text-faded_gray">or use</span>
						<div class="border-faded_gray border-b h-1 w-4/12" />
					</div>
					<AuthProviders />
					<span class="text- w-full flex justify-center items-center text-icon_inactive mt-8 mb-5">
						Have an account?
						<router-link class="text-primary font-bold ml-2" to="/auth/signin">
							Sign In
						</router-link>
					</span>
				</div>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignup } from '@app/composable/auth/signin'
import { IonButton, IonInput } from '@ionic/vue'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import Auth from '@app/layouts/Auth.vue'

export default defineComponent({
	name: 'AuthSignup',
	displayName: 'Signup',
	components: { IonInput, IonButton, AuthProviders, Auth },
	middlewares: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, error, signup } = useEmailSignup()
		return { factory, loading, error, signup }
	}
})
</script>
