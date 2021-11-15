<template>
	<ExploreWrapper>
		<ExploreFlashcard/>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import ExploreFlashcard from '@app//components/study/explore/ExploreFlashcard.vue'

export default defineComponent({
	name: 'ExploreFlashCard',
	displayName: 'Profile',
	components: {  ExploreWrapper, ExploreFlashcard }
})
</script>
