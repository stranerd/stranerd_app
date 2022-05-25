<template>
	<Justified>
		<UserQuestions :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'

export default defineComponent({
	name: 'AccountQuestions',
	components: { Justified, UserQuestions },
	displayName: 'Questions',
	middlewares: ['isAuthenticated'],
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
