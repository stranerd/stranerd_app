<template>
	<router-link :to="`/questions/tags/${tag}`" class="py-1 px-3 font-bold text-white bg-faded_gray rounded-3xl">
		<span>{{ tag }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Tag',
	props: {
		tag: {
			type: String,
			required: true
		}
	}
})
</script>


