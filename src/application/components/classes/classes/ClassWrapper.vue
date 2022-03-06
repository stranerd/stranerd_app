<template>
	<Justified>
		<div v-if="classInst" class="lg:w-8/12 w-full mx-auto lg:p-4">
			<div class="rounded-xl bg-white">
				<div class="w-full bg-orange h-16 md:h-24 lg:md:h-32 lg:rounded-t-xl" />
				<div class="px-4 md:px-6 border-bottom-line">
					<div class="-mt-10">
						<Avatar :name="classInst.name" :size="80" :src="classInst.photo" />
					</div>
					<div class="pt-2 pb-4 flex flex-col gap-1">
						<IonText class="text-main_dark md:text-[20px] capitalize font-semibold">
							{{ classInst.name }}
						</IonText>
						<IonText class="text-sm">{{ classInst.description }}</IonText>
						<IonText class="text-xs text-gray">Created {{ formatTime(classInst.createdAt) }}</IonText>
						<IonText class="text-sm font-semibold text-gray">
							{{ classInst.members.length }} {{
								pluralize(classInst.members.length, 'member', 'members')
							}}
						</IonText>
					</div>
					<div v-if="classInst.members.includes(id)" class="lg:rounded-b-xl nav-scroll">
						<router-link v-if="false" :to="`/classes/${classInst.id}/info`">
							<IonIcon :icon="informationCircleOutline" class="text-xl" />
							<IonText class="hidden md:inline">Info</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/announcements`">
							<IonIcon :icon="megaphoneOutline" class="text-xl" />
							<IonText class="hidden md:inline">Announcements</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/groups`">
							<IonIcon :icon="chatboxEllipsesOutline" class="text-xl" />
							<IonText class="hidden md:inline">Discussions</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/questions`">
							<IonIcon :icon="helpCircleOutline" class="text-xl" />
							<IonText class="hidden md:inline">Questions</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/library`">
							<IonIcon :icon="libraryOutline" class="text-xl" />
							<IonText class="hidden md:inline">Library</IonText>
						</router-link>
						<router-link :to="`/classes/${classInst.id}/members`">
							<IonIcon :icon="peopleOutline" class="text-xl" />
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
	helpCircleOutline,
	informationCircleOutline,
	libraryOutline,
	megaphoneOutline,
	peopleOutline
} from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { useClass } from '@app/composable/classes/classes'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ClassWrapper',
	components: { Justified },
	setup () {
		const { id } = useAuth()
		const route = useRoute()
		const { classId } = route.params
		const { loading, error, classInst, requestToJoinClass } = useClass(classId as string)
		return {
			chatboxEllipsesOutline,
			informationCircleOutline,
			helpCircleOutline,
			libraryOutline,
			megaphoneOutline,
			peopleOutline,
			loading,
			error,
			classInst,
			formatTime,
			pluralize,
			id,
			requestToJoinClass
		}
	}
})
</script>
