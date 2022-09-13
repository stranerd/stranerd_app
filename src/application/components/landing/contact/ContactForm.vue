<template>
	<form class="flex flex-col gap-4" @submit.prevent="createMessage">
		<div class="flex flex-col">
			<IonLabel class="font-bold mb-2">Who are you?</IonLabel>
			<IonSelect v-model="factory.type"
				interface="action-sheet" placeholder="Please Select" position="floating">
				<IonSelectOption :value="MessageType.student">Student</IonSelectOption>
				<IonSelectOption :value="MessageType.school">School</IonSelectOption>
			</IonSelect>
		</div>
		<template v-if="factory.type">
			<div class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">First Name</IonLabel>
					<IonInput v-model="factory.firstName"
						:size="24" class="flex-grow-0" position="floating" type="text" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Last Name</IonLabel>
					<IonInput v-model="factory.lastName"
						:size="24" class="flex-grow-0" position="floating" type="text" />
				</div>
			</div>
			<div class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Email</IonLabel>
					<IonInput v-model="factory.email"
						:size="24" class="flex-grow-0" inputmode="email"
						position="floating" type="email" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Phone</IonLabel>
					<IonInput v-model="factory.phone"
						:size="24" class="flex-grow-0" position="floating" type="number" />
				</div>
			</div>

			<div v-if="factory.isSchoolType" class="flex w-full gap-4">
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">School Name</IonLabel>
					<IonInput v-model="factory.school" :size="24" class="flex-grow-0" position="floating" type="text" />
				</div>
				<div class="flex flex-col w-1/2">
					<IonLabel class="font-bold mb-2">Position</IonLabel>
					<IonInput v-model="factory.position"
						:size="24" class="flex-grow-0"
						placeholder="e.g Vice Chancellor" position="floating" type="text" />
				</div>
			</div>

			<div class="flex flex-col">
				<IonLabel class="font-bold mb-2">Country</IonLabel>
				<IonSelect v-model="factory.country"
					:size="24" interface="action-sheet" placeholder="Please Select">
					<IonSelectOption v-for="country in countries" :key="country.name" :value="country.name">
						{{ country.name }}
					</IonSelectOption>
				</IonSelect>
			</div>

			<div class="flex flex-col">
				<IonLabel class="font-bold mb-2">Message</IonLabel>
				<IonTextarea v-model="factory.message" />
			</div>

			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary h-12 mt-2 " type="submit">
				<SpinLoading v-if="loading" />
				<span>Send</span>
			</IonButton>
		</template>
	</form>
</template>

<script lang="ts" setup>
import { useCreateMessage } from '@app/composable/meta/messages'
import { MessageType } from '@modules/meta'

const { countries, factory, loading, error, createMessage } = useCreateMessage()
</script>
