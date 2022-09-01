

<template>
	<div class="studentForm">
		<form class="flex flex-col gap-4 mt-4" @submit.prevent="signup">
			<div class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">First Name</IonLabel>
					<IonInput
						:size="24" class="flex-grow-0" position="floating" type="text" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Last Name</IonLabel>
					<IonInput
						:size="24" class="flex-grow-0" position="floating" type="text" />
				</div>
			</div>
			<div class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Email</IonLabel>
					<IonInput
						:size="24" class="flex-grow-0" inputmode="email"
						position="floating" type="email" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Phone</IonLabel>
					<IonInput
						:size="24" class="flex-grow-0" position="floating" type="number" />
				</div>
			</div>
            
			<div class="flex flex-col">
				<IonLabel class="font-bold mb-2">Country</IonLabel>
				<IonSelect
					:size="24" placeholder="Please Select" position="floating">
					<ion-select-option value="nigeria">Nigeria</ion-select-option>
				</IonSelect>
			</div>
            
			<div class="flex flex-col">
				<IonLabel class="font-bold mb-2">Message</IonLabel>
				<IonTextarea></IonTextarea>
			</div>
            
			<IonButton :disabled="false" class="w-full btn-primary h-12 mt-2 " type="submit">
				<SpinLoading v-if="false" />
				<span v-else>Send</span>
			</IonButton>

            
		</form>
	</div>
</template>

<script lang="ts" setup>
import { useEmailSignup } from '@app/composable/auth/signin'

const { factory, loading, error, signup } = useEmailSignup()
</script>

<style scoped>

</style>
