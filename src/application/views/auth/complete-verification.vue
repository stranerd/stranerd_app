<template>
	<Auth>
		<div class="w-full h-full flex">
			<div class="w-7/12 lg:flex flex-col items-center justify-center h-full hidden">
				<h1 class="text-5xl font-extrabold mb-12">Verify Email Address</h1>
				<img alt="" class="object-contain h-[65%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex flex-col items-center mt-6 md:justify-center lg:w-5/12 w-full p-4">
				<form class="h-[65%] w-full md:w-[70%] flex flex-col gap-4" @submit.prevent="completeVerification">
					<span class="text-heading2 font-bold text-center">Verifying Your Email Address</span>
					<span class="text-secondaryText text-center">
						If an error occurred, click the button below to retry verification.
					</span>
					<IonButton :disabled="loading" class="w-full text-sm btn-primary mt-2" type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Retry Verification</span>
					</IonButton>
					<div class="w-full flex justify-center items-center">
						<router-link class="text-primaryBg" to="/auth/signin">
							Back to Sign In
						</router-link>
					</div>
				</form>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCompleteEmailVerification } from '@app/composable/auth/signin'
import { useRoute } from 'vue-router'
import Auth from '@app/layouts/Auth.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'AuthCompleteVerification',
	displayName: 'Complete Verification',
	components: { Auth },
	beforeRouteEnter: generateMiddlewares(['hasQueryToken']),
	setup () {
		const { token } = useRoute().query
		const { loading, error, completeVerification } = useCompleteEmailVerification(token as string)
		return { loading, error, completeVerification }
	}
})
</script>
