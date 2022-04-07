<template>
	<span class="uppercase">
		<slot :faculty="faculty">
			{{ faculty?.name ?? '' }}
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFaculty } from '@app/composable/school/faculties'

export default defineComponent({
	name: 'faculty',
	props: {
		facultyId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { faculty } = useFaculty(props.facultyId)
		return { faculty }
	}
})
</script>
