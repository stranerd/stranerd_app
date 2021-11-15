<template>
	<div>
		<!-- <h1>Hello from Home Page</h1> -->
		<Landing></Landing>
		<Download></Download>
		<Statistics></Statistics>
		<GetStarted></GetStarted>
		<Features></Features>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Features from '@app/components/landing/features.vue'
import GetStarted from '@app/components/landing/getStarted.vue'
import Statistics from '@app/components/landing/statistics.vue'
import Download from '@app/components/landing/download.vue'
import Landing from '@app/components/landing/landing.vue'

export default defineComponent({
	name: 'Index',
	layout: 'home',
	components: {
		Features,
		GetStarted,
		Statistics,
		Download,
		Landing
	}
})
</script>
<style scoped>


</style>
