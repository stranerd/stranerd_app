<template>
	<DefaultLayout :hideBottom="true" :hideFab="true" :hideTop="!loading && !!flashCard" :ignorePagePadding="true">
		<template v-slot:content-top>
			<div v-if="flashCard" />
		</template>
		<div class="h-full flex flex-col">
			<BlockLoading v-if="loading" class="page-padding" />
			<slot v-else-if="flashCard" :flashCard="flashCard" />
			<NotFound v-else title="Flashcard not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts" setup>
import { useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'

const { flashCardId } = useRoute().params
const { flashCard, error, loading } = useFlashCard(flashCardId as string)
</script>
