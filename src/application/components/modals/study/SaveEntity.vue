<template>
	<Modal>
		<template v-slot:title>
			Save to
		</template>
		<div class="flex flex-col">
			<router-link class="ml-auto flex gap-1 items-center" to="/study/sets/create">
				<IonIcon :icon="add" />
				<span>Create Folder</span>
			</router-link>
			<div v-if="sets.length === 0" class="text-center text-xl">
				No folders created. Go create one before you can save items
			</div>
			<div v-for="set in sets" :key="set.hash" class="flex gap-2 items-center border-bottom-line py-4 text-xl">
				<IonIcon :icon="folderOutline" />
				<IonText class="w-fit flex-grow truncate">{{ set.name }}</IonText>
				<IonIcon :icon="set.allSaved.includes(entity.id) ? bookmark : bookmarkOutline"
					@click="set.allSaved.includes(entity.id) ? removeFromSet(type, entity.id, set) : saveToSet(type, entity.id, set)"
				/>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSaveModalData } from '@app/composable/study/menus'
import { useUserSetList } from '@app/composable/users/users/sets'
import { useSaveToSet } from '@app/composable/study/sets'
import { add, bookmark, bookmarkOutline, folderOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SaveEntity',
	setup () {
		const { entity, type } = useSaveModalData()
		const { loading, error, sets } = useUserSetList()
		const { loading: saveLoading, error: saveError, saveToSet, removeFromSet } = useSaveToSet()
		return {
			entity, type, loading, error, sets, saveLoading, saveError, saveToSet, removeFromSet,
			add, bookmark, bookmarkOutline, folderOutline
		}
	}
})
</script>
