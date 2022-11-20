<template>
	<div class="w-full lg:min-h-[696px] h-auto flex py-12 md:py-28 bg-primaryText">
		<div
			class="container mx-auto p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<h2 class="md:text-4xl text-2xl font-bold">Get in touch</h2>
				<p class="text-sm md:text-xl">
					Want to find out more information? Let us know how we can help you by filling out this form.
				</p>
			</div>

			<div class="w-full md:max-w-xl lg:w-[50%] shadow-xl p-5 rounded-xl">
				<ContactForm />
			</div>
		</div>
	</div>
	<div class="w-full h-auto flex items-center justify-center bg-primaryBg px-6 py-12">
		<div>
			<p class="text-primaryText text-xl md:text-3xl mb-6 text-center">Check out some frequently asked questions</p>
			<router-link to="/" class="btn bg-primaryText text-primaryBg mx-auto">
				FAQs
			</router-link>
		</div>
	</div>
	<App/>
	<Testimonial/>
	<Supported/>
	
</template>

<script lang="ts" setup>
import { logoFacebook, logoInstagram, logoTwitter, mail, logoWhatsapp } from 'ionicons/icons'
import ContactForm from './ContactForm.vue'
import App from '../App.vue'
import Testimonial from '../Testimonial.vue'
import Supported from '../Supported.vue'
import FaqsList from './FaqsList.vue'
import { ref } from 'vue'

const userType = ref('')
const contactLinks = [
	{ icon: mail, text: 'Mail', route: 'mailto:support@stranerd.com' },
	{ icon: logoFacebook, text: 'Facebook', route: 'https://facebook.com/officialstranerd' },
	{ icon: logoInstagram, text: 'Instagram', route: 'https://www.instagram.com/stranerdapp/' },
	{ icon: logoTwitter, text: 'Twitter', route: 'https://twitter.com/stranerds' },
	{ icon: logoWhatsapp, text: 'Whatsapp', route: 'https://api.whatsapp.com/send?phone=+2348130322791' }
]

</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
.btn {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>