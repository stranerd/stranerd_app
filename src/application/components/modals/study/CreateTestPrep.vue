<template>
	<Modal>
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

<script lang="ts">
import { defineComponent } from 'vue'
import TestPrepForm from '@app/components/study/testPreps/TestPrepForm.vue'
import { useCreateTestPrep } from '@app/composable/study/testPreps'

export default defineComponent({
	name: 'CreateTestPrepModal',
	components: { TestPrepForm },
	setup () {
		const { factory, error, loading, createTestPrep } = useCreateTestPrep()
		return { factory, error, loading, createTestPrep }
	}
})
</script>
