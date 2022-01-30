<template>
	<div class="flex-col gap-1 gap-md-2">
		<ion-button class="w-full font-bold capitalize text-base flex gap-9 justify-center items-center my-6"
			@click="loginWithGoogle">
			<ion-icon :icon="logoGoogle" class="mr-4" size="100px" />
			<span>Google</span>
		</ion-button>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGoogleSignin } from '@app/composable/auth/signin'
import { IonButton, IonIcon } from '@ionic/vue'
import { logoGoogle } from 'ionicons/icons'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { isWeb } from '@utils/constants'

export default defineComponent({
	name: 'AuthProviders',
	components: { IonButton, IonIcon },
	setup () {
		const { loading, error, setError, signin } = useGoogleSignin()

		const loginWithGoogle = async () => {
			try {
				const googleUser = await GoogleAuth.signIn()
				const token = googleUser.authentication.idToken
				await GoogleAuth.signOut()
				await signin(token)
			} catch (error: any) {
				// eslint-disable-next-line no-console
				console.log(error)
				await setError('Error signing in with google')
			}
		}

		onMounted(async () => {
			if (isWeb) await GoogleAuth.init()
		})

		return { loading, error, logoGoogle, loginWithGoogle }
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: transparent !important;
		--color: #4D5C6F;
		--border-color: #8B9EB1;
		--border-style: solid;
		--border-width: 2px;
		--box-shadow: none;
	}
</style>
