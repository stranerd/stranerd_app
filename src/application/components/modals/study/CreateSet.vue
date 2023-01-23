<template>
	<Modal :close="close">
		<template v-slot:title>
			Create Study Folder
		</template>
		<SetForm :error="error" :factory="factory" :loading="loading" :submit="createSet">
			<template v-slot:buttonText>Create Folder</template>
		</SetForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useCreateSet } from '@app/composable/study/sets'
import SetForm from '@app/components/study/sets/SetForm.vue'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { createSet, factory, error, loading } = useCreateSet()
</script>
