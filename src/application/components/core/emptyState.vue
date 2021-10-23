<template>
	<div class="w-full rounded-lg bg-light_gray  flex flex-col items-center justify-center py-7 px-5 md:py-11 gap-3 text-center normalText text-dark_gray">

		<p>
			{{ info }}
		</p>

		<router-link class="py-3 px-7 font-bold border-[1px] border-solid border-dark_gray rounded-lg" :to="route">
			{{ btnText }}
		</router-link>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Emptystate',
	props: {
		info: {
			type: String
		},
		route: {
			type: String
		},
		btnText: {
			type: String
		}
	}
	
})
</script>
