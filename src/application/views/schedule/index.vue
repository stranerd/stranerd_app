<template>
	<div>
		<div class="d-flex justify-content-between align-items-end">
			<span class="date">Tuesday, August 10</span>
			<span class="year fw-bold text-primary-dark">2021</span>
			<span class="name text-primary">Schedule Manager</span>
		</div>

		<div class="scheduler shadow w-100 p-3 d-flex justify-content-between align-items-center">
			<!-- <img src="" alt=""> -->
			<Icon
				class-name="text-primary-dark"
				size="l"
				icon-name="arrow-left"
			/>

			<div class="d-flex gap-1">
				<div class="d-flex flex-column justify-content-center align-items-center gap-1 date_tab bg-primary">
					<span class="text-white fs-8 fw-bold">Mon</span>
					<span class="fw-bold text-white fs-7">9</span>
				</div>
				<div v-for="n in 5" :key="n" class="d-flex flex-column justify-content-center align-items-center gap-1 date_tab">
					<span class="text-primary fs-8 fw-bold">Tue</span>
					<span class="fw-bold text-primary-dark fs-7">10</span>
				</div>
			</div>
			<Icon
				class-name="text-primary-dark"
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
