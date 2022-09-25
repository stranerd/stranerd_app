<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
        <div class="p-4 w-full h-full flex items-center justify-center">
            <div class="text-base w-full flex items-center justify-between">
                <IonText>Scanned by</IonText>
                <IonText class="text-blackText">21</IonText>
            </div>
        </div>
	</DefaultLayout>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { qrCodeOutline, arrowForwardOutline } from 'ionicons/icons'
import AttendedCard from '../components/teacher/logDetails/attendedCard.vue'


export default defineComponent({
	name: 'CreateCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
    components: { AttendedCard },
	setup () {
		useRouteMeta('QR Code', { back: true })

		return { qrCodeOutline, arrowForwardOutline }
	}
})
</script>
