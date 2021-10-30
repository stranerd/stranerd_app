<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex flex-col items-center justify-start ">

				<div class="flex flex-col items-center justify-center p-10 lg:bg-light_gray mt-20">
					<h1 class="lg:text-2xl text-xl text-dark_gray font-bold mb-2 text-center">Verify Your Email Address</h1>
					<span class="normalText text-dark_gray mb-4 text-center max-w-lg">
						An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
						If an error occurred or you didn't receive the email, click the button below to resend the email.
					</span>
					<div class="h-[65%]">
						<form >
					
							
							<ion-button  class="w-full mb-4 uppercase" @click="sendVerificationEmail">Resend Mail <ion-spinner name="lines-small" v-if="loading"></ion-spinner></ion-button>
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
import { defineComponent, onMounted  } from 'vue'
import { useEmailVerificationRequest } from '@/application/composable/auth/signin'
import { IonContent, IonPage, IonButton,  IonSpinner } from '@ionic/vue'
import isAuthenticated from '@/application/middlewares/isAuthenticated'



export default defineComponent({
	components: { IonContent,IonPage,IonButton, IonSpinner,  },
	layout:'Auth',
	middlewares:[isAuthenticated],
	  setup() {
		const { email, loading, error, message, sendVerificationEmail } = useEmailVerificationRequest()
		onMounted(sendVerificationEmail)
	
		return { email, loading, error, message, sendVerificationEmail }
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