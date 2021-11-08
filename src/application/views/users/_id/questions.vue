<template>
	<UserPageWrapper :userId="id">
		<UserQuestions :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileQuestions',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, UserQuestions },
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
