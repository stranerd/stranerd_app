<template>
	<UserPageWrapper :userId="id">
		<Questions :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Questions from '@app/components/profile/questions.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileQuestions',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, Questions },
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
