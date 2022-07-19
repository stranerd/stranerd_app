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

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditSet } from '@app/composable/study/sets'
import SetForm from '@app/components/study/sets/SetForm.vue'

export default defineComponent({
	name: 'EditSetModal',
	components: { SetForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { editSet, factory, error, loading } = useEditSet()
		return { error, loading, editSet, factory }
	}
})
</script>
