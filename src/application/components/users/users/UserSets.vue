<template>
	<BlockLoading v-if="loading" />
	<div v-else class="flex flex-col">
		<SetListCard v-for="set in sets" :key="set.hash" :set="set" class="border-bottom-line" />
		<EmptyState v-if="!loading && !error && sets.length === 0"
			info="This user hasn't created any folders yet." />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileSets',
	components: { SetListCard, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { sets, error, loading } = useUserSetList(props.user.id)
		return { sets, error, loading }
	}
})
</script>
