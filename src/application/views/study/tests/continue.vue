<template>
	<Justified>
		<div class="lg:w-8/12 w-full md:px-4 lg:px-0 md:py-4 mx-auto">
			<div
				class="hidden lg:flex card-padding items-center justify-center bg-white w-full rounded-xl box-border mb-4">
				<h1 class="text-xl font-semibold">Uncompleted Tests</h1>
			</div>
			<ContinueStudy />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import ContinueStudy from '@app/components/study/tests/ContinueTests.vue'

export default defineComponent({
	name: 'StudyTestsContinue',
	displayName: 'Uncompleted Tests',
	components: { Justified, ContinueStudy },
	middlewares: ['isAuthenticated']
})
</script>
