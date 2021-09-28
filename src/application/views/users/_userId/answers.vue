<template>
	<AnswersList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnswersList from '@app/components/questions/answers/UserAnswersList.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'UserAnswersPage',
	components: { AnswersList },
	setup () {
		const { userId } = useRoute().params
		return { userId }
	}
})
</script>
