<template>
	<Modal :close="close">
		<template v-slot:title>
			Set up your account
		</template>
		<ProfileForm v-if="tab === 0" :next="() => tab = 1" />
		<SchoolForm v-if="tab === 1" :back="() => tab = 0" :next="() => { close?.(); saveSchoolState(); }" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProfileForm from '@app/components/users/settings/ProfileForm.vue'
import SchoolForm from '@app/components/users/settings/SchoolForm.vue'
import { saveSchoolState } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'SettingsModal',
	components: { ProfileForm, SchoolForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const tab = ref(0)
		return { tab, saveSchoolState }
	}
})
</script>
