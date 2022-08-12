<template>
	<DefaultLayout>
		<UserFiles v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserFiles from '@app/components/users/users/UserFiles.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountFiles',
	components: { UserFiles },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Files', { back: true })
		const { user } = useAuth()
		return { user }
	}
})
</script>
