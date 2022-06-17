<template>
	<div class="flex no-wrap justify-end">
		<IonIcon
			v-for="index in 5"
			:key="'comment'+ index"
			:class="[index <= rating - 1 ? 'text-yellow_star' : 'text-icon_inactive', 'h-4 text-3xl text-[18px]']"
			:icon="starSharp"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { chevronBackOutline, ellipse, starSharp } from 'ionicons/icons'

export default defineComponent({
	name: 'ShowRatings',
	props: {
		rating: {
			type: Number,
			required: true
		}
	},
	setup () {
		return {
			starSharp, chevronBackOutline, ellipse
		}
	}

})
</script>
