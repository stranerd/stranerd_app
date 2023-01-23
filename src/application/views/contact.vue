<template>
	<HomeLayout>
		<div
			class="contact_header text-primaryText text-center h-[72px] md:h-[100px] w-full relative flex items-center justify-center">
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

<style lang="scss" scoped>
.contact_header {
	background: rgb(5 9 13 / 50%) url("@app/assets/images/newLanding/contact_header_banner.png") center 25%;
	background-size: cover;
	background-blend-mode: darken;
}

@media screen and (min-width: 768px) {
	.contact_header {
		background-position: center 30%;
	}
}

</style>
