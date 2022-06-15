<template>
	<Justified>
		<UserQuestions v-if="user" :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountQuestions',
	components: { Justified, UserQuestions },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Questions', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
