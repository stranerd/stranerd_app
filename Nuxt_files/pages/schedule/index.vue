<template>
	<div>
		<div class="flex justify-content-between align-items-end">
			<span class="date">Tuesday, August 10</span>
			<span class="year font-bold text-primaryDark">2021</span>
			<span class="name text-primary">Schedule Manager</span>
		</div>

		<div class="scheduler shadow w-100 p-3 flex justify-content-between items-center">
			<!-- <img src="" alt=""> -->
			<Icon
				class-name="text-primaryDark"
				size="l"
				icon-name="arrow-left"
			/>

			<div class="flex gap-1">
				<div class="flex flex-col justify-center items-center gap-1 date_tab bg-primary">
					<span class="text-white fs-8 font-bold">Mon</span>
					<span class="font-bold text-white fs-7">9</span>
				</div>
				<div v-for="n in 5" :key="n" class="flex flex-col justify-center items-center gap-1 date_tab">
					<span class="text-primary fs-8 font-bold">Tue</span>
					<span class="font-bold text-primaryDark fs-7">10</span>
				</div>
			</div>
			<Icon
				class-name="text-primaryDark"
				size="l"
				icon-name="arrow-right"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'QuestionsList',
	layout: 'dashboard'

})
</script>

<style lang="scss" scoped>
	.date_tab {
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 12px;

		&:hover {
			box-shadow: 0 5px 10px rgba(19, 39, 64, 0.047);
		}
	}

	.scheduler {
		height: 12rem;
		border-radius: 6px;
	}

	.date {
		font-size: 18px;
		font-size: 400;
	}

	.year {
		font-size: 36px;
	}

	.fs-7 {
		font-size: 1.875rem;
	}

	.fs-8 {
		font-size: 1.5rem;
	}

</style>
