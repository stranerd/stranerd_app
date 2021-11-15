<template>
	<ion-loading
		:duration="timeout"
		:is-open="true"
		message="Please wait..."
	>
	</ion-loading>
</template>

<script>
import { IonLoading } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		timeout: { type: Number, default: 100000 }
	},
	components: { IonLoading }
})
</script>
