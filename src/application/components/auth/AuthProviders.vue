<template>
	<div class="d-flex flex-column gap-1 gap-md-2">
		<ion-button v-g-auth
			class="w-full font-bold capitalize text-base flex gap-9 justify-center items-center my-6">
			<ion-icon :icon="logoGoogle" class="mr-4" size="100px" />
			<span>Google</span>
		</ion-button>

		<page-loading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGoogleSignin } from '@app/composable/auth/signin'
import { IonButton, IonIcon } from '@ionic/vue'
import { logoGoogle } from 'ionicons/icons'
import PageLoading from '../core/PageLoading.vue'

export default defineComponent({
	components: {
		IonButton, IonIcon, PageLoading
	},
	setup () {

		const { loading } = useGoogleSignin()
		return { loading, logoGoogle }
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
