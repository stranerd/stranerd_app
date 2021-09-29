<template>
	<div class="flex flex-col gap-0-5 gap-lg-1-5">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" class="inner-bg " />
			<div class="flex flex-col gap-1 inner-bg">
				<Heading class="color-dark text-center" no-grow variant="2">
					Challenges
				</Heading>
				<p class="text-center">
					Unlock a new badge for every milestone reached
				</p>
				<div class="flex gap-1 items-center text-dark">
					<img :src="user.rank.image" alt="" class="img-rank">
					<ProgressBar :current="user.rankProgress.overall" :primary="true" />
					<img v-if="user.rankProgress.next" :src="user.rankProgress.next.image" alt="" class="img-rank">
				</div>
				<div class="flex flex-col gap-1">
					<div
						v-for="detail in user.rankProgress.progresses"
						:key="detail.title"
						class="flex justify-content-between items-center gap-0-25"
					>
						<DynamicText class="stat">
							{{ detail.title }}
						</DynamicText>
						<ProgressBar :current="detail.progress" />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-1 inner-bg">
				<div class="flex justify-content-between items-center">
					<Heading class="color-dark w-50" no-grow variant="2">
						Top Rookies
					</Heading>

					<select class="form-select">
						<option>
							Daily
						</option>
					</select>
				</div>

				<div v-for="n in 5" :key="n" class="flex gap-1 items-center justify-content-between text-sub">
					<div class="flex items-center gap-1">
						<span class="leaderBoardCount">120</span>
						<Avatar :size="24" :src="user.avatar" />
						<span class="text-normal">
							Jerry Maguire
						</span>
					</div>
					<span class="font-bold text-primary">14</span>
				</div>
				<button v-if="isLoggedIn" class="sidebar-btn btn w-100">
					<span>Go to Leaderboard</span>
				</button>
			</div>
		</template>
		<TagsList class="inner-bg" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@/application/hooks/auth/auth'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
import TagsList from '@app/components/questions/tags/TagsList.vue'

export default defineComponent({
	name: 'RightSidebar',
	components: { ProfileHeadCard, TagsList },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		return { id, isLoggedIn, user }
	}
})
</script>

<style lang="scss" scoped>
	.leaderBoardCount {
		font-size: 14px;
		font-weight: bold;
		color: $color-sub;
	}

	select {
		width: 45%;
	}

	.background {
		background: $color-line;
		@media (min-width: $lg) {
			background: unset;
		}
	}

	.inner-bg {
		background: $color-white;
		padding: 30px;
		box-shadow: 0 2px 10px rgba(19, 39, 64, 0.097);
		border: 0.5px solid $color-line;
		border-radius: 6px;
	}

	.img-rank {
		width: 62px;
	}

	.stat {
		width: 350px;
		font-size: 14px;
		font-weight: 600;
		color: $color-sub;
	}

	.name {
		font-size: 20px;
		color: $color-dark;
		font-weight: 600;
	}

	.btn {
		width: 100%;
		max-width: 500px;
	}
</style>
