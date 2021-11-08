<template>
	<UserPageWrapper :userId="id">
		<Bio :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Bio from '@app/components/profile/bio.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileBio',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, Bio },
	setup () {
		const route = useRoute()
		const id = route.params.id
		console.log(id)
		return { id }
	}
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}

</style>
