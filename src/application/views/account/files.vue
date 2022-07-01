<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<UserFiles v-if="user" :user="user" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserFiles from '@app/components/users/users/UserFiles.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'

export default defineComponent({
	name: 'AccountFiles',
	components: { UserFiles, ProfilePanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Files', { back: true })
		const { user } = useAuth()
		return { user }
	}
})
</script>
