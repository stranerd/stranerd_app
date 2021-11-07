<template>
	<InnerTopBar :isNotDashboard="false"></InnerTopBar>
	<slot />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import InnerTopBar from '@app/components/layout/topNavigations/InnerTopBar.vue'

export default defineComponent({
	setup () {
		return {}
	},
	components: {
		InnerTopBar,
	}
})
</script>

