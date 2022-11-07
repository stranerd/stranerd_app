<template>
	<AuthLayout>
		<form class="flex flex-col lg:w-6/12 sm:w-8/12 w-full p-4 mx-auto pt-8 gap-5" @submit.prevent="signin">
			<h1 class="md:text-3xl text-2xl w-full font-bold md:text-center">
				Sign in
			</h1>

			<AuthProviders />

			<div class="flex justify-between items-center gap-2 my-2">
				<div class="border-itemBg border-b h-1 flex-1" />
				<span class="text-primaryBg leading-none">OR</span>
				<div class="border-itemBg border-b h-1 flex-1" />
			</div>

			<div class="flex flex-col w-full">
				<IonLabel class="text-secondaryText mb-2">Email</IonLabel>
				<IonInput v-model.trim="factory.email"
					:class="{'valid': factory.isValid('email'), 'invalid': factory.errors.email}"
					:size="24"
					inputmode="email" placeholder="Enter your email" position="floating" type="email" />
				<DisplayError :error="factory.errors.email" />
			</div>

			<div class="flex flex-col">
				<IonLabel class="text-secondaryText mb-2">Password</IonLabel>
				<IonInput v-model="factory.password"
					:class="{'valid': factory.isValid('password'), 'invalid': factory.errors.password}"
					:size="24"
					placeholder="Enter your password" position="floating" type="password" />
				<DisplayError :error="factory.errors.password" />
			</div>

			<router-link class="mx-auto text-primaryBg text-sm" to="/auth/forgot">
				Forgot your password?
			</router-link>

			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
				<SpinLoading v-if="loading" />
				<span v-else>Sign in</span>
			</IonButton>

			<span class="w-full flex justify-center items-center text-secondaryText text-sm">
				Don’t have an account?
				<router-link class="text-primaryBg ml-1" to="/auth/signup">
					Create account
				</router-link>
			</span>
		</form>
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
