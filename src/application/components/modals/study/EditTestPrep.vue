<template>
	<Modal>
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

<script lang="ts">
import { defineComponent } from 'vue'
import TestPrepForm from '@app/components/study/testPreps/TestPrepForm.vue'
import { useEditTestPrep } from '@app/composable/study/testPreps'

export default defineComponent({
	name: 'EditTestPrepModal',
	setup () {
		const { factory, error, loading, editTestPrep } = useEditTestPrep()
		return { factory, error, loading, editTestPrep }
	},
	components: { TestPrepForm }
})
</script>
