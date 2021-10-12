<template>
	<QuestionsList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionsList from '@app/components/questions/questions/UserQuestionsList.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'UserQuestionsPage',
	components: { QuestionsList },
	setup () {
		const { userId } = useRoute().params
		return { userId }
	}
})
</script>
