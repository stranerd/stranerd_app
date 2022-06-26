<template>
	<div>
		<IonText class="font-bold text-2xl card-padding !pt-0">Settings</IonText>
		<SettingsView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SettingsView from '@app/components/users/settings/SettingsView.vue'

export default defineComponent({
	name: 'SettingsPanel',
	components: { SettingsView }
})
</script>
