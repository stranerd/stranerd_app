<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<IonTextarea v-model="factory.body"
			:class="{'valid': factory.isValid('body'), 'invalid': factory.errors.body}"
			placeholder="Write announcement" row="3" />

		<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full md:w-auto" type="submit">
			<slot name="buttonText">Submit</slot>
			<IonRippleEffect class="rounded-lg" />
		</IonButton>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnnouncementFactory } from '@modules/classes'

export default defineComponent({
	name: 'AnnouncementForm',
	props: {
		factory: {
			type: AnnouncementFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	}
})
</script>
