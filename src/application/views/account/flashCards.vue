<template>
	<DefaultLayout>
		<UserFlashCards v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountFlashCards',
	components: { UserFlashCards },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Flashcards', { back: true })
		const { user } = useAuth()
		return { user }
	}
})
</script>
