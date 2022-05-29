<template>
	<Justified>
		<UserAnswers :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountAnswers',
	components: { Justified, UserAnswers },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Answers')
		const { user } = useAuth()
		return { user }
	}
})
</script>
