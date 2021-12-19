<template>
	<div class="mx-auto py-6 px-8 flex flex-col text-gray">
		<template v-if="isLoggedIn">
			<template v-if="rootSet">
				<span v-if="rootSet.allSaved.includes(entity?.id)" class="my-4 flex gap-4 items-center"
					@click="removeFromSet(type, entity?.id, rootSet)">
					<ion-icon :icon="removeCircle" class="text-2xl" />
					<ion-label class="font-bold">Remove From Your Library</ion-label>
				</span>
				<span v-else class="my-4 flex gap-4 items-center" @click="saveToSet(type, entity?.id, rootSet)">
					<ion-icon :icon="library" class="text-2xl" />
					<ion-label class="font-bold">Add To Your Library</ion-label>
				</span>
			</template>

			<template v-if="normalSets.filter((s) => !s.saved[type].includes(entity?.id)).length">
				<span class="my-4 flex gap-4 items-center" @click="showAddToSet = !showAddToSet">
					<ion-icon :icon="showAddToSet ? chevronUp : folder" class="text-2xl" />
					<ion-label class="font-bold">Add To Study Set</ion-label>
				</span>
				<div v-if="showAddToSet" class="ml-6 mb-4">
					<span v-for="set in normalSets.filter((s) => !s.saved[type].includes(entity?.id))" :key="set.hash"
						class="mb-4 flex gap-4 items-center" @click="saveToSet(type, entity?.id, set)">
						<ion-icon :icon="folder" class="text-xl" />
						<ion-label class="font-bold">{{ set.name }}</ion-label>
					</span>
				</div>
			</template>

			<template v-if="normalSets.filter((s) => s.saved[type].includes(entity?.id)).length">
				<span class="my-4 flex gap-4 items-center" @click="showRemoveFromSet = !showRemoveFromSet">
					<ion-icon :icon="showRemoveFromSet ? chevronUp : removeCircle" class="text-2xl" />
					<ion-label class="font-bold">Remove From Study Set</ion-label>
				</span>
				<div v-if="showRemoveFromSet" class="ml-6 mb-4">
					<span v-for="set in normalSets.filter((s) => s.saved[type].includes(entity?.id))" :key="set.hash"
						class="mb-4 flex gap-4 items-center" @click="removeFromSet(type, entity?.id, set)">
						<ion-icon :icon="folder" class="text-xl" />
						<ion-label class="font-bold">{{ set.name }}</ion-label>
					</span>
				</div>
			</template>
		</template>
		<span v-if="showDelete" class="my-4 flex gap-4 items-center" @click="deleteEntity">
			<ion-icon :icon="trash" class="text-2xl" />
			<ion-label class="font-bold">Delete</ion-label>
		</span>
		<span class="my-4 flex gap-4 items-center" @click="share">
			<ion-icon :icon="shareIcon" class="text-2xl" />
			<ion-label class="font-bold">Share</ion-label>
		</span>
		<span v-if="entity?.userId !== id && type === 'flashCards'" class="my-4 flex gap-4 items-center"
			@click="goToAuthor">
			<ion-icon :icon="person" class="text-2xl" />
			<ion-label class="font-bold">Go To Author</ion-label>
		</span>
		<PageLoading v-if="deleteLoading" />
		<PageLoading v-if="setLoading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useMenuPopover } from '@app/composable/core/modals'
import { useDeleteStudyEntity, useStudyMenuData } from '@app/composable/study/menus'
import { chevronUp, folder, library, person, removeCircle, share as shareIcon, trash } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useRouter } from 'vue-router'
import { useMySets, useSaveToSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'StudyEntityMenu',
	setup () {
		const { id, isLoggedIn, isAdmin } = useAuth()
		const router = useRouter()
		const closeStudyEntityMenu = () => useMenuPopover().closeStudyEntityMenu()

		const { entity, type, data, share, shareLink } = useStudyMenuData()
		const goToAuthor = async () => {
			await router.push(shareLink.value)
			closeStudyEntityMenu()
		}
		const showDelete = computed(() => {
			if (type.value === 'testPreps') return isAdmin.value
			// @ts-ignore
			return entity.value?.userId
		})
		const { loading: deleteLoading, error: deleteError, deleteEntity } = useDeleteStudyEntity()

		const { rootSet, normalSets } = useMySets()
		const { loading: setLoading, error: setError, saveToSet, removeFromSet } = useSaveToSet()
		const showAddToSet = ref(false)
		const showRemoveFromSet = ref(false)

		return {
			entity, type, data,
			chevronUp, library, folder, shareIcon, person, trash, removeCircle,
			share, id, isLoggedIn, isAdmin, goToAuthor,
			showDelete, deleteLoading, deleteError, deleteEntity,
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
