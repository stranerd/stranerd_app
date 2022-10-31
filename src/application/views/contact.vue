<template>
	<HomeLayout>
		<div class="contact_header text-primaryText text-center h-[72px] md:h-[100px] w-full relative flex items-center justify-center">
			<div class="overlay absolute top-0 left-0 w-full h-full bg-[rgba(5,9,13,.500)] "></div>
			<h1 class="relative text-2xl md:text-5xl font-bold">Contact us</h1>
		</div>
		<Contact />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import Contact from '@app/components/landing/contact/index.vue'

export default defineComponent({
	name: 'PageContact',
	components: { Contact },
	setup () {
		useRouteMeta('Contact', {})
	}
})
</script>

<style scoped>
.contact_header{
	background-image: url('@/assets/images/newLanding/contact_header_banner.png');
	background-size: cover;
	background-position: center 25%;
}

@media screen and (min-width: 768px) {
	.contact_header{
		background-position: center 30%;
	}
}

</style>
