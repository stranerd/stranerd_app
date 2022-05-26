<template>
	<div class="flex flex-col gap-4 py-4">
		<div class="flex flex-col justify-between gap-2 px-4">
			<div class="flex items-center gap-2">
				<IonIcon :icon="folderOpenOutline" class="text-6xl" />
				<div class="flex flex-col">
					<IonText class="text-heading font-semibold capitalize">{{ set.name }}</IonText>
					<IonText class="text-sub">{{ set.allSaved.length }}
						{{ pluralize(set.allSaved.length, 'item', 'items') }}
					</IonText>
				</div>
			</div>
			<div class="flex gap-2 w-full">
				<div class="flex-grow">
					<IonInput v-model="search" class="w-full" placeholder="Search for items" />
				</div>
				<div class="flex-grow">
					<IonSelect v-model="filter"
						class="w-full font-bold"
						interface="action-sheet"
						placeholder="Filter">
						<IonSelectOption v-for="filter in filters" :key="filter" :value="filter" class="capitalize">
							{{ filter }}
						</IonSelectOption>
					</IonSelect>
				</div>
			</div>
		</div>
		<EmptyState v-if="!set.allSaved.length" info="This folder is empty" />
		<div v-if="set.allSaved.length" class="showcase">
			<template v-if="['All', 'Test Preps'].includes(filter)">
				<TestPrepListCard v-for="testPrep in filteredTestPreps" :key="testPrep.hash" :testPrep="testPrep"
					class="border-bottom-line" />
			</template>
			<template v-if="['All', 'Flashcards'].includes(filter)">
				<FlashCardListCard v-for="flashCard in filteredFlashCards" :key="flashCard.hash"
					:flashCard="flashCard" class="border-bottom-line" />
			</template>
			<template v-if="['All', 'Documents'].includes(filter)">
				<DocumentListCard v-for="document in filteredDocuments" :key="document.hash" :document="document"
					class="border-bottom-line" />
			</template>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { SetEntity } from '@modules/study'
import { useSet } from '@app/composable/study/sets'
import { pluralize } from '@utils/commons'
import { folderOpenOutline } from 'ionicons/icons'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import DocumentListCard from '@app/components/study/documents/DocumentListCard.vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'SetView',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	components: {
		IonSelect,
		IonSelectOption,
		TestPrepListCard,
		FlashCardListCard,
		DocumentListCard,
		SetListCard
	},
	setup (props) {
		const { loading, error, documents, flashCards, testPreps } = useSet(props.set)
		const filters = ['All', 'Test Preps', 'Flashcards', 'Documents']
		const filter = ref(filters[0])
		const search = ref('')
		const filteredTestPreps = computed(() => testPreps.value.filter((prep) => prep.search(search.value)))
		const filteredFlashCards = computed(() => flashCards.value.filter((flashCard) => flashCard.search(search.value)))
		const filteredDocuments = computed(() => documents.value.filter((document) => document.search(search.value)))
		return {
			loading, error, folderOpenOutline, documents, flashCards, testPreps, pluralize,
			filter, filters, search, filteredTestPreps, filteredFlashCards, filteredDocuments
		}
	}
})
</script>
