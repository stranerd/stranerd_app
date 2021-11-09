<template>
	<div
		:class="`py-3 px-5 md:px-8 md:py-6 lg:px-10 ${isSelected ? 'text-white bg-icon_inactive' : 'md:bg-light_gray'}  flex-col ${colorClass} gap-2 flex justify-center items-center rounded-lg font-bold md:text-base`">
		<h1 class="mb-[2px] font-semibold md:hidden">{{ dayLabel[dateDay].small }}</h1>
		<h1 class="mb-[2px] font-semibold hidden md:block">{{ dayLabel[dateDay].large }}</h1>
		<h2>{{ dateNumber }}</h2>
		<div :class="`h-1 w-1 md:h-2 md:w-2 rounded-full ${hasDot ? 'bg-primary' : ''}`"></div>
	</div>
</template>
<script lang="ts">
export default {
	name: 'TutorCard',
	components: {},
	props: {
		colorClass: {
			type: String,
			default: 'bg-white'
		},
		dateDay: {
			type: String,
			default: 'm'
		},
		dateNumber: {
			type: Number,
			default: 0
		},
		hasDot: {
			type: Boolean,
			default: false
		},
		isSelected: {
			type: Boolean,
			default: false
		}
	},
	setup (props: any) {

		const dayLabel = {
			m: {
				small: 'M',
				large: 'Mon'
			},
			tu: {
				small: 'T',
				large: 'Tue'
			},
			w: {
				small: 'W',
				large: 'Wed'
			},
			th: {
				small: 'T',
				large: 'Thr'
			},
			f: {
				small: 'F',
				large: 'Fri'
			},
			sa: {
				small: 'S',
				large: 'Sat'
			},
			su: {
				small: 'S',
				large: 'Sun'
			}
		}
		return {
			dayLabel
		}
	}

}
</script>
