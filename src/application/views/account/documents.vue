<template>
	<DefaultLayout>
		<UserDocuments v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserDocuments from '@app/components/users/users/UserDocuments.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountDocuments',
	components: { UserDocuments },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Documents', { back: '/account' })
		const { user } = useAuth()
		return { user }
	}
})
</script>
