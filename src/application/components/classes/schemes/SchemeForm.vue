<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex flex-col gap-2">
			<IonLabel class="font-bold">Course</IonLabel>
			<IonSelect v-model="factory.title" :disabled="disabled.title" class="capitalize"
				interface="action-sheet" placeholder="Select course">
				<IonSelectOption v-for="course in classInst.courses" :key="course" class="capitalize">
					{{ course }}
				</IonSelectOption>
			</IonSelect>
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel class="font-bold">Topic</IonLabel>
			<IonInput v-model="factory.topic"
				:class="{'valid': factory.isValid('topic'), 'invalid': factory.errors.topic}"
				:disabled="disabled.topic"
				placeholder="Enter topic"
				required
				show-cancel-button="never"
			/>
			<DisplayError :error="factory.errors.topic" />
		</div>

		<div class="flex gap-4">
			<div class="flex flex-col gap-2 w-full">
				<IonLabel class="font-bold">Start date</IonLabel>
				<IonInput v-model="factory.startTime"
					:class="{'valid': factory.isValid('start'), 'invalid': factory.errors.start}"
					:disabled="disabled.start"
					class="w-full flex-grow-0" placeholder="Select start date" required type="date" />
				<DisplayError :error="factory.errors.start" />
			</div>
			<div class="flex flex-col gap-2 w-full">
				<IonLabel class="font-bold">End date</IonLabel>
				<IonInput v-model="factory.endTime"
					:class="{'valid': factory.isValid('end'), 'invalid': factory.errors.end}"
					:disabled="disabled.end"
					:min="factory.startTime" class="w-full flex-grow-0" placeholder="Select end date" required
					type="date" />
				<DisplayError :error="factory.errors.end" />
			</div>
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ClassEntity, SchemeFactory } from '@modules/classes'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	},
	factory: {
		type: SchemeFactory,
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
	},
	disabled: {
		type: Object,
		required: false,
		default: () => ({})
	}
})
</script>
