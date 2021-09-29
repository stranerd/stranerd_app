<template>
	<div class="bg-primary px-1  text-white col-span-12 grid grid-cols-12 py-16">
		<div class="col-span-12 lg:col-start-3 lg:col-end-11 grid grid-cols-2">
			<div class="col-span-2 md:col-span-1 flex flex-row justify-center items-center">
				<img src="@app/assets/images/homepage/stress_free.png" class="md:w-9/12 w-8/12">
			</div>
			<div class="col-span-2 md:col-span-1 px-3 py-8 md:py-0  flex flex-col justify-center md:items-start items-center">
				<div class="text-white w-5/6 md:text-xl text-sm md:text-left text-center">
					Do away with academic stress because you can share all your problems here!
				</div>
				<div class="mt-9">
					<NuxtLink class=" md:px-8 md:py-4 py-3 px-4 bg-white text-primary font-bold md:text-lg text-sm rounded-md" to="/auth/signup">
						Sign Up
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Connect'
})
</script>
