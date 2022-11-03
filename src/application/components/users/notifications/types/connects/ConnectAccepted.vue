<template>
	<div v-if="user" class="flex border-bottom-line card-padding items-start">
		<Avatar :id="user.id" :name="user.bio.fullName" :size="32" :src="user.bio.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ user.bio.fullName }} accepted your request</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<div class="border border-2 border-itemBg rounded-xl flex flex-col gap-4 p-4">
				<div class="flex items-center gap-6 justify-between">
					<Avatar :id="user.id" :name="user.bio.fullName" :size="32" :src="user.bio.photo" />
					<router-link v-if="connect?.accepted" :to="`/messages/personal/${user.id}`">
						<IonButton class="btn-primary">Message</IonButton>
					</router-link>
				</div>
				<div class="flex flex-col">
					<UserName class="font-bold" :name="user.bio.fullName" :isTutor="user.roles.isStranerdTutor" />
					<template v-if="user.isCollege(user)">
						<Institution :institutionId="user.school.institutionId"
							class="text-secondaryText text-sm font-bold" />
						<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
							class="text-secondaryText text-sm" />
					</template>
				</div>
				<IonText v-if="user.bio.description">{{ user.bio.description }}</IonText>
				<div class="flex items-center gap-4 w-full text-sm">
					<IonText>
						<span class="font-bold">{{ formatNumber(user.score, 1) }}</span>
						<span>&nbsp;{{ pluralize(user.score, 'pt', 'pts') }}</span>
					</IonText>
					<IonText>
						<span class="font-bold">{{ formatNumber(user.meta.connects) }}</span>
						<span>&nbsp;{{ pluralize(user.meta.connects, 'connect', 'connects') }}</span>
					</IonText>
					<IonText>
						<span class="font-bold">{{ formatNumber(user.meta.bestAnswers) }}</span>
						<span>&nbsp;best {{ pluralize(user.meta.bestAnswers, 'answer', 'answers') }}</span>
					</IonText>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useConnects } from '@app/composable/users/connects'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useUser } from '@app/composable/users/users'
import { formatNumber, pluralize } from '@utils/commons'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { ellipse } from 'ionicons/icons'

export default defineComponent({
	name: 'ConnectAccepted',
	components: { Institution, Department },
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		},
		connectId: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { connects } = useConnects()
		const { user } = useUser(props.userId)
		const connect = computed(() => connects.value.find((c) => c.id === props.connectId))
		return { connect, user, formatTime, formatNumber, pluralize, ellipse }
	}
})
</script>
