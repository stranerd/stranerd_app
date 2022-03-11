<template>
	<div class="showcase-flex">
		<div class="flex flex-col md:flex-row justify-between gap-2 px-4 md:py-4 bg-white rounded-xl">
			<div class="hidden md:block">
				<ion-text class="block heading lg:text-2xl font-semibold capitalize">Class Library</ion-text>
				<ion-text class="text-sm">
					{{ discussions.length }} {{ pluralize(discussions.length, 'item', 'items') }}
				</ion-text>
			</div>
			<div class="flex gap-2 w-full md:w-auto">
				<ion-input v-model="search" class="flex-grow md:w-auto bg-new_gray text-gray" placeholder="Search" />
				<ion-select v-model="filter"
					class="bg-new_gray !text-gray flex-grow md:w-auto font-bold select-primary"
					interface="action-sheet"
					placeholder="Filter">
					<ion-select-option v-for="filter in filters" :key="filter" :value="filter" class="capitalize">
						{{ filter }}
					</ion-select-option>
				</ion-select>
			</div>
		</div>
		<EmptyState v-if="!loading && !error && discussions.length === 0" :info="'No matching files in the library'" />
		<ClassDiscussionCard v-for="discussion in discussions" :key="discussion.hash" :discussion="discussion" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity } from '@modules/classes'
import ClassDiscussionCard from '@app/components/classes/classes/ClassDiscussionCard.vue'
import { useClassDiscussions } from '@app/composable/classes/discussions'
import { pluralize } from '@utils/commons'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'ClassLibrary',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { ClassDiscussionCard, IonSelect, IonSelectOption },
	setup (props) {
		const { loading, error, discussions } = useClassDiscussions(props.classInst.id)
		const filters = ['All', 'Images', 'Videos', 'Documents']
		const filter = ref(filters[0])
		const search = ref('')
		const filteredDiscussions = computed(() => discussions.value.filter((d) => {
			if (!d.search(search.value)) return false
			if (filter.value === filters[1]) return d.isImage
			if (filter.value === filters[2]) return d.isVideo
			if (filter.value === filters[3]) return d.isDocument
			return true
		}))
		return {
			loading, error, discussions: filteredDiscussions, pluralize,
			search, filter, filters
		}
	}
})
</script>
