<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<UserAnswers v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'

export default defineComponent({
	name: 'AccountAnswers',
	components: { UserAnswers, ProfilePanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Answers', { back: true })
		const { user } = useAuth()
		return { user }
	}
})
</script>
