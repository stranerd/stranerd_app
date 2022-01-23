<template>
	<div class="flex-column gap-1 gap-md-2">
		<ion-button v-if="Vue3GoogleOauth.isInit"
			class="w-full font-bold capitalize text-base flex gap-9 justify-center items-center my-6"
			@click="loginWithGoogle">
			<ion-icon :icon="logoGoogle" class="mr-4" size="100px" />
			<span>Google</span>
		</ion-button>
		<page-loading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from 'vue'
import { useGoogleSignin } from '@app/composable/auth/signin'
import { IonButton, IonIcon } from '@ionic/vue'
import { logoGoogle } from 'ionicons/icons'
import PageLoading from '../core/PageLoading.vue'

export default defineComponent({
	name: 'AuthProviders',
	components: { IonButton, IonIcon, PageLoading },
	setup () {
		const { loading, error, setError, signin } = useGoogleSignin()
		const app = getCurrentInstance()
		const Vue3GoogleOauth = inject('Vue3GoogleOauth')

		const loginWithGoogle = async () => {
			try {
				const googleUser = await app!.appContext.config.globalProperties.$gAuth.signIn()
				const token = googleUser.getAuthResponse().id_token
				googleUser.disconnect()
				await signin(token)
			} catch (error: any) {
				await setError(error.message ?? 'Error signing in with google')
			}
		}

		return { loading, error, logoGoogle, loginWithGoogle, Vue3GoogleOauth }
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
