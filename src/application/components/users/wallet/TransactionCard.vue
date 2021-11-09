<template>
	<div
		:class="`m-0 md:min-w-[17rem] lg:w-full min-w-[12.5rem] h-[6rem] cardPadding ${colorClass}  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-[1rem] box-border  p-5`"
	>
		<div class="flex items-center normalText font-bold text-dark_gray gap-2">
			<Coins :gold="false" :size="24" />
			<span>+24</span>
			<span>|</span>
			<span>Aug 10, 2021</span>
		</div>

		<span class="normalText font-normal text-dark">
			You got coins for best answer.
		</span>


	</div>
</template>

<script lang="ts">
import { calendar, time } from 'ionicons/icons'
import Coins from '../../core/Coins.vue'

export default {
	name: 'TutorCard',
	components: { Coins },
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		}
	},
	setup () {
		return {
			calendar, time
		}
	}

}
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
