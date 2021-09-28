<template>
	<div class="col-span-12 grid grid-cols-12 my-20 md:h-[700px] h-[740px]">
		<div class="col-span-12 lg:col-start-5 lg:col-end-9 flex flex-col justify-center items-center">
			<div class="flex flex-col justify-center items-center">
				<img class="lg:w-full md:w-10/12  w-11/12 mb-[-409px]" src="@app/assets/images/homepage/yellow_bubble.svg">
				<div class="flex flex-col justify-center items-center w-11/12 md:w-auto" style="position: absolute;">
					<div class="py-5 text-center mb-6">
						<h1 class="font-bold text-heading md:text-3xl text-lg">
							Get in touch with us
						</h1>
					</div>
					<MessageForm />
					<div class="drop-shadow-xl py-4 px-3 w-full bg-white my-10 rounded-xl grid grid-cols-2">
						<div class="col-span-2 md:col-span-1 md:py-0 py-1 flex flex-row justify-center items-center">
							<img class="md:w-9 w-7 mr-1" src="@app/assets/images/homepage/call.svg">
							<a v-if="isNigerian" href="tel:+2348130322791" class="md:text-lg text-sm font-medium text-gray-500">+234 813 032-2791</a>
							<a v-else href="tel:+14044035611" class="font-medium text-gray-500 md:text-lg text-sm">+1 (404) 403-5611</a>
						</div>
						<div class="col-span-2 md:col-span-1 md:py-0 py-1 flex flex-row justify-center items-center">
							<img class="md:w-9 w-7 mr-1" src="@app/assets/images/homepage/message.svg">
							<a href="mailto:support@stranerd.com" class="font-medium text-gray-500 md:text-lg text-sm">support@stranerd.com</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MessageForm from '@app/components/forms/MessageForm.vue'
import { useAuth } from '@/application/hooks/auth/auth'

export default defineComponent({
	name: 'ContactUs',
	components: { MessageForm },
	setup () {
		const isNigerian = computed({
			get: () => useAuth().location.value?.countryCode === 'NG',
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		return { isNigerian }
	}
})
</script>
