<template>
	<div>
		<HomeTopNavigation />
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeTopNavigation from '@app/components/layout/topNavigations/HomeTopNavigation.vue'

export default defineComponent({
	name: 'AuthLayout',
	components: { HomeTopNavigation }
})
</script>
