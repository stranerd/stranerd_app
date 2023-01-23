<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="w-full rounded-md flex items-center px-4">
			<IonText class="font-bold w-12">
				TITLE
			</IonText>
			<IonInput v-model="factory.name"
				class="max-w-[1054px] !h-14 text-left"
				placeholder="Enter folder name”"
				show-cancel-button="never"
			/>
		</div>

		<div class="flex gap-4 w-full">
			<IonButton class="btn-outline flex-grow w-full" @click="closeModal">
				Cancel
			</IonButton>
			<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full flex-grow" type="submit">
				<slot name="buttonText">Save Set</slot>
			</IonButton>
		</div>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { SetFactory } from '@modules/study'
import { useStudyModal } from '@app/composable/core/modals'

defineProps({
	factory: {
		type: SetFactory,
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
})

const closeModal = () => {
	useStudyModal().closeAll()
}
</script>
