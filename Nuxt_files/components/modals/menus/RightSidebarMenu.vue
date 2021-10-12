<template>
	<RightSideMenu :modal="$attrs.modal">
		<RightSidebar />
	</RightSideMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'

export default defineComponent({
	name: 'RightSidebarMenu',
	components: { RightSidebar }
})
</script>
