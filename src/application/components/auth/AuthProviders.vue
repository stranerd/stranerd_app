<template>
	<div class="flex flex-col gap-4">
		<IonButton :disabled="googleLoading" class="btn-outline w-full font-bold" @click="googleSignin">
			<div class="flex gap-2 items-center normal-case">
				<SpinLoading v-if="googleLoading" class="h-[1.25rem]" />
				<IonIcon v-else :icon="logoGoogle" class="text-[1.3rem]" />
				<span>Sign in with Google</span>
			</div>
		</IonButton>
		<IonButton v-if="showAppleSignin" :disabled="appleLoading" class="btn-outline w-full font-bold"
			@click="appleSignin">
			<span class="flex gap-2 items-center normal-case">
				<SpinLoading v-if="appleLoading" class="h-[1.25rem]" />
				<IonIcon v-else :icon="logoApple" class="text-[1.3rem]" />
				<span>Sign in with Apple</span>
			</span>
		</IonButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppleSignin, useGoogleSignin } from '@app/composable/auth/signin'
import { logoApple, logoGoogle } from 'ionicons/icons'
import { isIos, isWeb } from '@utils/constants'

export default defineComponent({
	name: 'AuthProviders',
	setup () {
		const { loading: googleLoading, signin: googleSignin } = useGoogleSignin()
		const { loading: appleLoading, signin: appleSignin } = useAppleSignin()
		const showAppleSignin = isWeb || isIos
		return { googleLoading, appleLoading, googleSignin, appleSignin, logoGoogle, logoApple, showAppleSignin }
	}
})
</script>
