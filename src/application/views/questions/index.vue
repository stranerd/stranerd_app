<template>
	<DashboardLayout>
		<div class="py-4 lg:py-8 md:px-4 lg:px-0">
			<div v-if="isLoggedIn" class="px-4 md:px-0 mb-4">
				<IonSegment v-model="tab"
					class="w-full bg-new_gray text-gray border border-new_gray border-xl md:border-white">
					<IonSegmentButton class="w-full" value="all">All Questions</IonSegmentButton>
					<IonSegmentButton class="w-full" value="mine">My Questions</IonSegmentButton>
				</IonSegment>
			</div>

			<div>
				<MyQuestionsList v-if="tab === 'mine'" />
				<QuestionsList v-else />
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import MyQuestionsList from '@app/components/questions/questions/MyQuestionsList.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Questions',
	displayName: 'Questions',
	components: { QuestionsList, MyQuestionsList, DashboardLayout },
	setup () {
		const tab = ref('all')
		const { isLoggedIn } = useAuth()
		return { tab, isLoggedIn }
	}
})
</script>

<style lang="scss" scoped>
	ion-segment {
		border-radius: 0.5rem;
	}

	ion-segment-button {
		--background-checked: #{$color-white};
		--background-focused: #{$color-white};
		--indicator-color: #{$color-white};
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		font-weight: bold;
		border-radius: 0.5rem;
		text-transform: capitalize;
		max-width: unset;
		color: $color-gray;
	}

	.segment-button-checked {
		color: $color-gray !important;
		background: $color-white;
	}
</style>
