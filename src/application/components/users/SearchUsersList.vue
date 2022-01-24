<template>
	<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl " />
	<div v-else>
		<EmptyState v-if="!loading && filtered.length === 0" info="No users available." />
		<div class="showcase">
			<UserListCard v-for="user in filtered" :key="user.hash" :user="user" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import UserListCard from '@app/components/users/UserListCard.vue'
import { UserEntity } from '@modules/users'
import { IonSkeletonText } from '@ionic/vue'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchUsersList',
	components: { UserListCard, IonSkeletonText },
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
		const { loading } = useSearch()
		const filtered = computed(() => props.users.slice(0, props.sliced ? 6 : undefined))
		return { filtered, loading }
	}
})
</script>
