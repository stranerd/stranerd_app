<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit a faculty
		</template>
		<FacultyForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editFaculty"
		>
			<template v-slot:buttonText>
				Update Faculty
			</template>
		</FacultyForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FacultyForm from '@app/components/school/faculties/FacultyForm.vue'
import { useEditFaculty } from '@app/composable/school/faculties'

export default defineComponent({
	name: 'EditFacultyModal',
	components: { FacultyForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, editFaculty } = useEditFaculty()
		return { factory, error, loading, editFaculty }
	}
})
</script>
