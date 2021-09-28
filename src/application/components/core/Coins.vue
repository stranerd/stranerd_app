<template>
	<img v-if="gold" :height="size" :width="size" alt="" src="@app/assets/images/icons/gold.svg">
	<img v-else :height="size" :width="size" alt="" src="@app/assets/images/icons/bronze.svg">
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'Coins',
	props: {
		size: {
			type: Number,
			required: false,
			default: 16
		},
		gold: {
			type: Boolean,
			required: false,
			default: false
		}
	}
})
</script>
