<template>
	<Justified>
		<UserFlashCards :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountFlashCards',
	components: { Justified, UserFlashCards },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Flashcards', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
