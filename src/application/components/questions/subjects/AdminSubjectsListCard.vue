<template>
	<div
		class="flex items-center justify-between w-full bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6">
		<div class="w-8/12 flex items-center gap-2">
			<ion-text>{{ subject.name }}</ion-text>
		</div>
		<a class="w-3/12 font-bold text-right text-delete_red" @click.prevent="deleteSubject">Delete</a>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SubjectEntity } from '@modules/questions'
import { useDeleteSubject } from '@app/composable/questions/subjects'

export default defineComponent({
	name: 'AdminSubjectsListCard',
	props: {
		subject: {
			type: Object as PropType<SubjectEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deleteSubject } = useDeleteSubject(props.subject)
		return { loading, error, deleteSubject }
	}
})
</script>
