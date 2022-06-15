<template>
	<DefaultLayout>
		<Leaderboard />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'UsersLeaderboard',
	components: { Leaderboard },
	setup () {
		useRouteMeta('LeaderBoard', {})
	}
})
</script>
