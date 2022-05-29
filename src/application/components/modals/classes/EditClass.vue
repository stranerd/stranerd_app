<template>
	<Modal class="h-screen md:h-auto">
		<template v-slot:title>
			Edit class info
		</template>
		<ClassForm :disabled="{ departmentId: true, facultyId: true, institutionId: true }" :error="error"
			:factory="factory"
			:loading="loading" :submit="editClass">
			<template v-slot:buttonText>Save</template>
		</ClassForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditClass } from '@app/composable/classes/classes'
import ClassForm from '@app/components/classes/classes/ClassForm.vue'

export default defineComponent({
	name: 'EditClassModal',
	components: { ClassForm },
	setup () {
		const { editClass, factory, error, loading } = useEditClass()
		return { error, loading, editClass, factory }
	}
})
</script>
