<template>
	<modal></modal>
	<slot />
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

const Modal = defineAsyncComponent(() => import('@/application/components/core/Modal.vue'))

export default defineComponent({
	setup() {
		return {}
	},
	components: {
	   Modal
	}
})
</script>

