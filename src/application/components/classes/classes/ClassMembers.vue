<template>
	<div class="flex flex-col gap-4">
		<div v-if="requests.length" class="block flex flex-col gap-2">
			<IonText class="font-semibold">Requests</IonText>
			<ClassMember v-for="request in requests" :key="request.hash" :classInst="classInst" :user="request" />
		</div>
		<div v-if="admins.length" class="block flex flex-col gap-2">
			<IonText class="font-semibold">Admins</IonText>
			<ClassMember v-for="admin in admins" :key="admin.hash" :classInst="classInst" :user="admin" />
		</div>
		<div v-if="tutors.length" class="block flex flex-col gap-2">
			<IonText class="font-semibold">Tutors</IonText>
			<ClassMember v-for="tutor in tutors" :key="tutor.hash" :classInst="classInst" :user="tutor" />
		</div>
		<div v-if="members.length" class="block flex flex-col gap-2">
			<IonText class="font-semibold">Others</IonText>
			<ClassMember v-for="member in members" :key="member.hash" :classInst="classInst" :user="member" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassMembersList } from '@app/composable/classes/classes'
import { ClassEntity } from '@modules/classes'
import ClassMember from '@app/components/classes/classes/ClassMember.vue'

export default defineComponent({
	name: 'ClassMembers',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { ClassMember },
	setup (props) {
		const { loading, error, admins, tutors, members, requests } = useClassMembersList(props.classInst)
		return { admins, tutors, members, loading, error, requests }
	}
})
</script>

<style lang="scss" scoped>
	.block {
		background: $color-white;

		@media (min-width: $md) {
			background: inherit;
		}
	}
</style>
