<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">

				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="text-xl text-dark_gray font-bold mb-2 ">Forgot Password</h1>
					<span class="normalText text-dark_gray mb-4">Enter your email to reset your password</span>
					<div class="h-[65%]">
						<form >
							<div class="mb-4">
								<ion-input placeholder="Email Address" type="email" position="floating" :size="24" v-model="factory.email" required></ion-input>
								<span class="normalText text-red-500 font-semibold">{{ factory.errors.email }}</span>
							</div>
							
							<ion-button  class="w-full mb-4" @click="sendResetEmail">RESET PASSWORD <ion-spinner name="lines-small" v-if="loading"></ion-spinner></ion-button>
						</form>
					</div>
				</div>

				<router-link  to="/auth/signin" class="text-primary font-bold normalText mt-8">
					Back to Sign In
				</router-link>
			</div>
		</ion-content>
	</ion-page>
	
</template>

<script lang="ts">
import { defineComponent,  } from 'vue'
import { usePasswordResetRequest } from '@/application/composable/auth/passwords'
import { IonContent, IonPage, IonInput,IonButton,  IonSpinner } from '@ionic/vue'



export default defineComponent({
	components: { IonContent,IonPage,IonInput,IonButton, IonSpinner,  },
	layout:'Auth',
	  setup() {
	

		const { factory, loading, error, sendResetEmail, message } = usePasswordResetRequest()

	
		return {   factory, loading, error, sendResetEmail, message }
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