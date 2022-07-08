<template>
	<DefaultLayout>
		<div>
			<div class=" flex justify-center items-center  max-w-[296px] mx-auto mt-4 border rounded-lg">
				<span v-for="(item,index) in [
						{name:'notifications'},
						{name:'activity'},
					]" :key="index" :class="[selected===item.name?'bg-primaryBg text-primaryText':'','flex-1 text-center  py-2 rounded-lg capitalize']" 
					@click="selected = item.name">
					{{item.name}}
				</span>

			</div>
			<div class="showcase-flex" v-if="selected==='notifications'">
				<EmptyState
					v-if="!loading && !error && !notifications.length"
					info="You have no notifications yet"
				/>
				<NotificationsListCard
					v-for="notification in notifications"
					:key="notification.hash" :notification="notification"
					class="border-bottom-line"
				/>
				<BlockLoading v-if="loading" />
				<LoadMore v-if="hasMore" :load="fetchOlderNotifications" />
			</div>

			<div class="showcase-flex" v-if="selected==='activity'">
				<EmptyState
					v-if="!loading && !error && !notifications.length"
					info="You have no notifications yet"
				/>
				<div class="flex flex-col card card-padding border-bottom-line" v-for="n in 5" :key="n">
					<div class="flex gap-4 items-center">
						<Avatar :size="32"/>
						<IonText class="font-bold">Timmy just created a flashcard. <span class="font-normal block text-xs">30m ago  </span></IonText>
					</div>

					<div class="card-padding border ml-12 rounded-lg ">
						The answer is 12
					</div>
				
				</div>
				<BlockLoading v-if="loading" />
				<LoadMore v-if="hasMore" :load="fetchOlderNotifications" />
			</div>
		</div>
	
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useNotificationList } from '@app/composable/users/notifications'
import NotificationsListCard from '@app/components/users/notifications/NotificationsListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Notifications',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { NotificationsListCard, EmptyState },
	setup () {
		const selected = ref('notifications')
		useRouteMeta('Notifications', { back: true })
		const { notifications, error, loading, hasMore, fetchOlderNotifications } = useNotificationList()
		return { notifications, error, loading, hasMore, fetchOlderNotifications, selected }
	}
})
</script>
