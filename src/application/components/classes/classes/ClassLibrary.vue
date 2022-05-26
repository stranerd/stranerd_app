<template>
	<div class="showcase-flex">
		<div class="flex flex-col md:flex-row justify-between gap-2 px-4 md:py-4 bg-white rounded-xl">
			<div class="hidden md:block">
				<ion-text class="block text-heading font-semibold capitalize">Class Library</ion-text>
				<ion-text class="text-sub">
					{{ discussions.length }} {{ pluralize(discussions.length, 'item', 'items') }}
				</ion-text>
			</div>
			<div class="flex gap-2 w-full md:w-auto">
				<ion-input v-model="search" class="flex-grow md:w-auto bg-new_gray text-gray min-w-[100px]"
					placeholder="Search" />
				<ion-select v-model="group"
					class="bg-new_gray !text-gray flex-grow md:w-auto font-bold"
					interface="action-sheet"
					placeholder="Groups">
					<ion-select-option class="capitalize" value="">
						All
					</ion-select-option>
					<ion-select-option v-for="group in groups" :key="group.hash" :value="group.id" class="capitalize">
						{{ group.name }}
					</ion-select-option>
				</ion-select>
				<ion-select v-model="filter"
					class="bg-new_gray !text-gray flex-grow md:w-auto font-bold"
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
import { useGroupList } from '@app/composable/classes/groups'

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
		const { groups } = useGroupList(props.classInst.id)
		const filters = ['All', 'Images', 'Videos', 'Documents', 'Links']
		const filter = ref(filters[0])
		const group = ref('')
		const search = ref('')
		const filteredDiscussions = computed(() => discussions.value.filter((d) => {
			const matches = [d.search(search.value)] as boolean[]
			if (group.value) matches.push(d.groupId === group.value)
			if (filter.value === filters[1]) matches.push(d.isImage)
			if (filter.value === filters[2]) matches.push(d.isVideo)
			if (filter.value === filters[3]) matches.push(d.isDocument)
			if (filter.value === filters[4]) matches.push(d.links.length > 0)
			return matches.every((m) => m)
		}))
		return {
			loading, error, discussions: filteredDiscussions, pluralize,
			search, filter, filters, group, groups
		}
	}
})
</script>
