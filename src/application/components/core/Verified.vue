<template>
	<IonIcon v-if="verified" :icon="checkmarkCircle" class="text-primaryBg" style="font-size: 1.3em;" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { checkmarkCircle } from 'ionicons/icons'

export default defineComponent({
	name: 'Verified',
	props: {
		verified: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup () {
		return { checkmarkCircle }
	}
})
</script>
