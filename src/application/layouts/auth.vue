<template>
	<div>
		<HomeTopNavigation/>
		<slot />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HomeTopNavigation from '../components/layout/topNavigations/HomeTopNavigation.vue'

export default defineComponent({
	components: {  HomeTopNavigation, },
	setup() {
		return {

		}
	},
})
</script>

