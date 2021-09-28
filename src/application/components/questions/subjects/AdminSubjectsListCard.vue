<template>
	<div :id="subject.id" class="wrapper">
		<div class="p-1 d-flex flex-row align-items-center">
			<DynamicText class="subject-custom">
				{{ subject.name }}
			</DynamicText>
			<span class="ms-auto text-danger" style="font-size: 14px;" @click.prevent="deleteSubject">
				Delete
			</span>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SubjectEntity } from '@modules/questions'
import { useDeleteSubject } from '@app/hooks/questions/subjects'

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
<style lang="scss" scoped>
	.subject-custom {
		font-weight: bold;
		font-size: 17px;
		color: $color-dark;
	}

	.wrapper {
		border: 1px solid $color-line;
		border-radius: 5px;
		background-color: $color-tags;
	}
</style>
