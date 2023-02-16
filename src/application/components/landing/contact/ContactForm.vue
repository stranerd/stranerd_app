
<template>
	<form class="flex flex-col gap-4" @submit.prevent="createMessage">

		<div class="flex w-full gap-4">
			<div class="flex flex-col w-1/2">
				<IonLabel class="font-bold mb-2">First Name</IonLabel>
				<IonInput v-model="factory.firstName" :size="24" class="flex-grow-0" position="floating" type="text" />
			</div>
			<div class="flex flex-col w-1/2">
				<IonLabel class="font-bold mb-2">Last Name</IonLabel>
				<IonInput v-model="factory.lastName" :size="24" class="flex-grow-0" position="floating" type="text" />
			</div>
		</div>
		<div class="flex w-full gap-4">
			<div class="flex flex-col w-1/2">
				<IonLabel class="font-bold mb-2">Email</IonLabel>
				<IonInput v-model="factory.email" :size="24" class="flex-grow-0" inputmode="email" position="floating"
					type="email" />
			</div>
			<div class="flex flex-col w-1/2">
				<IonLabel class="font-bold mb-2">Phone</IonLabel>
				<PhoneInput v-model:value="factory.phone" class="flex-grow-0" />
			</div>
		</div>

		<div class="flex flex-col">
			<IonLabel class="font-bold mb-2">Subject</IonLabel>
			<IonInput :size="24" class="flex-grow-0" position="floating" type="text" />
		</div>

		<div class="flex flex-col">
			<IonLabel class="font-bold mb-2">Message</IonLabel>
			<IonTextarea v-model="factory.message" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary h-12 mt-2 " type="submit">
			<SpinLoading v-if="loading" />
			<span>Send</span>
		</IonButton>
	</form>
</template>

<script lang="ts" setup>
import { useCreateMessage } from '@app/composable/meta/messages'

const { countries, factory, loading, error, createMessage } = useCreateMessage()
</script>
