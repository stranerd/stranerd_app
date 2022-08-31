<template>
	<AuthLayout>
		<div class="flex items-center justify-center">
			<div class="flex flex-col items-center justify-center  lg:w-6/12 sm:w-8/12 w-full p-4">
				<img alt="hero" class="mr-auto md:hidden mt-6" src="@/assets/images/auth/login.svg">
				<h1 class="md:block md:text-3xl text-2xl text-start w-full font-extrabold mb-8 md:mt-16 mt-8 md:text-center">
					Welcome back</h1>

				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="signin">
					<AuthProviders />
					<div class="flex justify-between  items-center my-4">
						<div class="border-faded_gray border-b h-1 w-4/12" />
						<span class="text-gray">Or sign in with </span>
						<div class="border-faded_gray border-b h-1 w-4/12" />
					</div>
					<div class="flex flex-col w-full">
						<IonLabel class="font-bold mb-2">Email</IonLabel>
						<IonInput v-model.trim="factory.email"
							:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
							:size="24"
							inputmode="email" placeholder="Email Address" position="floating" type="email" />
						<DisplayError :error="factory.errors.email" />
					</div>
					<div class="flex flex-col">
						<IonLabel class="font-bold mb-2">Password</IonLabel>
						<IonInput v-model="factory.password"
							:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
							:size="24"
							placeholder="Password" position="floating" type="password" />
						<DisplayError :error="factory.errors.password" />
					</div>
					<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary mt-2"
						type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Log in</span>
					</IonButton>
					<div class="w-full flex justify-center items-center mt-2">
						<router-link class="text-primaryBg" to="/auth/forgot">
							Forgot Password?
						</router-link>
					</div>

					<span class="w-full flex justify-center items-center text-secondaryText mt-2">
						Don’t have an account?
						<router-link class="text-primaryBg font-bold ml-1" to="/auth/signup">
							Create account
						</router-link>
					</span>
				</form>
			</div>
		</div>
	</AuthLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmailSignin } from '@app/composable/auth/signin'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AuthSignin',
	components: { AuthProviders },
	beforeRouteEnter: generateMiddlewares(['isNotAuthenticated']),
	setup () {
		useRouteMeta('Signin', { back: true })
		const { factory, loading, error, signin } = useEmailSignin()
		return { factory, loading, error, signin }
	}
})
</script>
