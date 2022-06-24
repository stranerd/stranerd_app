<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<UserQuestions v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'

export default defineComponent({
	name: 'AccountQuestions',
	components: { UserQuestions, ProfilePanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Questions', { back: true })
		const { user } = useAuth()
		return { user }
	}
})
</script>
