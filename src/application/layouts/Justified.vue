<template>
	<InnerTopBar :isNotDashboard="false"></InnerTopBar>
	<modal></modal>
	<slot />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import InnerTopBar from '@/application/components/layout/topNavigations/InnerTopBar.vue'
import Modal from  '@/application/components/core/Modal.vue'

export default defineComponent({
	setup() {
		return {}
	},
	components: {
		 InnerTopBar, Modal,
	}
})
</script>

