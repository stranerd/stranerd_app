<template>
	<div class="showcase-flex">
		<div class="flex flex-col md:flex-row justify-between gap-2 px-4 md:py-4 rounded-xl">
			<div class="hidden md:block">
				<IonText class="block text-xl font-semibold capitalize">Class Library</IonText>
				<IonText class="text-sm">
					{{ chats.length }} {{ pluralize(chats.length, 'item', 'items') }}
				</IonText>
			</div>
			<div class="flex gap-2 w-full md:w-auto">
				<IonInput v-model="search" class="flex-grow md:w-auto min-w-[100px]"
					placeholder="Search" />
				<IonSelect v-model="group"
					class="flex-grow md:w-auto font-bold"
					interface="action-sheet"
					placeholder="Groups">
					<IonSelectOption class="capitalize" value="">
						All
					</IonSelectOption>
					<IonSelectOption v-for="group in groups" :key="group.hash" :value="group.id" class="capitalize">
						{{ group.name }}
					</IonSelectOption>
				</IonSelect>
				<IonSelect v-model="filter"
					class="flex-grow md:w-auto font-bold"
					interface="action-sheet"
					placeholder="Filter">
					<IonSelectOption v-for="filter in filters" :key="filter" :value="filter" class="capitalize">
						{{ filter }}
					</IonSelectOption>
				</IonSelect>
			</div>
		</div>
		<EmptyState v-if="!loading && !error && chats.length === 0" :info="'No matching files in the library'" />
		<ClassLibraryCard v-for="chat in chats" :key="chat.hash" :chat="chat" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity } from '@modules/classes'
import ClassLibraryCard from '@app/components/classes/classes/ClassLibraryCard.vue'
import { pluralize } from '@utils/commons'
import { useGroupList } from '@app/composable/classes/groups'
import { useClassLibrary } from '@app/composable/messaging/chats'
import { ChatType } from '@modules/messaging'

export default defineComponent({
	name: 'ClassLibrary',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { ClassLibraryCard },
	setup (props) {
		const { loading, error, chats } = useClassLibrary(props.classInst.id)
		const { groups } = useGroupList(props.classInst.id)
		const filters = ['All', 'Images', 'Videos', 'Documents', 'Links']
		const filter = ref(filters[0])
		const group = ref('')
		const search = ref('')
		const filteredChats = computed(() => chats.value.filter((c) => {
			const matches = [c.search(search.value)] as boolean[]
			if (group.value) matches.push(c.data.type === ChatType.classes && c.to === group.value)
			if (filter.value === filters[1]) matches.push(c.isImage)
			if (filter.value === filters[2]) matches.push(c.isVideo)
			if (filter.value === filters[3]) matches.push(c.isDocument)
			if (filter.value === filters[4]) matches.push(c.links.length > 0)
			return matches.every((m) => m)
		}))
		return {
			loading, error, chats: filteredChats, pluralize,
			search, filter, filters, group, groups
		}
	}
})
</script>
