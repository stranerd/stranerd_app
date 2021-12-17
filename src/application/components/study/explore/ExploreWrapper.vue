<template>
	<Justified>
		<div>
			<TopSection />
			<div class="p-4 md:w-8/12 w-full mx-auto">
				<slot />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { checkmarkDone } from 'ionicons/icons'
import TopSection from '@app/components/study/explore/TopSection.vue'

export default defineComponent({
	name: 'StudyExplore',
	displayName: 'Explore',
	middlewares: ['isAuthenticated'],
	components: { Justified, TopSection },
	setup () {
		return { checkmarkDone }
	}
})
</script>

