<template>
	<IonLoading :is-open="true" message="Please wait..." style="z-index: 10000000000; position: fixed;" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageLoading'
})
</script>
