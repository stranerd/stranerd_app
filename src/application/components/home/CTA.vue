<template>
	<div class="col-span-12 lg:col-start-3 lg:col-end-11 flex flex-col items-center justify-center pt-3 pb-5">
		<div class="flex flex-col items-center justify-center">
			<img class="md:w-3/5 w-10/12" src="@app/assets/images/homepage/connect.svg">
		</div>
		<div class="text-center flex flex-col justify-center items-center py-6 mt-6">
			<div class="flex flex-col justify-center items-center md-mb-2 mb-1">
				<h1 class="text-[#374B98] lg:text-3xl md:text-2xl text-xl font-bold">
					Your quick help for homework and study problems
				</h1>
				<!--
				<Heading class="text-primary-dark mb-1" variant="4">
					Link up with smart students in various subjects
				</Heading>
				-->
				<p class="md:text-lg text-sm text-center lg:w-4/6 md:w-3/4 w-11/12  text-gray-600 mt-2">
					Leverage a large community of students for your academic needs while making connections that will impact you for life
				</p>
			</div>
			<NuxtLink
				class="mt-6 md:px-8 px-4 md:py-4 py-2 bg-primary text-white font-bold text-base rounded-md "
				to="/auth/signup"
			>
				Join Today
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'CTA'
})
</script>
