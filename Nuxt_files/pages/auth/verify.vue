<template>
	<div class="gap-1 gap-md-2 flex flex-col">
		<Heading class="text-center" variant="1">
			Verify Your Email Address
		</Heading>
		<span class="textStyle text-center">
			An email was just sent to <b><DynamicText>{{ email }}</DynamicText></b>. Follow the link to verify your account.
			If an error occurred or you didn't receive the email, click the button below to resend the email.
		</span>
		<button class="btn btn-lg btn-custom py-1 " @click="sendVerificationEmail">
			Resend Mail
		</button>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
		<div class="flex align-items-center justify-content-center gap-0-25">
			<span>Return to</span>
			<NuxtLink class="linkText" to="/auth/signin">
				Sign In
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// import { useAuth } from '@/application/hooks/auth/auth'
import { useEmailVerificationRequest } from '@/application/hooks/auth/signin'

export default defineComponent({
	name: 'AuthVerifyPage',
	layout: 'auth',
	middleware: [
		// ({ redirect }) => {
		// 	const { auth } = useAuth()
		// 	if (!auth.value) redirect('/auth/signin')
		// }
	],
	setup () {
		const { email, loading, error, message, sendVerificationEmail } = useEmailVerificationRequest()
		onMounted(sendVerificationEmail)
		// useMeta(() => ({
		// 	title: 'Email Verification | Stranerd'
		// }))
		return { email, loading, error, message, sendVerificationEmail }
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
