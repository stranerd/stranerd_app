<template>
	<div class="flex flex-col gap-4">
		<div v-if="classInst.admins.includes(id)" class="px-4 md:px-0">
			<IonSegment v-model="tab"
				class="w-full bg-new_gray text-gray border border-new_gray border-xl md:border-white">
				<IonSegmentButton class="w-full" value="members">Members</IonSegmentButton>
				<IonSegmentButton class="w-full" value="requests">Requests</IonSegmentButton>
				<IonSegmentButton class="w-full" value="invite">Invite</IonSegmentButton>
			</IonSegment>
		</div>
		<template v-if="tab === 'requests'">
			<div class="block md:gap-2">
				<ClassMember v-for="request in requests" :key="request.hash" :classInst="classInst" :user="request" />
			</div>
		</template>
		<template v-if="tab === 'invite'">
			<div class="block md:gap-2">
				<form class="px-4 md:px-0 flex gap-2 items-center" @submit.prevent="searchUsers">
					<ion-input v-model="detail" class="bg-white border border-faded_gray w-full"
						placeholder="Search users by name or email" />
					<IonIcon :icon="trashOutline" class="text-red text-2xl" />
				</form>
				<ClassMember v-for="user in searchedUsers" :key="user.hash" :classInst="classInst" :user="user" />
			</div>
		</template>
		<template v-else>
			<div v-if="admins.length" class="block md:gap-2">
				<IonText>Admins</IonText>
				<ClassMember v-for="admin in admins" :key="admin.hash" :classInst="classInst" :user="admin" />
			</div>
			<div v-if="tutors.length" class="block md:gap-2">
				<IonText>Tutors</IonText>
				<ClassMember v-for="tutor in tutors" :key="tutor.hash" :classInst="classInst" :user="tutor" />
			</div>
			<div v-if="members.length" class="block md:gap-2">
				<IonText>Others</IonText>
				<ClassMember v-for="member in members" :key="member.hash" :classInst="classInst" :user="member" />
			</div>
		</template>
		<PageLoading v-if="loading" />
		<PageLoading v-if="searchLoading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useClassMembersList } from '@app/composable/classes/classes'
import { ClassEntity } from '@modules/classes'
import ClassMember from '@app/components/classes/classes/ClassMember.vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'
import { useAuth } from '@app/composable/auth/auth'
import { useSearchUsers } from '@app/composable/users'
import { trashOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassMembers',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { ClassMember, IonSegment, IonSegmentButton },
	setup (props) {
		const { id } = useAuth()
		const tab = ref('members')
		const { loading, error, admins, tutors, members, requests } = useClassMembersList(props.classInst)
		const { loading: searchLoading, error: searchError, users, detail, searchUsers, reset } = useSearchUsers()
		const searchedUsers = computed(() => users.value.filter((user) => !props.classInst.members.includes(user.id)))
		return {
			id, tab, admins, tutors, members, loading, error, requests,
			searchLoading, searchError, searchedUsers, detail, searchUsers, reset, trashOutline
		}
	}
})
</script>

<style lang="scss" scoped>
	.block {
		background: $color-white;
		display: flex;
		flex-direction: column;

		& > ion-text {
			font-weight: 600;
			padding: 0 1rem;
			color: $color-mainDark;
			@media (min-width: $md) {
				padding: 0;
			}
		}

		@media (min-width: $md) {
			background: inherit;
		}
	}

	ion-segment {
		border-radius: 0.5rem;
	}

	ion-segment-button {
		--background-checked: $color-white;
		--background-focused: $color-white;
		--indicator-color: $color-white;
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		font-weight: bold;
		border-radius: 0.5rem;
		text-transform: capitalize;
		max-width: unset;
		color: $color-gray;
	}

	.segment-button-checked {
		color: $color-gray !important;
		background: $color-white;
	}
</style>
