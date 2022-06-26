<template>
	<div class="flex flex-col py-4 text-secondaryText">
		<div class="bg-itemBg -mx-4 py-2 px-4 pl-8">
			All subjects
		</div>
		<span v-for="(item, n) in ['Agriculture', 'Clinical Sciences', 'Dental Sciences', 'Education', 'Engineering']" :key="n" 
			class="p-4 mr-0 flex items-center gap-4">
			<span>{{ item }}</span>
			<IonIcon :icon="chevronForwardOutline" class="ml-auto"/>
		</span>

		<!-- <PageLoading v-if="loading" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {chevronForwardOutline} from 'ionicons/icons'

export default defineComponent({
	name: 'SettingsView',
	setup () {
		return {

			chevronForwardOutline,
		}
	}
})
</script>
