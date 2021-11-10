<template>
	<ion-card

		:class="[ style ,' md:min-w-[17rem] md:h-[10.7rem] !m-0 min-w-[242px] h-[162px]  md:rounded-xl rounded-md flex flex-col gap-3 box-border  cardPadding']"
	>
		<div class="flex items-center justify-between w-full">
			<div class="flex items-center gap-2">
				<avatar
					:size="24"
					class="!h-[20px] !w-[20px] md:!h-[24px] md:!w-[24px]"
					:id="user.id"
				/>
				<span class="font-bold text-dark_gray normalText">
					Timmy Martin
				</span>
			</div>

			<span class="font-bold normalText text-icon_inactive">
				30m ago
			</span>


		</div>

		<div>
			<span class="normalText whitespace-pre-line">
				{{ question.trimmedBody }}
			</span>

		</div>

		<div class="normalText">
			<span class="font-bold text-base text-icon_inactive">
				5 answers
			</span>

		</div>


	</ion-card>
</template>

<script>
import { IonCard } from '@ionic/vue'
import Avatar from '@app/components/core/Avatar.vue'
import { QuestionEntity } from '@modules/questions'

export default {
	name: 'TutorCard',
	components: { IonCard, Avatar },
	props: {
		style: {
			required: false,
			type: String
		},
		question: {
			type: QuestionEntity
		}
	}

}
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
