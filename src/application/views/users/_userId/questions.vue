<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserQuestions :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileQuestions',
	displayName: 'Profile',
	layout: 'justified',
	components: { UserPageWrapper, UserQuestions }
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
