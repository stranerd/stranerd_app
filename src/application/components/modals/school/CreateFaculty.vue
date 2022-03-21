<template>
	<Modal>
		<template v-slot:title>
			Create a faculty
		</template>
		<FacultyForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createFaculty"
		>
			<template v-slot:buttonText>
				Create Faculty
			</template>
		</FacultyForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FacultyForm from '@app/components/school/faculties/FacultyForm.vue'
import { useCreateFaculty } from '@app/composable/school/faculties'

export default defineComponent({
	name: 'CreateFacultyModal',
	components: { FacultyForm },
	setup () {
		const { factory, error, loading, createFaculty } = useCreateFaculty()
		return { factory, error, loading, createFaculty }
	}
})
</script>
