<template>
	<LeftSideMenu :modal="$attrs.modal">
		<Sidebar />
	</LeftSideMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'

export default defineComponent({
	name: 'SidebarMenu',
	components: { Sidebar }
})
</script>
