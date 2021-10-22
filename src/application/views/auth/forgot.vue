<template>
	<ion-page>
		<ion-content>
			<div class="w-full mt-10 h-full flex ">

				<div class="flex flex-col items-center justify-center w-full">
					<h1 class="text-xl text-dark_gray font-bold mb-2 ">Forgot Password</h1>
					<span class="normalText text-dark_gray mb-4">Enter your email to reset your password</span>
					<div class="h-[65%]">
						<form >
							<ion-input placeholder="Email Address" type="email" position="floating" :size="24" v-model="factory.email"></ion-input>
							<ion-input placeholder="Password" position="floating" type="password" :size="24" v-model="factory.password"></ion-input>
							<ion-button  class="w-full mb-4" @click="signin">RESET PASSWORD <ion-spinner name="lines-small" v-if="loading"></ion-spinner></ion-button>
						</form>
			

			
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
	
</template>

<script lang="ts">
import { defineComponent,  } from 'vue'
import { useEmailSignin } from '@/application/composable/auth/signin'
import { IonContent, IonPage, IonInput,IonButton,  IonSpinner } from '@ionic/vue'



export default defineComponent({
	components: { IonContent,IonPage,IonInput,IonButton, IonSpinner,  },
	layout:'Auth',
	  setup() {
	

		const { factory, loading, error, signin } = useEmailSignin()

	
		return {   factory, loading, error, signin }
	},



})
</script>

<style lang="scss" scoped>
ion-checkbox{
	--size:20px;
}
ion-input{
	--background: #F7F7FC !important;
	--padding-start: 1.8rem !important;
	--padding-end: 1.5rem !important;
	--padding-top: .69rem !important;
	--padding-bottom: .69rem !important;
	--color: $color-dark !important;
	--placeholder-color: $color-dark !important;
	border-radius: 10px;
	margin-bottom: 1.25rem;
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