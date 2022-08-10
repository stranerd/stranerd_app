<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<UserWallet v-if="user && wallet" :user="user" :wallet="wallet" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserWallet from '@app/components/users/users/UserWallet.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'

export default defineComponent({
	name: 'AccountWallet',
	components: { UserWallet, ProfilePanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Wallet', { back: true })
		const { user, wallet } = useAuth()
		return { user, wallet }
	}
})
</script>
