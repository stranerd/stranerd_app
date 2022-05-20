<template>
	<IonSpinner />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonSpinner } from '@ionic/vue'

export default defineComponent({
	name: 'SpinLoading',
	components: { IonSpinner }
})
</script>
