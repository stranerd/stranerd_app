<template>
	<Justified>
		<div>
			<TopSection/>
			<slot/>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Justified from '@root/application/layouts/Justified.vue'
import { checkmarkDone } from 'ionicons/icons'
import TopSection from '@root/application/components/study/explore/TopSection.vue'

export default defineComponent({
	name: 'StudyExplore',
	displayName: 'Explore',
	middlewares: ['isAuthenticated'],
	components: { Justified, TopSection },
	setup () {
	
		return {   checkmarkDone }
	}
})
</script>

