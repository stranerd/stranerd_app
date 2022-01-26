<template>
	<Modal>
		<template v-slot:title>
			Create Study Set
		</template>
		<SetForm :error="error" :factory="factory" :loading="loading" :submit="createSet">
			<template v-slot:buttonText>Create Set</template>
		</SetForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateSet } from '@app/composable/study/sets'
import SetForm from '@app/components/study/sets/SetForm.vue'

export default defineComponent({
	name: 'CreateSetModal',
	components: { SetForm },
	setup () {
		const { createSet, factory, error, loading } = useCreateSet()
		return { error, loading, createSet, factory }
	}
})
</script>
