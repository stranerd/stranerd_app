<template>
	<div class="showcase-flex">
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<UserListCard v-for="user in filtered" :key="user.hash" :user="user" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
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
	},
	setup (props) {
		const filtered = computed(() => props.users.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
