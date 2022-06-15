<template>
	<DefaultLayout>
		<UserAnswers v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountAnswers',
	components: { UserAnswers },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Answers', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
