<template>
	<form class="flex flex-col" @submit.prevent="submit">
		<IonSelect v-model="factory.isPrivate" class="capitalize" interface="action-sheet" placeholder="Privacy">
			<IonSelectOption v-for="{ key, value } in [
				{ key: 'Public', value: false },
				{ key: 'Private', value: true }
			]" :key="key" :value="value" class="capitalize" style="--border-radius: 0;">
				{{ key }}
			</IonSelectOption>
		</IonSelect>

		<div class="border-bottom-line">
			<IonInput v-model="factory.title" placeholder="Title" style="--background: transparent;" />
		</div>

		<IonTextarea v-model="factory.content" class="flex-1 border-bottom-line" />

		<div class="p-4 lg:p-0">
			<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full" @click="submit()">
				<SpinLoading v-if="loading" />
				<slot v-else name="buttonTitle">Submit</slot>
			</IonButton>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NoteFactory } from '@modules/study'

export default defineComponent({
	name: 'NoteForm',
	props: {
		factory: {
			type: NoteFactory,
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

<style lang="scss" scoped>
ion-input, ion-select, ion-textarea {
	border-radius: 0;

	&:focus-within {
		outline-color: transparent !important;
	}
}

ion-input, ion-textarea {
	--background: transparent !important;

	background: transparent !important;

	--padding-top: 1.5rem !important;
	--padding-bottom: 1.5rem !important;
}
</style>
