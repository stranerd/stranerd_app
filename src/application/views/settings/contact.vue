<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:py-8 flex flex-col md:gap-4 max-w-[1000px]">
			<a v-for="item in [
					{ name: 'Email', icon: mailOutline, route: 'mailto:support@stranerd.com' },
					{ name: 'Whatsapp', icon: logoWhatsapp, route: 'https://wa.me/+2348074502158' },
					{ name: 'Twitter', icon: logoTwitter, route: 'https://twitter.com/stranerds' },
					{ name: 'Instagram', icon: logoInstagram, route: 'https://www.instagram.com/stranerdapp' }
				]" :key="item.route" :href="item.route"
				class="md:rounded-xl md:bg-white p-4 border-bottom-line flex gap-4 items-center text-primary"
				target="_blank">
				<IonIcon :icon="item.icon" class="text-2xl" />
				<span class="font-semibold">{{ item.name }}</span>
			</a>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { logoInstagram, logoTwitter, logoWhatsapp, mailOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SettingsContact',
	displayName: 'Contact Use',
	components: { Justified },
	setup () {
		return {
			logoInstagram, logoWhatsapp, logoTwitter, mailOutline
		}
	}
})
</script>
