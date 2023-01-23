<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="users.length === 0" info="No users found." />
		<UserListCard v-for="user in users" :key="user.hash" :user="user" />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import UserListCard from '@app/components/users/UserListCard.vue'
import { UserEntity } from '@modules/users'

defineProps({
	users: {
		type: Array as PropType<UserEntity[]>,
		required: true
	}
})
</script>
