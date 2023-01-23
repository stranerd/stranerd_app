<template>
	<div class="showcase-flex">
		<form v-if="sets.length && 0" class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<SetListCard v-for="set in (searchMode ? searchResults : sets)" :key="set.hash" :set="set" />
		<EmptyState v-if="!loading && !error && sets.length === 0" info="This user hasn't created any folders yet." />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { UserEntity } from '@modules/users'

const props = defineProps({
	user: {
		type: UserEntity,
		required: true
	}
})

const {
	sets, error, loading,
	searchMode, searchResults, searchValue, search
} = useUserSetList(props.user.id)
</script>
