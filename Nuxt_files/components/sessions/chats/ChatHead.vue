<template>
	<div class="flex py-0-5 gap-1 items-center position-relative bg-primary text-white">
		<NuxtLink to="/sessions">
			<i class="fas fa-arrow-left" />
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}`">
			<Avatar :size="40" :src="user.avatar" class="d-md-none" />
			<Avatar :size="60" :src="user.avatar" class="d-none d-md-inline" />
		</NuxtLink>
		<div class="me-auto">
			<NuxtLink :to="`/users/${user.id}`" class="text-wrap username">
				<DynamicText>
					{{ user.fullName }}
				</DynamicText>
			</NuxtLink>
			<DynamicText class="small">
				{{ user.isOnline ? 'Active now' : time }}
			</DynamicText>
		</div>
		<DynamicText v-if="inSession" class="lead">
			{{ countDown }}
		</DynamicText>
		<button class="btn navbar-toggler" @click="show = !show">
			<i class="fas fa-ellipsis-v text-white" />
		</button>
		<div v-if="show" class="under" @click="show = false" />
		<div v-if="show" class="drop-menu gap-0-5">
			<a v-if="canRequestSession" @click.prevent="requestNewSession">
				Request Session
			</a>
			<a @click="reportUser">Report</a>
			<PageLoading v-if="loading" />
			<a v-if="canEndSession" @click.prevent="cancelSession">End Session</a>
			<DisplayError :error="error" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import { UserEntity } from '@/modules/users'
import { useCountdown, useTimeDifference } from '@/application/hooks/core/dates'
import { setNewSessionTutorIdBio, useSession } from '@/application/hooks/sessions/sessions'
import { useReportModal, useSessionModal } from '@/application/hooks/core/modals'
import { useAuth } from '@/application/hooks/auth/auth'
import { useCurrentSession } from '@/application/hooks/sessions/session'
import { setReportedEntity } from '@/application/hooks/reports/users'
import { analytics } from '@/modules/core'

export default defineComponent({
	name: 'ChatHead',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const show = ref(false)
		const { time, startTimer, stopTimer } = useTimeDifference(props.user.lastSeen)
		const { id, currentSessionId, user } = useAuth()
		const { currentSession, endDate } = useCurrentSession()
		const { diffInSec, startTimer: startCountdown, stopTimer: stopCountdown } = useCountdown(endDate.value, {})
		onMounted(() => {
			startTimer()
			startCountdown()
		})
		onBeforeUnmount(() => {
			stopTimer()
			stopCountdown()
		})
		const countDown = computed({
			get: () => {
				const hours = Math.floor(diffInSec.value / 3600)
				const minutes = Math.floor((diffInSec.value % 3600) / 60)
				const seconds = Math.floor(diffInSec.value % 60)
				let hr = ''
				if (hours) hr = `${hours < 10 ? '0' + hours : hours}:`
				const rest = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
				return hr + rest
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.user.id, user: props.user.bio })
			useSessionModal().openCreateSession()
			show.value = false
		}
		const { cancelSession: cancel, loading, error } = useSession(currentSessionId.value ?? '')
		const cancelSession = async () => {
			show.value = false
			await cancel()
			analytics.logEvent('session_cancelled', {
				sessionId: currentSessionId.value,
				duration: currentSession.value?.duration ?? 0,
				lasted: (currentSession.value?.duration ?? 0) - (diffInSec.value / 60)
			})
		}
		const reportUser = () => {
			setReportedEntity(props.user.id)
			useReportModal().openReportUser()
			show.value = false
		}
		const canRequestSession = computed({
			get: () => user.value?.canRequestSessions && props.user.canHostSessions,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const inSession = computed({
			get: () => currentSessionId.value &&
				currentSessionId.value === props.user.currentSession,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const canEndSession = computed({
			get: () => currentSessionId.value === props.user.currentSession &&
				currentSession.value?.studentId === id.value,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		return {
			canRequestSession, canEndSession, inSession,
			show, time, countDown, requestNewSession,
			cancelSession, loading, error, reportUser
		}
	}
})
</script>

<style lang="scss" scoped>
	.username {
		display: block;
		font-weight: 700;
		@media (min-width: $md) {
			font-size: 20px;
		}
	}

	.under {
		position: fixed;
		width: 100vw;
		height: vh(100);
		left: 0;
		top: 0;
	}

	.drop-menu {
		padding: 0.9rem 0;
		position: absolute;
		top: 5rem;
		right: 1.5rem;
		width: 200px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		background: $color-white;
		color: $color-dark;
		border-radius: 0.5rem;
		border: 1px solid $color-line;

		a {
			padding: 0.5rem;
			padding-left: 1.3rem;
		}

		a:hover {
			font-size: unset;
			transform: unset;
			padding: 0.9rem;
			background: $color-line;
		}

		animation: slide-down 0.1s;
	}

	@keyframes slide-down {
		from {
			top: -50px;
		}

		to {
			top: 0;
		}
	}
</style>
