<template>
	<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl" @click.prevent="openSaveModal(entity)" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { bookmark, bookmarkOutline } from 'ionicons/icons'
import { openSaveModal } from '@app/composable/study/menus'
import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'

type Saveable = FlashCardEntity | NoteEntity | VideoEntity | TestPrepEntity | SetEntity

export default defineComponent({
	name: 'SaveToSet',
	props: {
		entity: {
			type: Object as PropType<Saveable>,
			required: true
		}
	},
	setup (props) {
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.entity.id)))
		return { bookmark, bookmarkOutline, isSaved, openSaveModal }
	}
})
</script>
