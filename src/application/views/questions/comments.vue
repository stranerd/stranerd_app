<template>
	<div class="flex flex-col md:gap-4">
		<div class="bg-bodyBg !gap-4 card-padding flex flex-col border-bottom-line">
			<div class="flex items-center gap-4 text-secondaryText text-sub justify-between">
				<div class="flex items-center text-secondaryText text-sub">
					<div class="flex items-center gap-2">
						<Avatar :id="question.user.id" :size="24" :src="question.user.bio.photo" />
						<span class="font-semibold text-secondaryText flex gap-1 items-center">
							<span>{{ question.user.bio.fullName }}</span>
							<Verified :verified="question.isUserVerified" />
						</span>
						<span>{{ formatTime(question.createdAt) }}</span>
					</div>
				</div>
				<div class="flex flex-grow items-center justify-end gap-4 text-heading2">
					<Share
						:text="question.strippedBody"
						title="Share this question" />
					<IonIcon :icon="flagOutline" class="cursor-pointer"
						@click="openReportQuestionModal" />
				</div>
			</div>
			<DisplayHtml :html="question.body" />
		</div>

		<form class="flex items-center gap-2 mt-auto p-4 absolute bottom-0 inset-x-0 border-top-line" @submit.prevent="createTextDiscussion">
			<IonInput  class="flex-grow rounded-full h-8" placeholder="Add a comment" required />
			<IonButton :disabled="false" class="btn-primary flex justify-center items-center" type="submit">
				<IonIcon slot="icon-only" class="text-lg" :icon="paperPlaneOutline" />
			</IonButton>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { flagOutline, paperPlaneOutline } from 'ionicons/icons'
export default defineComponent({
    	name: 'Comments',
	setup () {
        

		return {flagOutline, paperPlaneOutline}
	}
})
</script>

<style scoped>
	ion-button {
		height: 32px;
		width: 32px;
		--padding-start: 0.4rem !important;
		--padding-end: 0.4rem !important;
		--padding-top: 0.4rem !important;
		--padding-bottom: 0.4rem !important;
		--border-radius: 10rem !important;
		border-radius: 10rem !important;
		@media (min-width: $md) {
			--padding-start: 0.6rem !important;
			--padding-end: 0.6rem !important;
			--padding-top: 0.6rem !important;
			--padding-bottom: 0.6rem !important;
		}
	}

</style>