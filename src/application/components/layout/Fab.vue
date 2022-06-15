<template>
	<IonFab slot="fixed" horizontal="end" vertical="bottom">
		<IonFabButton color="primary">
			<IonIcon :icon="addOutline" />
		</IonFabButton>
	</IonFab>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Fab',
	setup () {
		return { addOutline }
	}
})
</script>
