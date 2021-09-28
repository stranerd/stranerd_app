<template>
	<div>
		<div class="ranking-body d-flex flex-column gap-2-25">
			<div class="ranking-card">
				<div class="rank-contain">
					<img alt="" src="/images/ranking/rookie.svg">
				</div>
				<div class="ranking-card-main gap-1">
					<p class="first">
						A Rookie is a Beginner Nerd.
					</p>
					<p class="second">
						The following challenges need to be completed to progress to the next level:
					</p>

					<ul>
						<li> - Ask and answer 30 questions</li>
						<li> - Successfully attend 7 sessions</li>
						<li> - Complete 30 days login</li>
					</ul>
				</div>
			</div>

			<div class="ranking-card">
				<div class="rank-contain">
					<img alt="" src="/images/ranking/comrade.svg">
				</div>
				<div class="ranking-card-main gap-1">
					<p class="first">
						A Comrade is a Level Two Nerd. This status proves that you are an active and valuable member of
						the Stranerd community.
					</p>
					<p class="second">
						The following challenges need to be completed to progress to the next level:
					</p>

					<ul>
						<li> - Ask 30 questions and answer 30 questions</li>
						<li> - Have a Nerd Score of ≥ 75</li>
						<li> - Have at least 10 best answers</li>
						<li> - Successfully attend 14 sessions</li>
						<li> - Complete 60 daily login</li>
					</ul>
				</div>
			</div>

			<div class="ranking-card">
				<div class="rank-contain">
					<img alt="" src="/images/ranking/scholar.svg">
				</div>

				<div class="ranking-card-main gap-1">
					<p class="first">
						A Scholar is a Level Three Nerd. This status is a guarantee that you are a Nerd whose solutions
						can be trusted.
					</p>
					<p class="second">
						<span class="highlight">New!!!</span>
						A Scholar is able to host Chat Sessions with other Nerds to help them with solutions to their
						homework and study problems.
					</p>

					<p class="third">
						The following challenges need to be completed to progress to the next level:
					</p>

					<ul>
						<li> - Successfully host 60 sessions</li>
						<li> - Ask and answer 50 questions</li>
						<li> - Complete 90 day login</li>
						<li> - Have at least 20 best answers</li>
						<li> - Have a Nerd score of ≥ 250</li>
						<li> - Keep an average of 3.5 stars</li>
					</ul>
				</div>
			</div>

			<div class="ranking-card">
				<div class="rank-contain">
					<img alt="" src="/images/ranking/einstein.svg">
				</div>
				<div class="ranking-card-main gap-1">
					<p class="first">
						Einstein! this is the highest level a Nerd can attain. This status is a guarantee that you are a
						Nerd who is an expert in your specialized field of study.
					</p>
					<p class="second">
						An Einstein possesses the ability of all ranks below him (for example; an Einstein can host Chat
						Sessions).
					</p>
					<p class="third">
						The following challenges need to be completed to progress to the next level:
					</p>

					<ul>
						<li> - Host 100 sessions</li>
						<li> - Complete 100 days login</li>
						<li> - Keep an average of 4 star</li>
						<li> - Have at least 30 best answers</li>
						<li> - Have a nerd score of ≥ 400</li>
						<li> - Ask and answer at least 50 questions</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UsersRanksPage',
	layout: 'justified',
	setup () {
		// useMeta(() => ({
		// 	title: 'Ranking Requirements | Stranerd'
		// }))
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.highlight {
		color: $color-primary;
		font-weight: 600;
	}

	.ranking-body {
		color: $color-sub;

		.ranking-card {
			display: flex;
			border: 1px solid $color-line;
			border-radius: 12px;
			@media (max-width: $mmd) {
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.rank-contain {
				background: $color-tags;
				padding: 2rem;
				border-radius: 12px;
				border-right: 1px solid $color-line;
				display: flex;
				justify-content: center;

				img {
					width: 144px;
				}
				@media (max-width: $mmd) {
					width: 100%;
					border-right: none;
					border-bottom: 1px solid $color-line;
				}
			}

			.ranking-card-main {
				width: calc(100% - 4rem - 144px);
				padding: 2rem;
				display: flex;
				flex-direction: column;
				@media (max-width: $mmd) {
					width: 100%;
				}

				p {
					margin: 0;
					width: 100%;
					word-break: break-all;
				}

				ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}
			}
		}
	}
</style>
