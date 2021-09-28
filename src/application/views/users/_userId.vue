<template>
	<section>
		<PageLoading v-if="loading" />
		<template v-else-if="user">
			<UserTopNavigation :user="user" class="mb-1 mb-md-2" />
			<NuxtChild />
		</template>
		<DisplayError v-else error="No such user exists!" />
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUser } from '@/application/hooks/users/user'
import UserTopNavigation from '@app/components/layouts/topNavigations/UserTopNavigation.vue'
import { useAuth } from '@/application/hooks/auth/auth'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'UserParentPage',
	components: { UserTopNavigation },
	layout: 'profile',
	setup () {
		const { id } = useAuth()
		const { userId } = useRoute().params
		const { error, loading, user } = useUser(userId[0])
		// useMeta(() => ({
		// 	title: (userId === id.value ? 'Your' : (user.value?.firstName ?? 'Unknown') + '\'s') + ' Profile | Stranerd'
		// }))
		return { error, loading, user }
	},
	head: {}
})
</script>
