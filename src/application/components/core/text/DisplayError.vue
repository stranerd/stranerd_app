<template>
	<ion-text v-if="error" class="text-sub text-red">
		{{ error }}
	</ion-text>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonText } from '@ionic/vue'

export default defineComponent({
	name: 'DisplayError',
	components: { IonText },
	props: {
		error: {
			type: String,
			required: true
		}
	}
})
</script>
