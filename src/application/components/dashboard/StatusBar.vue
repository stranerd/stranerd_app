<template>
	<div
		class="bg-white border-bottom-line md:rounded-xl flex flex-col sm:flex-row justify-between sm:items-center">
		<div class="flex flex-col text-left p-4 md:p-6">
			<IonText class="text-secondaryText text-heading font-bold">
				{{ user ? `Welcome ${user.bio.firstName}!` : 'Hello there' }}
			</IonText>
			<IonText class="text-gray">
				{{ user ? user.nerdScoreMessage : 'You are not logged in.' }}
			</IonText>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'StatusBar',
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
