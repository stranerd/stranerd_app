<template>
	<div class=" flex flex-col text-sm text-main_dark gap-3 w-full">
		<div class="bg-light_blue py-4 px-4 rounded-xl flex flex-col">
			<h2 class="mb-2 normalText font-bold">{{ challenge?.title }}</h2>
			<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
				<div :style="`width:${rankPercentage(challenge?.target, challenge?.present )};`"
					class="absolute left-0 top-0 h-full rounded-xl bg-primary">
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ChallengeData } from '@modules/users/data/models/user'

export default {
	props: {
		challenge: {
			type: Object as () => ChallengeData
		}
	},
	setup (props: any) {
		const rankPercentage = (next: number | undefined, present: number | undefined) => {
			let percentage = 0
			if (next && present != undefined) {
				if (present == 0) {
					percentage = (2 / next) * 100
				} else {
					percentage = (present / next) * 100
				}
			}
			return percentage.toString() + '%'
		}

		return {
			rankPercentage
		}
	}
}
</script>

<style>

</style>
