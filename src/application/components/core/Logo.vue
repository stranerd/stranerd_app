<template>
	<div>
		<img v-if="secondary" alt="Stranerd" class="logo-img" src="@app/assets/images/logo/logo-dark.svg">
		<img v-else alt="Stranerd" class="logo-img" src="@app/assets/images/logo/logo-white.svg">
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Logo',
	props: {
		secondary: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>

<style lang="scss" scoped>
	.logo-img {
		height: 24px;
	}
</style>
