<template>
	<Modal :close="close" class="h-screen md:h-auto">
		<template v-slot:title>
			Set up Scheme
		</template>
		<SchemeForm :classInst="schemeClass" :error="error" :factory="factory" :loading="loading"
			:submit="createScheme">
			<template v-slot:buttonText>Add</template>
		</SchemeForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useCreateScheme } from '@app/composable/classes/schemes'
import SchemeForm from '@app/components/classes/schemes/SchemeForm.vue'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, schemeClass, createScheme } = useCreateScheme()
</script>
