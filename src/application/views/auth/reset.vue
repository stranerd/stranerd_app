<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">

				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="text-xl text-dark_gray font-bold mb-2 ">Reset Password</h1>
					<span class="normalText text-dark_gray mb-4">To reset your password, type your new password below and reset</span>
					<div class="h-[65%]">
						<form
							@submit.prevent="resetPassword"
						>
							<div class="mb-4">
								<ion-input placeholder="New Password" type="email" position="floating" :size="24" v-model="factory.password" required></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.email }}</span>
							</div>
							<div class="mb-4">
								<ion-input placeholder="Confirm New Password" type="email" position="floating" :size="24" v-model="factory.cPassword" required></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.email }}</span>
							</div>
							
							<ion-button type="submit"  class="w-full mb-4" >RESET PASSWORD <ion-spinner name="lines-small" v-if="loading"></ion-spinner></ion-button>
						</form>
					</div>
				</div>

				<router-link  to="/auth/signin" class="text-primary font-bold normalText mt-8">
					Back to Sign In
				</router-link>
			</div>

			<page-loading v-if="loading"/>
		</ion-content>
	</ion-page>
	
</template>

<script lang="ts">
import { defineComponent,  } from 'vue'
import { usePasswordReset } from '@/application/composable/auth/passwords'
import { IonContent, IonPage, IonInput,IonButton,  IonSpinner } from '@ionic/vue'
import PageLoading from '@/application/components/core/PageLoading.vue'
import {  useRoute } from 'vue-router'



export default defineComponent({
	components: { IonContent,IonPage,IonInput,IonButton, IonSpinner, PageLoading,  },
	layout:'Auth',
    	middlewares: [(data: any) => {
		const  { to,  from, next } = data
		
		if (!useRoute()?.query?.token) next({ path: '/auth/signin' })
	}],
	  setup() {
		const { token } = useRoute().query
		const { factory, loading, resetPassword, error, message } = usePasswordReset(token as string)

	
		return { factory, loading, resetPassword, error, message }
	},



})
</script>

<style lang="scss" scoped>
ion-checkbox{
	--size:20px;
}
ion-input{
	--background: #fff !important;
	--padding-start: 1.8rem !important;
	--padding-end: 1.5rem !important;
	--padding-top: .69rem !important;
	--padding-bottom: .69rem !important;
	--color: $color-dark !important;
	--placeholder-color: $color-dark !important;
	border-radius: 10px;

	@media screen and (max-width:1024px) {
		--background: #F7F7FC !important;
	}
}



	ion-button{
    --background: #546DD3;
    --border-radius: .4rem;
    --color: white;
    --background-hover: white;
	--padding-top: 1rem;
	--padding-bottom: 1rem;
	height: 2.75rem;
	transition: all .5s ease-in-out;

}

</style>