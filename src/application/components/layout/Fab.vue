<template>
	<IonFab slot="fixed" class="bottom-[5rem] right-[1rem]" horizontal="end" vertical="bottom">
		<IonFabButton @click="openModal">
			<IonIcon :icon="addOutline" />
		</IonFabButton>
	</IonFab>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline } from 'ionicons/icons'
import { useUserModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'Fab',
	setup () {
		const openModal = () => useUserModal().openFabMenu()
		return { addOutline, openModal }
	}
})
</script>

<style lang="scss" scoped>
ion-fab-button {
	--background: #{$color-primaryBg};
	--color: #{$color-primaryText};
	margin-bottom: env(safe-area-inset-bottom);
}
</style>
