<template>
	<Modal :close="close">
		<template v-slot:title>
			Create a testPrep
		</template>
		<TestPrepForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createTestPrep"
		>
			<template v-slot:buttonText>
				Create TestPrep
			</template>
		</TestPrepForm>
	</Modal>
</template>

<script lang="ts" setup>
import TestPrepForm from '@app/components/study/testPreps/TestPrepForm.vue'
import { useCreateTestPrep } from '@app/composable/study/testPreps'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, createTestPrep } = useCreateTestPrep()
</script>
