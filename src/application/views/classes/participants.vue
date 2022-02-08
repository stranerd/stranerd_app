<template>
	<classWrapper>

		<h1>
			classParticipants
		</h1>
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'classParticipants',
	displayName: 'Classes',
	components: { classWrapper }
})
</script>
