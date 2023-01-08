<template>
	<div class="w-full  h-auto flex bg-primaryText py-12 ">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-between">
			<div class="flex flex-col md:gap-5 gap-3 lg:max-w-[47%]">
				<h2 class="md:text-4xl text-2xl font-bold">Download our App</h2>
				<p class="md:text-lg text-sm">
					Wherever you may be, carry Stranerd in your pocket. Get full access from anywhere at anytime with
					your mobile phone.
				</p>
				<div class="flex gap-4 items-center">
					<a :href="PLAYSTORE_LINK" class="overflow-hidden"
						rel="noopener noreferrer" target="_blank">
						<img alt="playstore button" class="md:h-16" src="@/assets/images/newLanding/play_store.svg" />
					</a>
					<a :href="APPSTORE_LINK" class="overflow-hidden"
						rel="noopener noreferrer" target="_blank">
						<img alt="playstore button" class="md:h-16" src="@/assets/images/newLanding/apple_store.svg" />
					</a>
				</div>
			</div>
			<div class="w-auto lg:w-1/2 relative">
				<img alt="hero" class=" rounded-2xl" src="@/assets/images/newLanding/mobile_phone.png" />
				<img alt="app_preview" class="w-[46%] absolute top-[19%] left-[35%]"
					src="@/assets/images/newLanding/app_preview.png">
			</div>

		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { APPSTORE_LINK, PLAYSTORE_LINK } from '@utils/constants'

export default defineComponent({
	setup () {
		return { APPSTORE_LINK, PLAYSTORE_LINK }
	}
})
</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs;
}
</style>
