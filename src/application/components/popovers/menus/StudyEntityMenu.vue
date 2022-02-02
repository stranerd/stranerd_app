<template>
	<Popover class="flex flex-col gap-8">
		<template v-if="isLoggedIn">
			<template v-if="rootSet">
				<span v-if="rootSet.allSaved.includes(entity?.id)" class="flex gap-4 items-center"
					@click="removeFromSet(type, entity?.id, rootSet)">
					<ion-icon :icon="removeCircle" class="text-2xl" />
					<ion-label class="font-bold">Remove From Your Library</ion-label>
				</span>
				<span v-else class="flex gap-4 items-center" @click="saveToSet(type, entity?.id, rootSet)">
					<ion-icon :icon="library" class="text-2xl" />
					<ion-label class="font-bold">Add To Your Library</ion-label>
				</span>
			</template>

			<template v-if="normalSets.filter((s) => !s.saved[type]?.includes(entity?.id)).length">
				<span class="flex gap-4 items-center" @click="showAddToSet = !showAddToSet">
					<ion-icon :icon="showAddToSet ? chevronUp : folder" class="text-2xl" />
					<ion-label class="font-bold">Add To Study Set</ion-label>
				</span>
				<div v-if="showAddToSet" class="ml-6">
					<span v-for="set in normalSets.filter((s) => !s.saved[type]?.includes(entity?.id))" :key="set.hash"
						class="mb-4 flex gap-4 items-center" @click="saveToSet(type, entity?.id, set)">
						<ion-icon :icon="folder" class="text-xl" />
						<ion-label class="font-bold">{{ set.name }}</ion-label>
					</span>
				</div>
			</template>

			<template v-if="normalSets.filter((s) => s.saved[type]?.includes(entity?.id)).length">
				<span class="flex gap-4 items-center" @click="showRemoveFromSet = !showRemoveFromSet">
					<ion-icon :icon="showRemoveFromSet ? chevronUp : removeCircle" class="text-2xl" />
					<ion-label class="font-bold">Remove From Study Set</ion-label>
				</span>
				<div v-if="showRemoveFromSet" class="ml-6">
					<span v-for="set in normalSets.filter((s) => s.saved[type]?.includes(entity?.id))" :key="set.hash"
						class="mb-4 flex gap-4 items-center" @click="removeFromSet(type, entity?.id, set)">
						<ion-icon :icon="folder" class="text-xl" />
						<ion-label class="font-bold">{{ set.name }}</ion-label>
					</span>
				</div>
			</template>
		</template>
		<span v-if="canEdit" class="flex gap-4 items-center" @click="editEntity">
			<ion-icon :icon="pencil" class="text-2xl" />
			<ion-label class="font-bold">Edit</ion-label>
		</span>
		<span v-if="showDelete" class="flex gap-4 items-center" @click="deleteEntity">
			<ion-icon :icon="trash" class="text-2xl" />
			<ion-label class="font-bold">Delete</ion-label>
		</span>
		<span class="flex gap-4 items-center" @click="share">
			<ion-icon :icon="shareIcon" class="text-2xl" />
			<ion-label class="font-bold">Share</ion-label>
		</span>
		<router-link v-if="entity?.userId !== id && type !== 'testPreps'" :to="`/users/${entity?.userId ?? ''}`"
			class="flex gap-4 items-center">
			<ion-icon :icon="person" class="text-2xl" />
			<ion-label class="font-bold">Go To Author</ion-label>
		</router-link>
		<PageLoading v-if="deleteLoading" />
		<PageLoading v-if="setLoading" />
	</Popover>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useDeleteStudyEntity, useStudyMenuData } from '@app/composable/study/menus'
import {
	chevronUp,
	folder,
	library,
	pencil,
	person,
	removeCircle,
	shareSocial as shareIcon,
	trash
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useMySets, useSaveToSet } from '@app/composable/study/sets'
import { openFlashCardEditModal } from '@app/composable/study/flashCards'
import { useRouter } from 'vue-router'
import { openNoteEditModal } from '@root/application/composable/study/notes'
import { openTestPrepEditModal } from '@app/composable/study/testPreps'

export default defineComponent({
	name: 'StudyEntityMenu',
	setup () {
		const { id, isLoggedIn, isAdmin } = useAuth()
		const router = useRouter()

		const { entity, type, data, share } = useStudyMenuData()
		const showDelete = computed(() => {
			if (type.value === 'testPreps') return isAdmin.value
			// @ts-ignore
			return entity.value?.userId === id.value
		})
		const { loading: deleteLoading, error: deleteError, deleteEntity } = useDeleteStudyEntity()

		const { rootSet, normalSets } = useMySets()
		const { loading: setLoading, error: setError, saveToSet, removeFromSet } = useSaveToSet()
		const showAddToSet = ref(false)
		const showRemoveFromSet = ref(false)

		const canEdit = computed({
			get: () => entity.value?.userId === id.value,
			set: () => {
			}
		})

		const editEntity = async () => {
			if (type.value === 'flashCards') await openFlashCardEditModal(entity.value as any, router)
			if (type.value === 'notes') await openNoteEditModal(entity.value as any, router)
			if (type.value === 'testPreps') await openTestPrepEditModal(entity.value as any)
		}

		return {
			entity, type, data,
			chevronUp, library, folder, shareIcon, pencil, person, trash, removeCircle,
			share, id, isLoggedIn, isAdmin,
			showDelete, deleteLoading, deleteError, deleteEntity, canEdit, editEntity,
			rootSet, normalSets, setLoading, setError, saveToSet, removeFromSet, showAddToSet, showRemoveFromSet
		}
	}
})
</script>

<style scoped>
	ion-icon, ion-label, span {
		cursor: pointer;
	}
</style>
