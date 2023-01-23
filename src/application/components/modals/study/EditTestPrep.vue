<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit a testPrep
		</template>
		<TestPrepForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editTestPrep"
		>
			<template v-slot:buttonText>
				Update TestPrep
			</template>
		</TestPrepForm>
	</Modal>
</template>

<script lang="ts" setup>
import TestPrepForm from '@app/components/study/testPreps/TestPrepForm.vue'
import { useEditTestPrep } from '@app/composable/study/testPreps'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, editTestPrep } = useEditTestPrep()
</script>
