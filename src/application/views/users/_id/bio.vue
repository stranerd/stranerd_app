<template>
	<UserPageWrapper :userId="id">
		<UserBio :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import UserBio from '@app/components/users/users/UserBio.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileBio',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, UserBio },
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
