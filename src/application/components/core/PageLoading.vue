<template>
	<ion-loading :is-open="true" message="Please wait..." style="z-index: 10000000000; position: fixed;" />
</template>

<script>
import { defineComponent } from 'vue'
import { IonLoading } from '@ionic/vue'

export default defineComponent({
	name: 'PageLoading',
	components: { IonLoading }
})
</script>
