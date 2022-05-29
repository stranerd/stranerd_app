<template>
	<Justified>
		<div class="flex flex-col">
			<form class="p-4 border-bottom-line flex flex-col gap-4" @submit.prevent="createMessage">
				<template v-if="!user">
					<div class="flex gap-4 flex-col md:flex-row">
						<IonInput v-model="factory.firstName" placeholder="Your first name" required />
						<IonInput v-model="factory.lastName" placeholder="Your last name" required />
					</div>
					<IonInput v-model="factory.email" placeholder="Your email address" required />
				</template>
				<IonTextarea v-model="factory.message" placeholder="Tell us how we can help" required rows="3" />
				<IonButton class="btn-primary" type="submit">
					<IonIcon slot="start" :icon="paperPlaneOutline" />
					Send
				</IonButton>
			</form>
			<a v-for="item in [
					{ name: 'Email', icon: mailOutline, route: 'mailto:support@stranerd.com' },
					{ name: 'Whatsapp', icon: logoWhatsapp, route: 'https://wa.me/+2348074502158' },
					{ name: 'Twitter', icon: logoTwitter, route: 'https://twitter.com/stranerds' },
					{ name: 'Instagram', icon: logoInstagram, route: 'https://www.instagram.com/stranerdapp' }
				]" :key="item.route" :href="item.route"
				class="px-4 py-6 border-bottom-line flex gap-4 items-center text-primaryBg"
				target="_blank">
				<IonIcon :icon="item.icon" class="text-heading3" />
				<span>{{ item.name }}</span>
			</a>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { logoInstagram, logoTwitter, logoWhatsapp, mailOutline, paperPlaneOutline } from 'ionicons/icons'
import { useCreateMessage } from '@app/composable/forms/messages'
import { useAuth } from '@app/composable/auth/auth'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SettingsContact',
	components: { Justified },
	setup () {
		useRouteMeta('Contact Us')
		const { user } = useAuth()
		const { factory, loading, error, createMessage } = useCreateMessage()
		return {
			user, factory, loading, error, createMessage,
			logoInstagram, logoWhatsapp, logoTwitter, mailOutline, paperPlaneOutline
		}
	}
})
</script>
