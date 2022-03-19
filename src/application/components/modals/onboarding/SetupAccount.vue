<template>
	<Modal :noPaddingX="true">
		<template v-slot:title>
			Set up your account
		</template>
		<component :is="UniversityModal" :error="error" :factory="factory" :loading="loading" :submit="createClass">
			<template v-slot:buttonText>Next</template>
		</component>
	
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateClass } from '@app/composable/classes/classes'
import SetupAccountForm from '@app/components/onboarding/setup/SetupAccountForm.vue'
import AcademicLevel from '@app/components/onboarding/setup/AcademicLevel.vue'
import UniversityModal from '@app/components/onboarding/setup/UniversityStudentForm.vue'


export default defineComponent({
	name: 'SetupAccountFormModal',
	components: { SetupAccountForm },
	setup () {
		const { createClass, factory, error, loading } = useCreateClass()
		return { error, loading, createClass, factory, SetupAccountForm, AcademicLevel, UniversityModal }
	}
})
</script>
