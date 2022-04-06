<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:py-8 flex flex-col md:gap-4 max-w-[1000px]">
			<router-link v-for="item in [
					{ name: 'Privacy policy', route: '/legal/privacy-policy' },
					{ name: 'Terms & Conditions', route: '/legal/terms-and-conditions' },
				]" :key="item.route" :to="item.route"
				class="md:rounded-xl md:bg-white p-4 border-bottom-line text-primary font-semibold">
				{{ item.name }}
			</router-link>
			<span class="p-4">© 2022 Stranerd LLC</span>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'

export default defineComponent({
	name: 'SettingsAbout',
	displayName: 'About',
	components: { Justified }
})
</script>
