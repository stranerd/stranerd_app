<template>
	<Justified>
		<div v-if="note">
			<div class="blueTop ">
				<ion-text class="heading lg:text-2xl font-bold text-white text-center ">
					{{ note.title }}
				</ion-text>
			</div>
			<div class="w-full pb-12 bg-light_gray p-4">
				<div class="lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white">
					<Note :note="note" />
				</div>
			</div>
			<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
				<div class="lg:w-8/12 max-w-[60rem] w-full px-4 mx-auto flex items-center justify-between">
					<div class="flex">
						<Avatar :id="note.userId" :size="28" :src="note.userBio.photo" class="mx-2" />
						<ion-text class="text-icon_inactive"> by <b>{{ note.userBio.firstName }}</b></ion-text>
					</div>
					<div class="flex items-center">
						<Share cssClass="text-icon_inactive text-xl cursor-pointer mx-2" />
					</div>
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { add, bookmark, chevronDown, chevronUp, contract, pencil, remove, scan, shareSocial } from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNote } from '@app/composable/study/notes'
import Share from '@app/components/core/Share.vue'
import Note from '@app/components/study/notes/Note.vue'

export default defineComponent({
	name: 'NotePage',
	displayName: 'Notes',
	components: { Justified, Avatar, Note, Share },
	setup () {
		const { noteId } = useRoute().params
		const { error, loading, note, listener } = useNote(noteId as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			add, remove, scan, chevronDown, loading, note, error,
			chevronUp, pencil, contract, bookmark, shareSocial
		}
	}

})
</script>

<style lang="scss" scoped>
	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
