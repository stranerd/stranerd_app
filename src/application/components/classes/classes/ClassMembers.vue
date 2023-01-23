<template>
	<div class="flex flex-col lg:gap-6">
		<div v-for="({ name, users }) in list" :key="name" class="flex flex-col border-bottom-line">
			<div class="flex gap-4 items-center p-4 lg:px-0">
				<IonText class="font-bold capitalize truncate w-full">{{ name }}</IonText>
				<!-- <span>
					<IonIcon :class="{'rotate-90': show[index]}" :icon="chevronForwardOutline" />
				</span> -->
			</div>
			<div class="flex flex-col lg:gap-4">
				<form v-if="name === 'Add Users'" :class="{'mb-4 lg:mb-0': !users.length }"
					class="card-padding !py-0 lg:p-0"
					@submit.prevent="search" @reset.prevent="reset">
					<IonSearchbar v-model="detail" placeholder="Enter email or name to add user" />
				</form>
				<ClassMember v-for="user in users" :key="user.hash" :classInst="classInst" :user="user" />
			</div>
		</div>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useClassMembersList } from '@app/composable/classes/classes'
import { ClassEntity } from '@modules/classes'
import ClassMember from '@app/components/classes/classes/ClassMember.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useSearchUsers } from '@app/composable/users'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const { id } = useAuth()
const show = ref([] as boolean[])
const { loading, error, admins, tutors, members, requests } = useClassMembersList(props.classInst)
const { detail, users, search, reset } = useSearchUsers()

const list = computed(() => [
	...(props.classInst.admins.includes(id.value) ? [
		{ name: 'Add Users', users: users.value }, { name: 'Requests', users: requests.value }
	] : []),
	{ name: 'Admin', users: admins.value },
	{ name: 'Members', users: members.value }
])
</script>
