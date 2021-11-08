<template>
	<UserPageWrapper :userId="id">
		<UserSettings :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import UserSettings from '@app/components/users/users/UserSettings.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ProfileSettings',
	displayName: 'Profile',
	layout: 'users',
	middlewares: ['isAuthenticated', () => {
		const id = useRoute().params.id
		if (id !== useAuth().id.value) return `/users/${useAuth().id.value}/settings`
	}],
	components: { UserPageWrapper, UserSettings },
	setup () {
		const route = useRoute()
		const id = route.params.id
		return { id }
	}
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}

</style>
