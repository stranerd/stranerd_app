<template>
	<Modal>
		<template v-slot:title>
			Save to
		</template>
		<div class="flex flex-col gap-4 mx-auto text-gray">
			<router-link class="hidden ml-auto flex gap-1 items-center" to="/study/sets/create">
				<IonIcon :icon="add" class="text-3xl" />
				Create Folder
			</router-link>
			<div v-if="sets.length === 0" class="text-center text-lg">
				No folders created. Go create one before you can save items
			</div>
			<div v-for="set in sets" :key="set.hash" class="flex justify-between gap-2 items-center">
				<IonIcon :icon="folderOutline" class="text-2xl" />
				<IonText class="w-full truncate font-semibold text-lg">{{ set.name }}</IonText>
				<IonIcon :icon="set.allSaved.includes(entity.id) ? bookmark : bookmarkOutline" class="text-2xl"
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
