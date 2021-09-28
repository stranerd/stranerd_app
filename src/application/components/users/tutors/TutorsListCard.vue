<template>
	<div class="d-flex flex-wrap justify-content-between w-100">
		<div class="mb-2 mb-md-2-25 w-48">
			<div class="flex-column nerd-body shadow gap-0-5 d-md-flex">
				<div class="d-flex align-items-center nerd-card gap-1-5 custom-p">
					<span class="d-flex justify-content-end w-30">
						<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
							<Avatar :size="72" :src="tutor.avatar" />
							<i
								:class="tutor.isOnline ? 'text-success' : 'text-sub'"
								class="fas fa-circle position-absolute rounded-pill"
								style="z-index: 1; right: 0; bottom: 0; font-size: 1.25rem; border: 3px solid white;"
							/>
						</NuxtLink>
					</span>
					<div class="d-flex align-items-start align-self-end flex-column  gap-0-75 w-50">
						<NuxtLink :to="`/users/${tutor.id}`" class="name">
							<DynamicText class="fw-bold">
								{{ tutor.fullName }}
							</DynamicText>
						</NuxtLink>
						<DynamicText class="rank">
							{{ tutor.rank.id }}
						</DynamicText>
					</div>
				</div>

				<div class="nerd-card gap-1-5 custom-p d-flex">
					<ShowRatings :rating="tutor.averageRating" class="w-30" />
					<span class="session">
						36 Sessions Hosted
					</span>
				</div>
				<div class="nerd-card gap-1-5 custom-p d-flex">
					<span class=" text-sub text-right w-30">
						Teaches
					</span>
					<DynamicText class="head-text w-50 text-primary">
						Mathematics
					</DynamicText>
				</div>
				<div class="nerd-card gap-1-5 custom-p d-flex">
					<span class=" text-sub text-right w-30">
						Takes
					</span>
					<DynamicText class="head-text fw-bold text-sub w-50">
						High School
					</DynamicText>
				</div>
				<div class="d-flex justify-content-center">
					<button
						class="btn btn-primary ms-auto rounded-pill mt-1"
						@click="requestNewSession"
					>
						Request A Session
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserEntity } from '@/modules/users'
import { formatNumber, pluralize } from '@/utils/commons'
import { useAuth } from '@/application/hooks/auth/auth'
import { useSessionModal } from '@/application/hooks/core/modals'
import { setNewSessionTutorIdBio } from '@/application/hooks/sessions/sessions'

export default defineComponent({
	name: 'TutorsListCard',
	props: {
		tutor: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const { user } = useAuth()
		const canRequestSession = computed({
			get: () => user.value &&
				user.value.id !== props.tutor.id &&
				user.value.canRequestSessions &&
				props.tutor.canHostSessions,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.tutor.id!, user: props.tutor.bio })
			useSessionModal().openCreateSession()
		}
		return { formatNumber, pluralize, canRequestSession, requestNewSession }
	}
})
</script>

<style lang="scss" scoped>
	.w-30 {
		width: 30%;
	}

	.btn {
		min-width: 100%;
		max-width: 20rem;
	}

	.session {
		font-weight: 700;
		font-size: 1rem;
		width: 60%;
	}

	.w-48 {
		width: 100%;
		@media (min-width: $md) {
			width: 48%;
		}
	}

	.nerd-card {
		display: flex;
		align-items: center;
		@media (min-width: $md) {
			& > *:first-child {
				// min-width: 120px;
				text-align: right;
				font-size: 1rem;
			}
		}
	}

	.head-text {
		font-size: 18px;
	}

	.sub-text {
		font-size: 18px;
		color: $color-primary;
		font-weight: normal;
	}

	.custom-p {
		padding-right: 3rem;
		padding-left: 3rem;
		@media (min-width: $sm) {
			padding: 0 2rem;
		}
	}

	.nerd-body {
		background: $color-white;
		border-radius: 12px;
		padding: 1rem 1rem;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		@media (min-width: $sm) {
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
		}
	}

	.name {
		color: $color-dark;
		font-size: 24px;
		font-weight: 600;
	}

	.rank {
		color: $color-primary;
		font-size: 18px;
		font-weight: 400;
	}
</style>
