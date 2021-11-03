<template>
	<div class="d-flex flex-column gap-1 gap-md-2">
		<ion-button class="w-full font-bold capitalize text-base flex gap-9 justify-center items-center my-6"
					@click="onSuccess">
			<ion-icon :icon="logoGoogle" class="mr-4" size="100px" />
			<span>Google</span>
		</ion-button>
		<!-- <GoogleLogin
			:on-failure="onFailure"
			:on-success="onSuccess"
			class="btn btn-auth"
		>
			
			<span>Google</span>
		</GoogleLogin> -->
		<!-- <DisplayError :error="googleError" /> -->
		<!-- <PageLoading v-if="googleLoading" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGoogleSignin } from '@/application/composable/auth/signin'
import { IonButton, IonIcon } from '@ionic/vue'
import { logoGoogle } from 'ionicons/icons'

export default defineComponent({
	components: {
		IonButton, IonIcon
	},
	setup () {
		const { loading: googleLoading, signin: googleSignin, error: googleError, setError } = useGoogleSignin()
		const onFailure = async (_: any) => await setError('Error signing in with google')
		const onSuccess = async (data: any) => await googleSignin(data.getAuthResponse().id_token)
		return { googleError, googleLoading, onSuccess, onFailure, logoGoogle }
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: transparent !important;
		--border-radius: .4rem;
		--color: #4D5C6F;
		--background-hover: white;
		--padding-top: 1rem;
		--padding-bottom: 1rem;
		height: 2.75rem;
		transition: all .5s ease-in-out;
		--border-color: #8B9EB1;
		--border-style: solid;
		--border-width: 2px;
		--box-shadow: none;

	}


</style>
