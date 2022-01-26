<template>
	<PageWrapper>
		<template v-slot="{ set, flashCards }">
			<SetFlashCardsList :flashCards="flashCards" :set="set" />
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import SetFlashCardsList from '@app/components/study/flashCards/SetFlashCardsList.vue'

export default defineComponent({
	name: 'StudySetsSetIdFlashCards',
	displayName: 'Study Set',
	components: { PageWrapper, SetFlashCardsList }
})
</script>
