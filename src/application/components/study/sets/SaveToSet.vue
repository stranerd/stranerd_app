<template>
	<IonIcon :class="{ 'text-primaryBg': isSaved }" :icon="isSaved ? bookmark : bookmarkOutline" class="text-heading2"
		@click.prevent="openSaveModal(entity)" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { bookmark, bookmarkOutline } from 'ionicons/icons'
import { openSaveModal } from '@app/composable/study/menus'
import { DocumentEntity, FlashCardEntity, SetEntity, TestPrepEntity } from '@modules/study'

type Saveable = FlashCardEntity | DocumentEntity | TestPrepEntity | SetEntity

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
