<template>
	<div class="p-6 gap-2 flex rounded-xl flex-col bg-primaryBg text-primaryText">
		<span class="text-xl font-bold">
			Upgrade to Stranerd Premium to view answers
		</span>
		<span class="text-lg">
			Get access to the answers of all questions
		</span>
		<router-link class="w-full mt-2" to="/account/subscription/plans">
			<IonButton class="btn-primary w-full">Get Started</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QuestionEntity } from '@modules/questions'

export default defineComponent({
	name: 'UnsubscribedAnswersList',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
ion-button.btn-primary {
	--background: #{$color-primaryText};
	--color: #{$color-primaryBg};
	--border-color: #{$color-primaryText};
}
</style>
