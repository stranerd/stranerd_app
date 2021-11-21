<template>
	<div class="w-full flex flex-col py-3 px-2">
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
