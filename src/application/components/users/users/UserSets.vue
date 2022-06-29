<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<SetListCard v-for="set in (searchMode ? searchResults : sets)" :key="set.hash" :set="set"
			class="border-bottom-line" />
		<EmptyState v-if="!loading && !error && sets.length === 0" class="border-bottom-line"
			info="This user hasn't created any folders yet." />
		<BlockLoading v-if="loading" />
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
		const {
			sets, error, loading,
			searchMode, searchResults, searchValue, search
		} = useUserSetList(props.user.id)
		return {
			sets, error, loading,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
