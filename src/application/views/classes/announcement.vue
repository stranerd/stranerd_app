<template>
	<classWrapper>
		<!-- <ExploreFlashCardsList /> -->

		<h1>
			classAnnouncement
		</h1>
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'classAnnouncement',
	displayName: 'Classes',
	components: { classWrapper }
})
</script>
