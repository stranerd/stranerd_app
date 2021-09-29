<template>
	<div v-if="user" class="flex flex-col gap-0-5 gap-lg-2-25 background">
		<div class="flex flex-col gap-0-5 gap-md-1 box">
			<div class="flex flex-col gap-0-5 gap-md-1-5 align-items-center text-blue">
				<div class="position-relative">
					<Avatar :size="96" :src="user.avatar" class="d-md-none" />
					<Avatar :size="120" :src="user.avatar" class="d-none d-md-inline-block" />
					<NuxtLink v-if="user.id === id" to="/account/edit">
						<i class="fa fa-pen pen" />
					</NuxtLink>
				</div>

				<div class="flex flex-col gap-0-25 align-items-center">
					<h1 class="mb-0">
						<DynamicText>{{ user.fullName }}</DynamicText>
					</h1>
					<NuxtLink class="text-primary text-18" to="/users/ranks">
						<DynamicText>{{ user.rank.id }}</DynamicText>
					</NuxtLink>
					<div class="flex align-items-baseline gap-0-5">
						<ShowRatings :rating="user.averageRating" />
						<DynamicText>
							({{ formatNumber(user.ratingCount) }}
							{{ pluralize(user.ratingCount, 'review', 'reviews') }})
						</DynamicText>
					</div>
				</div>
				<button v-if="canRequestSession" class="sidebar-btn px-2" @click="requestNewSession">
					Request a Session
				</button>
			</div>

			<div class="thin" />

			<div class="stats">
				<div class="stat-title gap-1">
					<img alt="" src="@app/assets/images/icons/profileSidebar/questions.svg">
					<span>Questions</span>
				</div>
				<DynamicText class="count font-bold">
					{{ formatNumber(user.meta.questions) }}
				</DynamicText>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img alt="" src="@app/assets/images/icons/profileSidebar/answers.svg">
					<span>Answers</span>
				</div>
				<DynamicText class="count font-bold">
					{{ formatNumber(user.meta.answers) }}
				</DynamicText>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img alt="" src="@app/assets/images/icons/profileSidebar/best-answer.svg">
					<span>Best Answers</span>
				</div>
				<DynamicText class="count">
					{{ formatNumber(user.meta.bestAnswers) }}
				</DynamicText>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img alt="" src="@app/assets/images/icons/profileSidebar/sessions-attended.svg">
					<span>Sessions Attended</span>
				</div>
				<DynamicText class="count">
					{{ formatNumber(user.meta.sessions) }}
				</DynamicText>
			</div>
			<div v-if="user.isScholar" class="stats">
				<div class="stat-title gap-1">
					<img alt="" src="@app/assets/images/icons/profileSidebar/sessions-hosted.svg">
					<span>Sessions Hosted</span>
				</div>
				<DynamicText class="count">
					{{ formatNumber(user.meta.sessions) }}
				</DynamicText>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img alt="" src="@app/assets/images/icons/profileSidebar/member-since.svg">
					<span>Member Since</span>
				</div>
				<DynamicText class="count">
					{{ formatTime(user.dates.createdAt) }}
				</DynamicText>
			</div>
		</div>

		<div class="flex flex-col gap-0-5 text-dark box">
			<h1 class="font-bold">
				About {{ user.id === id ? 'Me' : user.firstName }}
			</h1>
			<template v-if="user.id === id">
				<DynamicText v-if="!user.description">
					Write a short description
					<NuxtLink class="text-primary" style="text-decoration: underline;" to="/account/edit">
						here
					</NuxtLink>
				</DynamicText>
				<DynamicText v-else>
					{{ user.description }}
				</DynamicText>
			</template>
			<DynamicText v-else>
				{{ user.description || 'N/A' }}
			</DynamicText>
			<div class="thin" />

			<h1 class="font-bold">
				Strongest In
			</h1>
			<Subject v-if="user.strongestSubject" :subject-id="user.strongestSubject" />
			<span v-else>N/A</span>
			<div class="thin" />

			<h1 class="font-bold">
				Also Good In
			</h1>
			<div v-if="user.weakerSubjects.length > 0" class="flex flex-wrap gap-0-25">
				<span v-for="(subject, index) in user.weakerSubjects" :key="subject.id">
					<Subject :subject-id="subject" />
					<span v-if="index < user.weakerSubjects.length - 1">,&nbsp;</span>
				</span>
			</div>
			<span v-else>N/A</span>
			<div class="thin" />

			<h1 class="font-bold">
				Frequent Tags
			</h1>
			<div v-if="user.tags.length > 0" class="flex flex-wrap gap-0-5">
				<Tag v-for="tag in user.tags" :key="tag.id" :tag="tag.id" />
			</div>
			<span v-else>N/A</span>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute } from 'vue'
import { useUser } from '@app/hooks/users/user'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionModal } from '@app/hooks/core/modals'
import { setNewSessionTutorIdBio } from '@app/hooks/sessions/sessions'

export default defineComponent({
	name: 'ProfileLeftSidebar',
	components: { Tag, Subject },
	setup () {
		const { id, user: authUser } = useAuth()
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		const canRequestSession = computed({
			get: () => authUser.value &&
				authUser.value.id !== user.value?.id &&
				authUser.value.canRequestSessions &&
				user.value?.canHostSessions,
			set: () => {
			}
		})
		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: user.value?.id!, user: user.value?.bio! })
			useSessionModal().openCreateSession()
		}
		return {
			id,
			error,
			loading,
			user,
			formatNumber,
			formatTime,
			pluralize,
			canRequestSession,
			requestNewSession
		}
	}
})
</script>

<style lang="scss" scoped>
	.background {
		background: $color-line;
		@media (min-width: $lg) {
			background: unset;
		}
	}

	.img-rank {
		width: 6.25rem;
	}

	.pen {
		background-color: $color-primary;
		color: white;
		position: absolute;
		bottom: 0;
		right: 0;
		border-radius: 10rem;
		width: 2.5em;
		height: 2.5em;
		font-size: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	p {
		margin: 0;
	}

	.box {
		padding: 1.5rem 1rem;
		background: $color-white;
		@media (min-width: $lg) {
			border-radius: 6px;
			border: 1px solid $color-line;
			padding: 36px;
			max-width: 30rem;
		}

		h1 {
			font-size: 18px;
			@media (min-width: $md) {
				font-size: 1.5rem;
			}
		}
	}

	.sidebar-btn {
		border: none;
		outline: none;
		border-radius: 6px;
		font-size: 1rem;
	}

	.stats {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $color-dark;

		.stat-title {
			display: flex;
			align-items: center;

			img {
				height: 1.5rem;
				width: 1.5rem;
			}
		}

		.count {
			font-weight: bold;
		}
	}
</style>
