<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding flex flex-col">
			<div class="card-sm bg-highlight card-padding flex flex-col mb-8 items-center text-center gap-3">
				<IonText class="font-bold text-lg">Personalize Stranerd to what you study.</IonText>
				<IonText>We use this information to provide tools and resources that are relevant to you.</IonText>
				<IonText>
					Course-specific resources, tailored search results, and recommendations on what to study next for
					each of your courses.
				</IonText>
			</div>
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
