<template>
	<div
		:class="[`m-0 h-[13rem] min-w-[16.5rem] cardPadding border ${colorClass} rounded-xl flex flex-col items-center md:gap-2 gap-[1rem] box-border !p-4 md:!p-7 border border-faded_gray lg:border-0`]">
		<ion-text class="font-bold text-lg text-main_dark">
			{{ testPrep.name }}
		</ion-text>

		<div class="mt-1">
			<ion-button class="btn-secondary min-w-[7rem] font-bold w-full mb-3" @click="createTest(testPrep, true)">
				Test yourself
			</ion-button>
			<ion-button class="btn-outline text-main_dark min-w-[7rem] font-bold w-full"
				@click="createTest(testPrep, false)">
				Study solutions
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
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
			calendar, play,
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
