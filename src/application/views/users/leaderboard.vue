<template>
	<Justified>
		<div>
			<Leaderboard class="" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'

export default defineComponent({
	name: 'UsersLeaderboard',
	displayName: 'LeaderBoard',
	components: { Justified, Leaderboard }
})
</script>
