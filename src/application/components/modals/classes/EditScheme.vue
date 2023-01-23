<template>
	<Modal :close="close" class="h-screen md:h-auto">
		<template v-slot:title>
			Edit Scheme
		</template>
		<SchemeForm :classInst="schemeClass" :disabled="{ title: true }" :error="error" :factory="factory"
			:loading="loading"
			:submit="editScheme">
			<template v-slot:buttonText>Save</template>
		</SchemeForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useEditScheme } from '@app/composable/classes/schemes'
import SchemeForm from '@app/components/classes/schemes/SchemeForm.vue'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, schemeClass, editScheme } = useEditScheme()
</script>
