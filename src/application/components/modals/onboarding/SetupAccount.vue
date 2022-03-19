<template>
	<Modal :noPaddingX="true">
		<template v-slot:title>
			Set up your account
		</template>
		<component :is="SetupAccountForm" :error="error" :factory="factory" :loading="loading" :submit="createClass">
			<template v-slot:buttonText>Next</template>
		</component>
	
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateClass } from '@app/composable/classes/classes'
import SetupAccountForm from '@app/components/onboarding/setup/SetupAccountForm.vue'
import AcademicLevelForm from '@app/components/onboarding/setup/AcademicLevel.vue'
import UniversityModalForm from '@app/components/onboarding/setup/UniversityStudentForm.vue'
import PreUniversityModalForm from '@app/components/onboarding/setup/PreUniStudentForm.vue'


export default defineComponent({
	name: 'SetupAccountFormModal',
	components: { SetupAccountForm },
	setup () {
		const { createClass, factory, error, loading } = useCreateClass()
		return { error, loading, createClass, factory, SetupAccountForm, AcademicLevelForm, UniversityModalForm, PreUniversityModalForm }
	}
})
</script>
