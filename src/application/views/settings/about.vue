<template>
	<DefaultLayout>
		<div class="flex flex-col">
			<router-link v-for="item in [
					{ name: 'Privacy policy', route: '/legal/privacy-policy' },
					{ name: 'Terms & Conditions', route: '/legal/terms-and-conditions' },
				]" :key="item.route" :to="item.route"
				class="px-4 py-6 border-bottom-line text-primaryBg">
				{{ item.name }}
			</router-link>
			<span class="p-4">© 2022 Stranerd LLC</span>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SettingsAbout',
	setup () {
		useRouteMeta('About', { back: true })
	}
})
</script>
