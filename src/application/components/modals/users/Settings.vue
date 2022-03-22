<template>
	<Modal :noPaddingX="true">
		<template v-slot:title>
			Set up your account
		</template>
		<ProfileForm v-if="tab === 0" :next="() => tab = 1" />
		<SchoolForm v-if="tab === 1" :back="() => tab = 0" :next="closeSettings" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProfileForm from '@app/components/users/settings/ProfileForm.vue'
import SchoolForm from '@app/components/users/settings/SchoolForm.vue'
import { useUserModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'SettingsModal',
	components: { ProfileForm, SchoolForm },
	setup () {
		const tab = ref(0)
		return { tab, closeSettings: () => useUserModal().closeSettings() }
	}
})
</script>
