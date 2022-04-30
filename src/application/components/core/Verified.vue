<template>
	<img v-if="verified" alt="" src="/images/avatars/verified.png" style="width: 1.35em; aspect-ratio: 1/1;">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Verified',
	props: {
		verified: {
			type: Boolean,
			required: false,
			default: false
		}
	}
})
</script>
