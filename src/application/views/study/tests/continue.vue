<template>
	<Justified>
		<div class="bg-primary w-full min-h-[130px] flex flex-col justify-center items-center pt-0 pb-1">
			<div class="flex items-center">
				<ion-text class="text-white font-semibold text-center text-xl">
					Uncompleted Tests
				</ion-text>
			</div>
		</div>

		<div class="lg:w-8/12 w-full px-4 mx-auto mt-8">
			<ContinueStudy />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import ContinueStudy from '@app/components/study/tests/ContinueTests.vue'

export default defineComponent({
	name: 'TestsContinue',
	displayName: 'Continue Tests',
	components: { Justified, ContinueStudy },
	middlewares: ['isAuthenticated']
})
</script>
