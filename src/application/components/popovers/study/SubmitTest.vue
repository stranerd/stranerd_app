<template>
	<Popover>
		<div>
			<div class="flex flex-col gap-1 text-center justify-center items-center">
				<h3 class="text-xl font-semibold text-main_dark">Are you sure you want to submit?</h3>
			</div>

			<div class="flex mt-5 gap-4">
				<div class="w-1/2 flex justify-center items-center">
					<router-link :to="`/study/tests/${$route.params.testId}/`" class="w-full">
						<ion-button class="btn-secondary font-bold !w-full">
							Cancel
						</ion-button>
					</router-link>
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
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SubmitTestPopover'
})
</script>
