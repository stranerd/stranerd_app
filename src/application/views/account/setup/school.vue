<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding">
			<SchoolForm :next="close" :skip="close" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SchoolForm from '@app/components/users/settings/SchoolForm.vue'
import { router } from '@app/router'
import { saveSchoolState } from '@app/composable/auth/session'

export default defineComponent({
	name: 'AccountSetupSchool',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { SchoolForm },
	setup () {
		useRouteMeta('Account setup', { back: true })
		const close = async () => {
			await saveSchoolState()
			await router.push('/dashboard')
		}
		return { close }
	}
})
</script>
