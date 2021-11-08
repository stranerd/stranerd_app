<template>
	<IonPage>
		<IonContent>
			<div class="col-span-12  md:col-start-3 md:col-end-11 px-3 ">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<button
						:class="selectedTab == 'explore' ? 'activeSlideTab w-1/2' : 'inactiveSlideTab w-1/2'"
						@click="handleSliding('0')">
						Explore tutors
					</button>
					<button :class="selectedTab == 'find' ? 'activeSlideTab w-1/2' : 'inactiveSlideTab w-1/2'"
						@click="handleSliding('1')">
						Find a tutor
					</button>
				</div>
				<div class="col-span-12 mb-16">
					<swiper
						@slideChange="onSlideChange"
						@swiper="onSwiper"
					>
						<swiper-slide>
							<ExploreTutors />
						</swiper-slide>
						<swiper-slide>
							<FindTutors />
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import 'swiper/swiper-bundle.min.css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ExploreTutors from '@app/components/users/tutors/ExploreTutors.vue'
import FindTutors from '@app/components/users/tutors/FindTutors.vue'

export default defineComponent({
	name: 'DashboardTutorsPage',
	layout: 'dashboard',
	components: { IonPage, IonContent, ExploreTutors, Swiper, SwiperSlide, FindTutors },

	setup () {

		const selectedTab = ref('explore')

		const swiperData = ref({
			slideTo: Function,
			update: Function
		})

		const onSwiper = (swiper: any) => {

			swiperData.value = swiper
		}

		const onSlideChange = () => {
			const ionPage = document.querySelector('ion-content')
			if (selectedTab.value == 'explore') {
				selectedTab.value = 'find'
			} else {
				selectedTab.value = 'explore'
			}

			ionPage?.scrollToTop()
		}

		const handleSliding = (index: string) => {
			swiperData.value.slideTo(index)

			swiperData.value.update()

		}
		return {
			onSwiper,
			swiperData,
			selectedTab,
			onSlideChange,
			handleSliding
		}
	}
})
</script>
<style scoped>
	ion-toolbar {
		--background: #ffffff;
	}
</style>
