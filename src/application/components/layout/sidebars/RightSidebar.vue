<template>
	<div class="flex flex-col gap-8 px-8">
		<Search />
		<div class="flex flex-col gap-4 border border-itemBg p-8">
			<IonText class="font-bold text-2xl">Leaderboard</IonText>
			<SideLeaderboard />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideLeaderboard from '@app/components/users/leaderboard/SideLeaderboard.vue'
import Search from '@app/components/search/Search.vue'

export default defineComponent({
	name: 'RightSidebar',
	components: { SideLeaderboard, Search }
})
</script>
