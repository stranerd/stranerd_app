<template>
	<router-link
		:class="`m-0 min-w-[16.5rem] bg-white w-full rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border p-6 `"
		:to="`/study/tests/${test.id}/take`"
	>
		<div class="flex flex-col items-center justify-between w-full mx-auto capitalize">
			<div class="w-full flex justify-between items-center">
				<ion-text class="text-base text-left w-full text-main_dark font-bold">
					{{ instituteName }}
				</ion-text>


				<ion-icon
					:icon="arrowForward"
					class="text-3xl text-gray "
				/>
			</div>

			<ion-text class="text-base text-left w-full text-gray font-bold">
				Study > {{ subject }} ({{ year }})
			</ion-text>

			<ion-progress-bar class="mt-10" value="0.5" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { arrowForward, calendar, play } from 'ionicons/icons'
import { IonProgressBar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestEntity } from '@modules/study'

export default defineComponent({
	name: 'ContinueTestCard',
	components: { IonProgressBar },
	props: {
		test: {
			required: true,
			type: TestEntity
		}
	},
	setup (props) {
		// TODO: Reimplement to get subject and year and institutionName
		const instituteName = props.test.name.split(' ')[0]
		const subject = props.test.name.split(' ')[1]
		const year = props.test.name.split(' ')[2]
		return {
			instituteName, subject, year,
			formatNumber, arrowForward,
			calendar,
			play
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-progress-bar {
		height: .55rem !important;
		border-radius: 12px !important;
	}

	ion-progress-bar::part(progress) {
		border-radius: 120px !important;
	}

	ion-card {
		box-shadow: none !important;

	}
</style>
