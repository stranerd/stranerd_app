<template>
	<span @click.prevent="openSaveModal(entity)">
		<slot :isSaved="isSaved">
			<IonIcon :class="{ 'text-primaryBg': isSaved }" :icon="isSaved ? bookmark : bookmarkOutline" />
		</slot>
	</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { bookmark, bookmarkOutline } from 'ionicons/icons'
import { openSaveModal } from '@app/composable/study/menus'
import { FlashCardEntity, NoteEntity, TestPrepEntity } from '@modules/study'
import { QuestionEntity } from '@modules/questions'

type Saveable = FlashCardEntity | NoteEntity | TestPrepEntity | QuestionEntity

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
