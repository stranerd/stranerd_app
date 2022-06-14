<template>
	<Justified>
		<Leaderboard />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'UsersLeaderboard',
	components: { Justified, Leaderboard },
	setup () {
		useRouteMeta('LeaderBoard', {})
	}
})
</script>
