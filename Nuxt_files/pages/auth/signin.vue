<template>
	<div class="gap-1 gap-md-2 flex flex-col">
		<form class="gap-1 gap-md-2 flex flex-col" @submit.prevent="signin">
			<Heading class="text-center" variant="1">
				Sign In
			</Heading>
			<div>
				<input
					id="email"
					v-model="factory.email"
					autocomplete="email"
					class="form-control"
					name="email"
					placeholder="Email"
					required
					type="email"
				>
				<DynamicText v-if="factory.errors.email" class="small text-danger d-block">
					{{ factory.errors.email }}
				</DynamicText>
			</div>
			<div>
				<input
					id="password"
					v-model="factory.password"
					autocomplete="password"
					class="form-control"
					name="password"
					placeholder="Password"
					required
					type="password"
				>
				<DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText>
				<div class="text-end mt-1">
					<NuxtLink class="linkText text-decoration-none" to="/auth/forgot">
						Forgot Password
					</NuxtLink>
				</div>
			</div>
			<button :disabled="loading || !factory.valid" class="btn btn-lg btn-custom py-1" type="submit">
				Sign In
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
		<div class="flex gap-1 items-center">
			<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
			<span>or sign in with</span>
			<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
		</div>
		<AuthProviders />
		<div class="flex items-center justify-center gap-0-25">
			<span>Not a member yet?</span>
			<NuxtLink class="linkText" to="/auth/signup">
				Sign Up
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthProviders from '@/application/components/auth/AuthProviders.vue'
import { usePassword } from '@/application/hooks/core/forms'
import { useEmailSignin } from '@/application/hooks/auth/signin'

export default defineComponent({
	name: 'AuthSigninPage',
	components: { AuthProviders },
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { show, toggle } = usePassword()
		const { loading, signin, factory, error } = useEmailSignin()
		// useMeta(() => ({
		// 	title: 'Sign in for Stranerd'
		// }))
		return { show, toggle, factory, loading, error, signin }
	},
	head: {}
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-sub;
		border-radius: 6px;
		color: $color-sub;
		padding: 1rem;
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}

	.linkText {
		color: $color-primary;
		text-decoration: underline;
		font-weight: bold;
	}
</style>
