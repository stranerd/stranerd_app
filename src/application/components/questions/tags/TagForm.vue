<template>
	<form class="flex flex-col gap-4" @submit.prevent="submit">
		<IonInput
			v-model="factory.title"
			:class="{'valid': factory.isValid('title'), 'invalid': factory.errors.title}"
			class="w-full"
			placeholder="Title of Tag"
		/>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TagFactory } from '@modules/questions'

export default defineComponent({
	name: 'TagForm',
	props: {
		factory: {
			type: Object as PropType<TagFactory>,
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
