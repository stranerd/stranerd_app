<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit Study Folder
		</template>
		<SetForm :error="error" :factory="factory" :loading="loading" :submit="editSet">
			<template v-slot:buttonText>Update folder</template>
		</SetForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useEditSet } from '@app/composable/study/sets'
import SetForm from '@app/components/study/sets/SetForm.vue'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { editSet, factory, error, loading } = useEditSet()
</script>
