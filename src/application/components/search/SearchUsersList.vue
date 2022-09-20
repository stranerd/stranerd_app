<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="users.length === 0" info="No users found." />
		<UserListCard v-for="user in users" :key="user.hash" :user="user" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserListCard from '@app/components/users/UserListCard.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'SearchUsersList',
	components: { UserListCard },
	props: {
		users: {
			type: Array as PropType<UserEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>
