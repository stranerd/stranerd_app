<template>
	<Justified>
		<UserDocuments v-if="user" :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserDocuments from '@app/components/users/users/UserDocuments.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountDocuments',
	components: { Justified, UserDocuments },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Documents', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
