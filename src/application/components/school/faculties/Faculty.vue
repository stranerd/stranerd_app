<template>
	<span class="uppercase">
		<slot :faculty="faculty">
			{{ faculty?.name ?? '' }}
		</slot>
	</span>
</template>

<script lang="ts" setup>
import { useFaculty } from '@app/composable/school/faculties'

const props = defineProps({
	facultyId: {
		type: String,
		required: true
	},
	institutionId: {
		type: String,
		required: true
	}
})

const { faculty } = useFaculty(props.institutionId, props.facultyId)
</script>
