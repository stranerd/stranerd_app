<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex flex-col gap-2">
			<IonLabel>Name</IonLabel>
			<IonInput v-model="factory.name" :disabled="disabled.name" placeholder="Enter Department Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Tag</IonLabel>
			<IonSelect v-model="factory.tagId" :disabled="disabled.tagId" class="capitalize w-full"
				interface="action-sheet" placeholder="Select tag">
				<IonSelectOption v-for="tag in departmentTags" :key="tag.hash" :value="tag.id" class="capitalize">
					{{ tag.title }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DepartmentFactory } from '@modules/school'
import { useTagList } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'DepartmentForm',
	props: {
		factory: {
			type: DepartmentFactory,
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
		const { departmentTags } = useTagList()
		return { departmentTags }
	}
})
</script>
