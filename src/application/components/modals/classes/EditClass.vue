<template>
	<Modal :noPaddingX="true">
		<template v-slot:title>
			Edit Class
		</template>
		<ClassForm :error="error" :factory="factory" :loading="loading" :submit="editClass">
			<template v-slot:buttonText>Update class</template>
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
