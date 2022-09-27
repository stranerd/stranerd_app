<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="p-4 w-full h-full flex flex-col gap-8 items-center justify-center">
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/QR_deWP.svg/1200px-QR_deWP.svg.png" class="w-[200px] h-[200px] mx-auto" alt="">
			<div class="text-base w-full flex items-center justify-between">
				<IonText>Scanned by</IonText>
				<IonText class="text-blackText">21</IonText>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { qrCodeOutline, arrowForwardOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'CreateCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { },
	setup() {
		useRouteMeta('QR Code', { back: true })

		return { qrCodeOutline, arrowForwardOutline }
	}
})
</script>
