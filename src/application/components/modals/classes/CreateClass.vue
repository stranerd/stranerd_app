<template>
	<Modal>
		<template v-slot:title>
			Create a class
		</template>
		<ClassForm :error="error" :factory="factory" :loading="loading" :submit="createSet">
			<template v-slot:buttonText>Create Class</template>
		</ClassForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateSet } from '@app/composable/study/sets'
import ClassForm from '@app/components/classes/ClassForm.vue'

export default defineComponent({
	name: 'CreateClassModal',
	components: { ClassForm },
	setup () {
		const { createSet, factory, error, loading } = useCreateSet()
		return { error, loading, createSet, factory }
	}
})
</script>
