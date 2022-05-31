<template>
	<Modal class="h-screen md:h-auto">
		<template v-slot:title>
			Create a class
		</template>
		<ClassForm :error="error" :factory="factory" :loading="loading" :submit="createClass">
			<template v-slot:buttonText>Create Class</template>
		</ClassForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateClass } from '@app/composable/classes/classes'
import ClassForm from '@app/components/classes/classes/ClassForm.vue'

export default defineComponent({
	name: 'CreateClassModal',
	components: { ClassForm },
	setup () {
		const { createClass, factory, error, loading } = useCreateClass()
		return { error, loading, createClass, factory }
	}
})
</script>
