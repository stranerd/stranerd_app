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

		<IonTextarea v-model="factory.content" class="flex-grow border-bottom-line" />

		<div class="flex items-center justify-center p-4 gap-12 text-xl text-secondaryText">
			<IonIcon :icon="imageOutline" />
			<IonIcon :icon="listOutline" />
			<IonIcon :icon="textOutline" />
			<IonIcon :icon="trashBinOutline" class="text-danger" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NoteFactory } from '@modules/study'
import { imageOutline, listOutline, textOutline, trashBinOutline } from 'ionicons/icons'

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
	},
	setup () {
		return { imageOutline, listOutline, textOutline, trashBinOutline }
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
