<template>
	<div class="flex flex-col gap-4 px-8">
		<IonText class="font-bold text-2xl">Leaderboard</IonText>
		<SideLeaderboard />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideLeaderboard from '@app/components/users/leaderboard/SideLeaderboard.vue'

export default defineComponent({
	name: 'RightSidebar',
	components: { SideLeaderboard }
})
</script>
