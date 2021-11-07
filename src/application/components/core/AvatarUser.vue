<template>
	<div class="relative">
		<template v-if="photoUrl">
			<div :class="`rounded-full bg-gray-400 `"
				:style="`background:url(${photoUrl}); background-size:cover; background-position:center; height:${size}px; width: ${size}px`">
			</div>
		</template>
		<template v-else>
			<img :class="`inline`" :style="`height:${size}px`" src="/assets/images/person-circle.svg" />
			<i v-if="hasDot"
				class="absolute rounded-full bottom-0 right-0 z-10 text-xl bg-green md:w-3 md:h-3 w-[13px] h-[13px]"
			/>
		</template>
	</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		size: {
			type: String,
			default: '28'
		},
		photoUrl: {
			type: String
		},
		hasDot: {
			default: false,
			type: Boolean
		}
	}
})
</script>
