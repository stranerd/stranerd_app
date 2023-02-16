<template>
	<div class="w-full h-auto flex bg-primaryText py-6">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<span class="md:text-2xl text-xl font-bold text-bodyText">About the contest</span>
				<p class="md:text-lg text-sm text-bodyText">
					To enter the Flashcard Contest, fill the form and read all of the contest guidelines below.
				</p>
			</div>
			<div class=" md:w-1/2 shadow-lg bg-primaryText rounded-2xl lg:p-8">
				<form class="flex flex-col gap-4" @submit.prevent="createMessage">

					<div class="flex flex-col md:flex-row w-full gap-4">
						<div class="flex flex-col md:w-1/2">
							<IonLabel class="font-bold mb-2">Email</IonLabel>
							<IonInput :size="24" class="flex-grow-0" position="floating" type="email" />
						</div>
						<div class="flex flex-col md:w-1/2">
							<IonLabel class="font-bold mb-2">Phone</IonLabel>
							<PhoneInput v-model:value="factory.phone" class="flex-grow-0" />
						</div>
					</div>
					<div class="flex flex-col md:flex-row w-full gap-4">
						<div class="flex flex-col md:w-1/2">
							<IonLabel class="font-bold mb-2">Instagram</IonLabel>
							<IonInput :size="24" class="flex-grow-0" inputmode="email" position="floating"
								type="text" />
						</div>
						<div class="flex flex-col md:w-1/2">
							<IonLabel class="font-bold mb-2">Twitter</IonLabel>
							<IonInput :size="24" class="flex-grow-0" position="floating" type="text" />
						</div>
					</div>

					<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary h-12 mt-2 "
						type="submit">
						<SpinLoading v-if="loading" />
						<span>Send</span>
					</IonButton>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useCreateMessage } from '@app/composable/meta/messages'

const { countries, factory, loading, error, createMessage } = useCreateMessage()
</script>
