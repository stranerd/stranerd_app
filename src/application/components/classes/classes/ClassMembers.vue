<template>
	<div class="flex flex-col">
		<div v-for="({ name, users }) in [
			...(classInst.admins.includes(id) ? [{ name: 'Add Users', users }, { name: 'Requests', users: requests }] : []),
			{ name: 'Admin', users: admins },
			{ name: 'Members', users: members }
		]" :key="name" class="flex flex-col py-2 border-bottom-line">
			<div class="flex gap-4 items-center p-4">
				<IonText class="font-bold capitalize truncate w-full">{{ name }}</IonText>
				<!-- <span>
					<IonIcon :class="{'rotate-90': show[index]}" :icon="chevronForwardOutline" />
				</span> -->
			</div>
			<div  class="flex flex-col">
				<form class="card-padding !py-0 lg:p-0" @submit.prevent="search" @reset.prevent="reset">
					<IonSearchbar v-if="name === 'Add Users'" v-model="detail"
						placeholder="Enter email or name to add user" />
				</form>
				<ClassMember v-for="user in users" :key="user.hash" :classInst="classInst" :user="user" />
			</div>
		</div>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useClassMembersList } from '@app/composable/classes/classes'
import { ClassEntity } from '@modules/classes'
import ClassMember from '@app/components/classes/classes/ClassMember.vue'
import { useAuth } from '@app/composable/auth/auth'
import { chevronForwardOutline } from 'ionicons/icons'
import { useSearchUsers } from '@app/composable/users'

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
		const { id } = useAuth()
		const show = ref([] as boolean[])
		const { loading, error, admins, tutors, members, requests } = useClassMembersList(props.classInst)
		const { detail, users, search, reset } = useSearchUsers()
		return {
			id, show, admins, tutors, members, loading, error, requests,
			chevronForwardOutline, detail, users, search, reset
		}
	}
})
</script>
