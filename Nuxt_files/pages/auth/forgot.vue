<template>
	<div class="gap-1 gap-md-2 flex flex-col">
		<form class="gap-1 gap-md-2 flex flex-col" @submit.prevent="sendResetEmail">
			<Heading class="text-center" variant="1">
				Forgot Your Password?
			</Heading>
			<span class="textStyle text-center">
				To reset your password, type your email address
			</span>
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
			<button :disabled="loading || !factory.valid" class="btn btn-lg btn-custom py-1" type="submit">
				Send Reset Mail
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
		<div class="flex items-center justify-center gap-0-25">
			<span>Return to</span>
			<NuxtLink class="linkText" to="/auth/signin">
				Sign In
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordResetRequest } from '@/application/hooks/auth/passwords'

export default defineComponent({
	name: 'AuthForgotPage',
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, sendResetEmail, error, message } = usePasswordResetRequest()
		// useMeta(() => ({
		// 	title: 'Forgot Password | Stranerd'
		// }))
		return { factory, loading, sendResetEmail, error, message }
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
