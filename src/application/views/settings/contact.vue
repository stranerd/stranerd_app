<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>
		<div class="flex flex-col">
			<form class="card-padding !pt-0 border-bottom-line flex flex-col !gap-4" @submit.prevent="createMessage">
				<template v-if="!user">
					<div class="flex gap-4 flex-col lg:flex-row">
						<IonInput v-model="factory.firstName" placeholder="Your first name" required />
						<IonInput v-model="factory.lastName" placeholder="Your last name" required />
					</div>
					<IonInput v-model="factory.email" placeholder="Your email address" required />
				</template>
				<IonTextarea v-model="factory.message" placeholder="Tell us how we can help" required rows="3" />
				<IonButton class="btn-primary h-9" type="submit">
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
				class="card-padding !py-6 !gap-4 border-bottom-line flex items-center text-primaryBg"
				target="_blank">
				<IonIcon :icon="item.icon" />
				<span>{{ item.name }}</span>
			</a>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { logoInstagram, logoTwitter, logoWhatsapp, mailOutline, paperPlaneOutline } from 'ionicons/icons'
import { useCreateMessage } from '@app/composable/forms/messages'
import { useAuth } from '@app/composable/auth/auth'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'

export default defineComponent({
	name: 'SettingsContact',
	components: { SettingsPanel },
	setup () {
		useRouteMeta('Contact Us', { back: true })
		const { user } = useAuth()
		const { factory, loading, error, createMessage } = useCreateMessage()
		return {
			user, factory, loading, error, createMessage,
			logoInstagram, logoWhatsapp, logoTwitter, mailOutline, paperPlaneOutline
		}
	}
})
</script>
