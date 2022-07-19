<template>
	<FullLayout>
		<UserProfile v-if="user" :user="user" class="py-6 lg:py-0 lg:px-8" />
	</FullLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import FullLayout from '@app/layouts/FullLayout.vue'
import UserProfile from '@app/components/users/users/UserProfile.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Account',
	components: { FullLayout, UserProfile },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Profile', {})
		const { user } = useAuth()
		return { user }
	}
})
</script>
