<template>
	<UserPageWrapper :userId="id">
		<Dashboard :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Dashboard from '@app/components/profile/dashboard.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileDashboard',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, Dashboard },
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
