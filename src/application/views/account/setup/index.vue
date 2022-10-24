<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding">
			<ProfileForm :next="() => $router.push('/account/setup/school')" :skip="close" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfileForm from '@app/components/users/settings/ProfileForm.vue'
import { router } from '@app/router'
import { saveSchoolState } from '@app/composable/auth/session'

export default defineComponent({
	name: 'AccountSetup',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { ProfileForm },
	setup () {
		useRouteMeta('Account setup', {})
		const close = async () => {
			await saveSchoolState()
			await router.push('/dashboard')
		}
		return { close }
	}
})
</script>
