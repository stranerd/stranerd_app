<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="p-4">
			<div class="flex items-center px-4 py-3 rounded-lg border text-sm text-secondaryText mb-4">
				<IonText class="text-bodyText font-bold">MEG 111</IonText>
				<span class="mx-3 h-1 w-1 bg-secondaryText rounded-full"></span>
				<IonText class="">100L</IonText>
				<span class="mx-3 h-1 w-1 bg-secondaryText rounded-full"></span>
				<IonText class="">33 attended</IonText>
			</div>

			<router-link to="/qr-code">
				<div class="flex items-center justify-between px-4 py-3 text-sm rounded-lg border mb-4">
					<span class="flex items-center text-secondaryText">
						<IonIcon :icon="qrCodeOutline" class="mr-4" />
						<IonText>Show QR Code</IonText>
					</span>
					<IonIcon :icon="arrowForwardOutline" class="text-secondaryText" />
				</div>
			</router-link>

			<div class="p-4 rounded-lg border mb-4">
				<IonText class="text-bodyText font-bold text-base block">Attended by</IonText>
				<AttendedCard name="Chiamaka Ndukwe"/>
				<AttendedCard name="Tony Ndicka"/>
				<AttendedCard name="Adeyemi Kareem"/>
				<AttendedCard name="Yinka Bonucci"/>
				<AttendedCard name="Wisdom Omole"/>
				<AttendedCard name="Chiamaka Ndukwe"/>
				<AttendedCard name="Tony Ndicka"/>
				<AttendedCard name="Adeyemi Kareem"/>
				<AttendedCard name="Yinka Bonucci"/>
                
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
		useRouteMeta('Tue, 26 July', { back: true })

		return { qrCodeOutline, arrowForwardOutline }
	}
})
</script>
