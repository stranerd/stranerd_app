<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex flex-col">
			<IonInput v-model="factory.name" placeholder="Enter title" show-cancel-button="never" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GroupFactory } from '@modules/classes'

export default defineComponent({
	name: 'GroupForm',
	props: {
		factory: {
			type: GroupFactory,
			required: true
		},
		submit: {
			type: Function as PropType<() => Promise<void>>,
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
