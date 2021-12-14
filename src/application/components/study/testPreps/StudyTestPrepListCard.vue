<template>
	<div
		:class="[`m-0 lg:min-w-[18rem] min-w-[16.5rem] h-44 lg:h-44 ${colorClass} rounded-xl flex flex-col items-start justify-between md:gap-2 gap-[1rem] box-border p-6 md:!px-4`]">
		<div class="w-full justify-between items-center flex">
			<ion-text class="font-bold text-xl text-main_dark">
				{{ testPrep.name }}
			</ion-text>

			<ion-icon
				:icon="ellipsisVertical"
				class="text-gray text-2xl"
			/>
		</div>

		<div class="flex items-center justify-between gap-3">
			<ion-button class="btn-primary font-bold lg:min-w-[7.5rem] w-28" @click="createTest(testPrep, true)">
				Test
			</ion-button>

			<ion-button class="btn-outline text-primary font-bold lg:min-w-[7.5rem] w-28"
				@click="createTest(testPrep, false)">
				Solutions
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { calendar, ellipsisVertical, play } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { useCreateTest } from '@app/composable/study/tests'

export default defineComponent({
	name: 'StudyTestPrepListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		testPrep: {
			type: TestPrepEntity,
			required: true
		}
	},
	setup () {
		const { loading, error, createTest } = useCreateTest()
		return {
			ellipsisVertical, calendar, play,
			loading, error, createTest
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;
	}
</style>
