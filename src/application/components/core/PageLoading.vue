<template>
	<ion-loading :is-open="true" message="Please wait..." />
</template>

<script>
import { defineComponent } from 'vue'
import { IonLoading } from '@ionic/vue'

export default defineComponent({
	name: 'PageLoading',
	components: { IonLoading }
})
</script>
