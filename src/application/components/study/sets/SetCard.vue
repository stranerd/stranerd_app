<template>
	<div class="flex flex-col items-end">
		<div
			:class="`m-0  h-[9rem] cardPadding bg-light_gray ${bgColor(index)} rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border justify-start p-5 border border-faded_gray lg:border-0`"
		>
			<div class="flex items-start justify-between w-full  ">
				<ion-icon
					:icon="folder"
					class="text-main_dark text-7xl mr-4 -mt-4"
				/>
				<ion-text class="text-base text-main_dark font-bold ">
					{{ set.name }}
				</ion-text>
			</div>

		</div>
		<ion-text class="font-bold text-delete_red cursor-pointer">
			Remove
		</ion-text>
	</div>

</template>


<script lang="ts">

import { folder } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { SetEntity } from '@modules/study/'

export default defineComponent({
	name: 'TutorCard',

	props: {
		set: {
			type: SetEntity,
			required: true
		},
		index: {
			type: Number,
			required: false
		}
	},
	setup () {
		const bgColor = (index: any) => {
			if (index === 1) return 'bg-light_green'
			else if (index === 2) return 'bg-tinted_pink'
			else if (index === 3) return 'bg-butter_yellow'
		}
		return {
			bgColor,
			formatNumber,
			folder
		}
	}
})
</script>


<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}


</style>
