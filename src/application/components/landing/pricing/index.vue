<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 ">

		<div class="container mx-auto text-bodyText p-6 flex flex-col  md:items-center justify-center">
			<h1 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Flexible Plans</h1>
			<p class="lg:text-2xl text-sm mb-16">Choose a plan that works best for you</p>
			<PlansList class="p-4 lg:px-12 w-full" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import PlansList from '@app/components/payment/plans/PlansList.vue'</script>
