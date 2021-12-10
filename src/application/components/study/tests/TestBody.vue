<template>
	<div>
		<ion-segment class="md:w-96 mb-12" mode="ios" value="testYourself">
			<ion-segment-button value="testYourself">
				<ion-label>All questions</ion-label>
			</ion-segment-button>
			<ion-segment-button value="solutions">
				<ion-label>Single question</ion-label>
			</ion-segment-button>
		</ion-segment>

		<div v-for="num in 10" :key="num" class="flex flex-col w-full">
			<div class="flex item-center justify-between  mb-8 mt-10">
				<ion-text class="text-main_dark font-bold md:text-2xl">
					Question {{ num }}
				</ion-text>
				<div class="flex items-center text-lg text-icon_inactive gap-4">
					<ion-icon
						:icon="flag"
					/>
					<ion-icon
						:icon="ellipsisVertical"
					/>
				</div>
			</div>

			<ion-text class="text-main_dark   mb-8">
				Which of the following completely describes the number of points in which two distinct quadratic
				functions can intersect?
			</ion-text>

			<div class="answers flex flex-col">
				<div v-for="n in ['A', 'B', 'C', 'D']" :key="n" class="flex w-full hover:bg-light_gray px-5 py-3">
					<input :id="n+num" :name="`${num}`" class="hidden" type="radio">
					<label :for="n+num" :name="`${num}`"
						class="label border-4 rounded-full border-light_gray h-8 w-8 text-base font-bold grid place-items-center  hover:border-primary">
						{{ n }}</label>
					<ion-text class="text-lg ml-5">{{ n }}</ion-text>

				</div>
			</div>

			<div class="bg-light_gray rounded-lg w-full h-2 mt-12"></div>
		</div>

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
			<div class="lg:w-8/12  w-full px-4  mx-auto flex items-center justify-between">
				<div class="flex">
					<ion-text class="text-main_dark"> 2/40 answered</ion-text>
				</div>

				<div class="flex items-center">
					<div class="h-2 w-2 bg-red-500 rounded-full mr-4" />
					<ion-text class="text-icon_inactive">
						00:28:20
					</ion-text>
				</div>


				<div class="flex items-center">

					<ion-button class="btn-primary btn-lgx mr-4" @click="submit">Submit</ion-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { IonSegment, IonSegmentButton } from '@ionic/vue'
import { useTestDetails } from '@app/composable/study/tests'
import { defineComponent } from 'vue'
import { TestEntity } from '@modules/study'

export default defineComponent({
	name: 'TestBody',
	components: { IonSegment, IonSegmentButton },
	props: {
		test: {
			type: TestEntity,
			required: true
		}
	},
	setup (props) {
		const { error, loading, questions } = useTestDetails(props.test)
		return { error, loading, questions }
	}
})
</script>

<style lang="scss" scoped>
	.btn-lgx {
		@media (min-width: 1042px) {
			--padding-top: 1.5rem;
			--padding-bottom: 1.5rem;
			--padding-start: 4.5rem;
			--padding-end: 4.5rem;
		}

	}

	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}

	input[type="radio"]:checked + label {
		@apply border-primary
	}

	.segment-button-checked {
		color: white !important
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
		color: #8B9EB1;
		font-weight: bold;
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
		@media (max-width: 770px) {
			box-shadow: none;
			border-radius: 0;
		}
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
