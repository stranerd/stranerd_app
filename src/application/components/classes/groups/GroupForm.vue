<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div v-if="!disabled.classId" class="flex flex-col gap-2">
			<IonLabel>Class</IonLabel>
			<IonSelect v-model="factory.classId" :disabled="disabled.classId"
				class="capitalize" interface="action-sheet" placeholder="Select the class" required>
				<IonSelectOption v-for="classInst in adminClasses" :key="classInst.hash" :value="classInst.id"
					class="capitalize">
					{{ classInst.name }}
				</IonSelectOption>
			</IonSelect>
			<DisplayError :error="factory.errors.classId" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Title</IonLabel>
			<IonInput v-model="factory.name"
				:class="{'valid': factory.isValid('name'), 'invalid': factory.errors.name}"
				placeholder="Enter title" row="3" />
			<DisplayError :error="factory.errors.name" />
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
import { useClassList } from '@app/composable/classes/classes'

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
		},
		disabled: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	setup () {
		const { adminClasses } = useClassList()
		return { adminClasses }
	}
})
</script>
