<template>
	<DefaultLayout>
		<div class="min-h-full flex flex-col">
			<BlockLoading v-if="loading" />
			<UserProfile v-else-if="user" :user="user" class="py-6 lg:p-0" />
			<NotFound v-else title="User not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useRoute } from 'vue-router'
import { useUser } from '@app/composable/users/users'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import UserProfile from '@app/components/users/users/UserProfile.vue'

export default defineComponent({
	name: 'UsersUserId',
	components: { UserProfile },
	beforeRouteEnter: generateMiddlewares([async ({ to }) => {
		if (to.params.userId === useAuth().id.value) return '/account'
	}]),
	setup () {
		useRouteMeta('Profile', { back: true })
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		return { user, loading, error }
	}
})
</script>
