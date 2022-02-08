<template>
	<classWrapper>
		<ExploreFlashCardsList />
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'

export default defineComponent({
	name: 'ClassFlashCards',
	displayName: 'Classes',
	components: { classWrapper, ExploreFlashCardsList }
})
</script>
