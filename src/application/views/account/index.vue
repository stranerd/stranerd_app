<template>
	<FullLayout>
		<ProfileView class="py-6 lg:pt-0" />
	</FullLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import FullLayout from '@app/layouts/FullLayout.vue'
import ProfileView from '@app/components/users/users/ProfileView.vue'

export default defineComponent({
	name: 'Account',
	components: { FullLayout, ProfileView },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Profile', {})
	}
})
</script>
