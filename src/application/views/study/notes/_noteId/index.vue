<template>
	<Justified>
		<div v-if="note">
			<div class="blueTop ">
				<ion-text class="heading lg:text-2xl font-bold text-white text-center ">
					{{ note.title }}
				</ion-text>
			</div>
			<div class="lg:w-8/12 w-full mx-auto p-4 md:my-4 bg-white">
				<NoteDetails :note="note" />
			</div>
			<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
				<div class="lg:w-8/12 max-w-[60rem] w-full px-4 mx-auto flex items-center justify-between">
					<div class="flex">
						<Avatar :id="note.userId" :name="note.userBio.fullName" :size="28" :src="note.userBio.photo"
							class="mx-2" />
						<ion-text class="text-icon_inactive flex items-center gap-1">
							<span>by <b>{{ note.userBio.firstName }}</b></span>
							<IonIcon v-if="note.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
						</ion-text>
					</div>
					<div class="flex items-center">
						<Share :text="note.description" :title="note.title"
							cssClass="text-icon_inactive text-xl cursor-pointer mx-2" />
					</div>
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import {
	add,
	bookmark,
	checkmarkCircleOutline,
	chevronDown,
	chevronUp,
	contract,
	pencil,
	remove,
	scan,
	shareSocial
} from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useNote } from '@app/composable/study/notes'
import Share from '@app/components/core/Share.vue'
import NoteDetails from '@app/components/study/notes/NoteDetails.vue'

export default defineComponent({
	name: 'StudyNotesNoteId',
	displayName: 'Note',
	components: { Justified, Avatar, NoteDetails, Share },
	setup () {
		const { noteId } = useRoute().params
		const { error, loading, note } = useNote(noteId as string)
		return {
			add, remove, scan, chevronDown, loading, note, error,
			chevronUp, pencil, contract, bookmark, shareSocial, checkmarkCircleOutline
		}
	}
})
</script>
