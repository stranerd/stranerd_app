<template>
	<UserPageWrapper :userId="id">
		<Answers :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Answers from '@app/components/profile/answers.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileAnswers',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, Answers },
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
