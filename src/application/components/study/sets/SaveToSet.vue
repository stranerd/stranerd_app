<template>
	<a class="mt-1.5" @click.prevent="openSaveModal(entity)">
		<slot :isSaved="isSaved">
			<IonIcon :class="{ 'text-primaryBg': isSaved }" :icon="isSaved ? bookmark : bookmarkOutline" />
		</slot>
	</a>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { bookmark, bookmarkOutline } from 'ionicons/icons'
import { openSaveModal } from '@app/composable/study/menus'
import { FlashCardEntity, NoteEntity, TestPrepEntity } from '@modules/study'
import { QuestionEntity } from '@modules/questions'

type Saveable = FlashCardEntity | NoteEntity | TestPrepEntity | QuestionEntity

const props = defineProps({
	entity: {
		type: Object as PropType<Saveable>,
		required: true
	}
})

const { sets } = useUserSetList()
const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.entity.id)))
</script>
