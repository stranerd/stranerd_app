<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">
		<div class="flex flex-col gap-1 text-center justify-center items-center">
			<h3 class="text-xl font-semibold text-main_dark">Are you sure you want to submit?</h3>
		</div>

		<div class="flex mt-5 text-white gap-4">
			<div class="w-1/2 flex justify-center items-center">
				<ion-button class="btn-secondary w-full" @click="closeSubmitTest">
					No
				</ion-button>
			</div>
			<div class="w-1/2 flex justify-center items-center">
				<router-link :to="`/study/tests/${$route.params.testId}/results`" class="w-full">
					<ion-button class="btn-primary font-bold !w-full">
						Submit
					</ion-button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStudyPopover } from '@app/composable/core/modals'

export default defineComponent({
	setup () {
		const closeSubmitTest = () => {
			useStudyPopover().closeSubmitTest()
		}
		return { closeSubmitTest }
	}
})
</script>
