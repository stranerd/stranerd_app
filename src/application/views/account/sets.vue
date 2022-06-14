<template>
	<Justified>
		<UserSets :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserSets from '@app/components/users/users/UserSets.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountSets',
	components: { Justified, UserSets },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Saved', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
