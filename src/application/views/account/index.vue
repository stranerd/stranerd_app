<template>
	<DefaultLayout>
		<UserProfile v-if="user" :user="user" class="py-6 lg:p-0" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import DefaultLayout from '@app/layouts/DefaultLayout.vue'
import UserProfile from '@app/components/users/users/UserProfile.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Account',
	components: { DefaultLayout, UserProfile },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Profile', {})
		const { user } = useAuth()
		return { user }
	}
})
</script>
