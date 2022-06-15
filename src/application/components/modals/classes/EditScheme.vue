<template>
	<Modal class="h-screen md:h-auto">
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditScheme } from '@app/composable/classes/schemes'
import SchemeForm from '@app/components/classes/schemes/SchemeForm.vue'

export default defineComponent({
	name: 'EditSchemeModal',
	components: { SchemeForm },
	setup () {
		const { factory, error, loading, schemeClass, editScheme } = useEditScheme()
		return { error, loading, factory, schemeClass, editScheme }
	}
})
</script>
