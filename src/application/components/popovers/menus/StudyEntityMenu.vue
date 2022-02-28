<template>
	<Popover class="flex flex-col gap-4">
		<template v-if="isLoggedIn  && entity.userId !== id">
			<SaveToSet v-if="!data.set || data?.set?.userId !== id" :itemId="entity?.id" :root="true"
				:save="(set) => saveToSet(type, entity?.id, set)"
				:unsave="(set) => removeFromSet(type, entity?.id, set)" />
			<span v-else-if="data.set.allSaved.includes(entity?.id)" class="flex gap-4 items-center"
				@click="removeFromSet(type, entity?.id, data.set)">
				<ion-icon :icon="removeCircle" class="text-2xl" />
				<ion-label class="font-bold">Unsave In Folder</ion-label>
			</span>
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
	chevronDown,
	chevronUp,
	library,
	pencil,
	person,
	removeCircle,
	shareSocial as shareIcon,
	trash
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { openSetEditModal, useSaveToSet } from '@app/composable/study/sets'
import { openFlashCardEditModal } from '@app/composable/study/flashCards'
import { useRouter } from 'vue-router'
import { openNoteEditModal } from '@root/application/composable/study/notes'
import { openTestPrepEditModal } from '@app/composable/study/testPreps'
import { openVideoEditModal } from '@app/composable/study/videos'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'StudyEntityMenu',
	components: { SaveToSet },
	setup () {
		const { id, isLoggedIn, isAdmin } = useAuth()
		const router = useRouter()

		const { entity, type, data, share } = useStudyMenuData()
		const showDelete = computed(() => type.value === 'testPreps' ? isAdmin.value : entity.value?.userId === id.value)
		const { loading: deleteLoading, error: deleteError, deleteEntity } = useDeleteStudyEntity()

		const { loading: setLoading, error: setError, saveToSet, removeFromSet } = useSaveToSet()

		const canEdit = computed(() => type.value === 'testPreps' ? isAdmin.value : entity.value?.userId === id.value)
		const editEntity = async () => {
			if (type.value === 'flashCards') await openFlashCardEditModal(entity.value as any, router)
			if (type.value === 'notes') await openNoteEditModal(entity.value as any, router)
			if (type.value === 'videos') await openVideoEditModal(entity.value as any, router)
			if (type.value === 'testPreps') await openTestPrepEditModal(entity.value as any)
			if (type.value === 'sets') await openSetEditModal(entity.value as any)
		}

		const showAddToSet = ref(false)

		return {
			entity, type, data,
			chevronUp, chevronDown, library, shareIcon, pencil, person, trash, removeCircle,
			share, id, isLoggedIn,
			showDelete, deleteLoading, deleteError, deleteEntity, canEdit, editEntity,
			setLoading, setError, saveToSet, removeFromSet, showAddToSet
		}
	}
})
</script>

<style scoped>
	ion-icon, ion-label, span {
		cursor: pointer;
	}
</style>
