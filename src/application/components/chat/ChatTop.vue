<template>
<div class="flex flex-row items-center px-2 py-[9.5px] z-50 border-b-[1px] border-faded_gray normalText text-icon_inactive justify-between normalText bg-white sticky w-full top-0">
	<div class="flex flex-row items-center gap-2">
	 <router-link to="/chat">
	 <ion-icon :icon="arrowBack" class="text-dark_gray mr-2 text-[25px] cursor-pointer"></ion-icon>
	 </router-link> 
	 <avatar :size="'32'" :photo-url="user?.avatar?.link"/>
	 <div class="flex flex-col ">
	    <h2 class="font-bold text-dark_gray">
	       {{ user?.fullName }}
	     </h2>
	     <span>{{ user?.isOnline ? 'Active now' : time }}</span>
	 </div>
	</div>

	<div class="flex flex-row items-center gap-3">
	  <ion-icon :icon="search" class=" text-[23px]" ></ion-icon>
	  <ion-icon :icon="ellipsisVertical" class="text-[23px]" ></ion-icon>
	</div>
	
</div>

</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import {  IonIcon } from '@ionic/vue'
import { arrowBack, search, ellipsisVertical } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { handleCloseChat } from '@/application/composable/sessions/ChatHandler'
import { UserEntity } from '@/modules/users'
import { useCountdown, useTimeDifference } from '@/application/composable/core/dates'
import { useAuth } from '@/application/composable/auth/auth'
import { setNewSessionTutorIdBio, useSession } from '@/application/composable/sessions/sessions'
import { analytics } from '@/modules/core'
import { setReportedEntity } from '@/application/composable/reports/answers'
import { useCurrentSession } from '@/application/composable/sessions/session'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))

export default defineComponent({
	props: {
		user: {
			type: Object as PropType<UserEntity>
		}
	},
	setup(props: any) {
		const router = useRouter()
		const show = ref(false)
		const { time, startTimer, stopTimer } = useTimeDifference(props.user?.lastSeen)
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
			set: () => {
			}
		})
		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.user.id, user: props.user.bio })
			show.value = false
		}
		const { endSession: end, loading, error } = useSession(currentSessionId.value ?? '')
		const endSession = async () => {
			show.value = false
			await end()
			// await analytics.logEvent('session_ended', {
			// 	sessionId: currentSessionId.value,
			// 	duration: currentSession.value?.duration ?? 0,
			// 	lasted: (currentSession.value?.duration ?? 0) - (diffInSec.value / 60)
			// })
		}
		// const reportUser = () => {
		// 	setReportedEntity(props.user.id)
		// 	// useReportModal().openReportUser()
		// 	show.value = false
		// }
		const canRequestSession = computed({
			get: () => user.value?.canRequestSessions && props.user.canHostSessions,
			set: () => {
			}
		})
		const inSession = computed({
			get: () => currentSessionId.value &&
				currentSessionId.value === props.user.currentSession,
			set: () => {
			}
		})
		const canEndSession = computed({
			get: () => currentSessionId.value === props.user.currentSession &&
				currentSession.value?.studentId === id.value,
			set: () => {
			}
		})
		return { 
			arrowBack, search, ellipsisVertical, router, handleCloseChat,
			canRequestSession, canEndSession, inSession,
			show, time, countDown, requestNewSession,
			endSession, loading, error
		}
	},
	components: { 
		Avatar,
		IonIcon
	}
})
</script>

function useReportModal() {
  throw new Error('Function not implemented.')
}
