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

export default defineComponent({
	name: 'AccountFlashCards',
	components: { Justified, UserFlashCards },
	displayName: 'Flashcards',
	middlewares: ['isAuthenticated'],
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
