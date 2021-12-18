<template>
	<div class="mx-auto py-6 px-8 flex flex-col text-gray">
		<span class="my-4 flex gap-4 items-center cursor-pointer">
			<ion-icon :icon="library" class="text-2xl"/>
			<ion-label class="font-bold">Add To Your Library</ion-label>
		</span>
		<span class="my-4 flex gap-4 items-center cursor-pointer">
			<ion-icon :icon="removeCircle" class="text-2xl"/>
			<ion-label class="font-bold">Remove From Your Library</ion-label>
		</span>
		<span class="my-4 flex gap-4 items-center cursor-pointer">
			<ion-icon :icon="folder" class="text-2xl"/>
			<ion-label class="font-bold">Add To Study Set</ion-label>
		</span>
		<span class="my-4 flex gap-4 items-center cursor-pointer">
			<ion-icon :icon="removeCircle" class="text-2xl"/>
			<ion-label class="font-bold">Remove From Study Set</ion-label>
		</span>
		<span v-if="showDelete" class="my-4 flex gap-4 items-center cursor-pointer" @click="deleteEntity">
			<ion-icon :icon="trash" class="text-2xl"/>
			<ion-label class="font-bold">Delete</ion-label>
		</span>
		<span class="my-4 flex gap-4 items-center cursor-pointer" @click="share">
			<ion-icon :icon="shareIcon" class="text-2xl"/>
			<ion-label class="font-bold">Share</ion-label>
		</span>
		<span v-if="entity?.userId !== id && type === 'flashCards'" class="my-4 flex gap-4 items-center cursor-pointer"
			@click="goToAuthor">
			<ion-icon :icon="person" class="text-2xl"/>
			<ion-label class="font-bold">Go To Author</ion-label>
		</span>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useMenuPopover } from '@app/composable/core/modals'
import { useDeleteStudyEntity, useStudyMenuData } from '@app/composable/study/menus'
import { folder, library, person, removeCircle, share as shareIcon, trash } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'StudyEntityMenu',
	setup() {
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
		return {
			entity, type, data,
			library, folder, shareIcon, person, trash, removeCircle,
			share, id, isLoggedIn, isAdmin, goToAuthor,
			showDelete, deleteLoading, deleteError, deleteEntity
		}
	}
})
</script>

<style>
ion-icon, ion-label {
	cursor: pointer;
}
</style>
