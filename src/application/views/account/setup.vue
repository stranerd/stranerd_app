<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding">
			<ProfileForm v-if="tab === 0" :next="() => tab = 1" :skip="close" />
			<SchoolForm v-if="tab === 1" :back="() => tab = 0" :next="close" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfileForm from '@app/components/users/settings/ProfileForm.vue'
import SchoolForm from '@app/components/users/settings/SchoolForm.vue'
import { router } from '@app/router'
import { saveSchoolState } from '@app/composable/auth/session'

export default defineComponent({
	name: 'AccountSetup',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { ProfileForm, SchoolForm },
	setup () {
		useRouteMeta('Account setup', {})
		const tab = ref(0)
		const close = async () => {
			await saveSchoolState()
			await router.push('/dashboard')
		}
		return { tab, close }
	}
})
</script>
