<template>
	<IonText class="flex gap-1 items-center">
		<span>{{ name }}</span>
		<IonIcon v-if="isTutor" :icon="checkmarkCircle" class="text-primaryBg" style="font-size: 1.2em;" />
	</IonText>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { checkmarkCircle } from 'ionicons/icons'

export default defineComponent({
	name: 'UserName',
	props: {
		name: {
			type: String,
			required: true
		},
		isTutor: {
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
