<template>
	<Justified>
		<div v-if="classInst" class="lg:w-8/12 w-full mx-auto lg:p-4">
			<div class="rounded-xl bg-white relative">
				<div class="px-4 md:px-6 flex justify-between gap-2">
					<Avatar :name="classInst.name" :size="80" :src="classInst.photo"
						class="relative top-[-40px] -mb-10" />
					<div class="flex gap-1 mt-2">
						<Share :link="`/classes/${classInst.id}`" :text="classInst.description"
							:title="`Share this class: ${classInst.name}`"
							class="py-1 px-4 border border-primary text-primary rounded-full text-sub flex justify-center items-center">
							Copy class link
						</Share>
					</div>
				</div>
				<div class="px-4 md:px-6 border-bottom-line">
					<div class="pt-2 pb-4 flex flex-col gap-1">
						<div class="flex gap-1 items-center">
							<IonText class="text-secondaryText text-heading capitalize font-semibold">
								{{ classInst.name }}
							</IonText>
							<IonIcon v-if="classInst.admins.includes(id)" :icon="pencilOutline"
								@click="openClassEditModal(classInst, $router)" />
						</div>
						<IonText>{{ classInst.description }}</IonText>
						<IonText class="text-sub text-gray">Created {{ formatTime(classInst.createdAt) }}</IonText>
						<IonText class="text-sub font-semibold text-gray">
							{{ classInst.members.length }} {{
								pluralize(classInst.members.length, 'member', 'members')
							}}
						</IonText>
					</div>
					<div v-if="classInst.members.includes(id)" class="lg:rounded-b-xl nav-scroll">
						<router-link :to="`/classes/${classInst.id}/`">
							<IonIcon :icon="informationCircleOutline" class="text-heading2" />
							<IonText class="hidden md:inline">Info</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/announcements`">
							<IonIcon :icon="megaphoneOutline" class="text-heading2" />
							<IonText class="hidden md:inline">Announcements</IonText>
							<span v-if="!!unReadAnnouncements" class="dot bg-primary" />
						</router-link>
						<router-link :to="`/classes/${classInst.id}/groups`">
							<IonIcon :icon="chatboxEllipsesOutline" class="text-heading2" />
							<IonText class="hidden md:inline">Discussions</IonText>
							<span v-if="!!unReadGroups" class="dot bg-primary" />
						</router-link>
						<router-link :to="`/classes/${classInst.id}/library`">
							<IonIcon :icon="libraryOutline" class="text-heading2" />
							<IonText class="hidden md:inline">Library</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/members`">
							<IonIcon :icon="peopleOutline" class="text-heading2" />
							<IonText class="hidden md:inline">Members</IonText>
						</router-link>
					</div>
					<IonButton v-else class="btn-primary w-full mb-4"
						@click="requestToJoinClass(!classInst.requests.includes(id))">
						{{ classInst.requests.includes(id) ? 'Cancel Request' : 'Request To Join' }}
					</IonButton>
				</div>
			</div>
			<div class="md:px-4 lg:px-0 py-4">
				<slot v-if="classInst.members.includes(id)" :classInst="classInst" />
			</div>
			<PageLoading v-if="loading" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import {
	chatboxEllipsesOutline,
	informationCircleOutline,
	libraryOutline,
	megaphoneOutline,
	pencilOutline,
	peopleOutline
} from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { openClassEditModal, useClass } from '@app/composable/classes/classes'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { useAnnouncementList } from '@app/composable/classes/announcements'
import { useGroupList } from '@app/composable/classes/groups'

export default defineComponent({
	name: 'ClassWrapper',
	components: { Justified },
	setup () {
		const { id } = useAuth()
		const route = useRoute()
		const { classId } = route.params
		const { loading, error, classInst, requestToJoinClass } = useClass(classId as string)
		const { unReadAnnouncements } = useAnnouncementList(classId as string)
		const { unReadGroups } = useGroupList(classId as string)
		return {
			chatboxEllipsesOutline, informationCircleOutline, libraryOutline,
			megaphoneOutline, pencilOutline, peopleOutline,
			loading, error, classInst, requestToJoinClass, unReadAnnouncements, unReadGroups,
			formatTime, pluralize, id, openClassEditModal
		}
	}
})
</script>
