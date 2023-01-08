<template>
	<div class="flex flex-col gap-8 px-8">
		<Search />
		<div class="flex flex-col gap-4 border border-itemBg p-8">
			<IonText class="font-bold text-2xl">Leaderboard</IonText>
			<Leaderboard />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'
import Search from '@app/components/search/Search.vue'
</script>
