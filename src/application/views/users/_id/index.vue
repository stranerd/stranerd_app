<template>
	<UserPageWrapper :userId="id">
		<UserDashboard :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import UserDashboard from '@app/components/users/users/UserDashboard.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileDashboard',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, UserDashboard },
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
