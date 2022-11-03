<template>
	<div class="w-full lg:min-h-[696px] h-auto flex py-12 md:py-28">
		<div
			class="container mx-auto p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Get in touch</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Make an enquiry</h2>
				<p class="text-lg">
					Want to find out more information? Let us know how we can help you by filling out this form.
				</p>
			</div>

			<div class="w-full md:max-w-xl lg:w-[50%] bg-bodyBg shadow-xl p-5 rounded-xl">
				<ContactForm />
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg text-primaryText py-12 md:py-28">
		<div
			class="container mx-auto p-6 flex flex-col gap-6 lg:gap-16 items-center justify-center">
			<h2 class="lg:text-5xl text-3xl font-bold text-bodyBg lg:leading-[62px]">Contact links</h2>

			<div class="flex flex-wrap items-center justify-center md:gap-5 gap-3">
				<a v-for="item in contactLinks" :key="item.icon" :href="item.route"
					class="md:h-56 md:w-56 h-28 w-28 rounded-2xl bg-primaryText text-primaryBg flex items-center justify-center"
					target="_blank"
				>
					<div class="flex flex-col items-center justify-center gap-3">
						<IonIcon :icon="item.icon" class="text-2xl md:text-5xl font-bold" />
						<p class="text-md md:text-xl">{{ item.text }}</p>
					</div>
				</a>
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex py-12 md:py-28">
		<div
			class="container mx-auto p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-start justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Need to know</span>
				<h2 class="lg:text-5xl text-3xl font-bold text-primaryBg lg:leading-[62px]">
					Frequently asked questions
				</h2>
			</div>

			<div class="flex flex-col w-full md:max-w-xl lg:w-[50%] ">
				<FaqsList/>
			</div>
		
		</div>
	</div>
</template>

<script lang="ts" setup>
import { logoFacebook, logoInstagram, logoTwitter, mail, logoWhatsapp } from 'ionicons/icons'
import ContactForm from './ContactForm.vue'
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
