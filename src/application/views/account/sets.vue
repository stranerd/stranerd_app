<template>
	<DefaultLayout>
		<UserSets v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserSets from '@app/components/users/users/UserSets.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountSets',
	components: { UserSets },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Saved', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
