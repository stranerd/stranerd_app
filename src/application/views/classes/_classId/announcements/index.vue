<template>
	<ClassWrapper>
		<template #header>
			<div class="hidden lg:flex px-4 mb-4  justify-between items-center">
				<IonText class="font-bold text-2xl">{{ $route.meta.routeName ?? 'Stranerd' }}</IonText>
				<IonButton @click="$router.push('/classes/announcements/create')">Make an announcement</IonButton>
			</div>
		</template>
		<template v-slot="{ classInst }">
			<AnnouncementsList :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import AnnouncementsList from '@app/components/classes/announcements/AnnouncementsList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesClassIdAnnouncements',
	components: { AnnouncementsList, ClassWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Announcements', { back: true })
	}
})
</script>
