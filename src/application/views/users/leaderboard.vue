<template>
	<DefaultLayout>
		<Leaderboard class="showcase-flex" />
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
		useRouteMeta('Leaderboard', { back: true })
	}
})
</script>
