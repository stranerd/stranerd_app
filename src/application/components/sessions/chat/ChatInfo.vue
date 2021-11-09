<template>
	<div
		class=" flex flex-col absolute h-full w-full overflow-y-auto border-r-[1px] normalText text-icon_inactive border-faded_gray lg:rounded-tr-xl lg:rounded-br-xl">
		<div
			class="flex flex-row items-center justify-between px-3 py-4 border-b-[1px] border-faded_gray sticky top-0 bg-white z-50">
			<h2 class="text-dark_gray text-base font-bold ">Info</h2>
		</div>

		<div class="py-4 w-full px-3 flex items-center flex-row gap-2   border-b-[1px] border-light_gray">

			<avatar :photoUrl="user?.avatar?.link" :size="'55'" />
			<div class="flex flex-col gap-1">
				<h2 class="font-bold text-dark_gray">{{ user?.fullName }}</h2>
				<div class="flex flex-row gap-1 items-center  ">
					<ShowRatings :rating="user?.ratingCount ? user.ratingCount : 3" />
				</div>
				<div class="mt-1">
					<span
						class="py-1 px-3  rounded-xl border-faded_gray border-[1px] text-center font-bold text-xs text-icon_inactive bg-light_green">
						{{ user?.rank.id }}
					</span>
				</div>
			</div>

		</div>

		<div class="py-4 w-full flex flex-col gap-3 ">

			<div class="flex flex-col gap-1 px-3 py-2 pb-6 border-b-[1px] border-light_gray">
				<h2 class="text-xs font-bold text-dark_gray">Subject</h2>
				<span>Matheematics</span>
			</div>

			<div class="flex flex-col gap-1 px-3 py-2 pb-6 border-b-[1px] border-light_gray">
				<h2 class="text-xs font-bold text-dark_gray">Date & Time</h2>
				<span>14:00 - 16:00</span>
				<span class="text-xs text-dark_gray">19 October 2021</span>
			</div>

			<div class="flex flex-col gap-1 px-3 py-2 pb-6 border-b-[1px] border-light_gray">
				<h2 class="text-xs font-bold text-dark_gray">Status</h2>
				<span>Ended</span>
			</div>

			<div class="flex flex-col gap-1 px-3 py-2 pb-6 border-b-[1px] border-light_gray">
				<div class="flex flex-row items-center justify-between mb-2">
					<h2 class="text-xs font-bold text-dark_gray">Share resources</h2>
					<ion-icon :icon="chevronForward" class="text-[20px]"></ion-icon>
				</div>
				<div class="w-full grid grid-cols-12 gap-3">
					<div
						class="py-7 col-span-4 bg-light_gray rounded-xl text-icon_inactive flex flex-row items-center justify-center">
						<ion-icon :icon="documentText" class="text-[30px]"></ion-icon>
					</div>

					<div
						class="py-7 col-span-4 bg-light_gray rounded-xl text-icon_inactive flex flex-row items-center justify-center">
						<ion-icon :icon="logoYoutube" class="text-[30px]"></ion-icon>
					</div>

					<div
						class="py-7 col-span-4 bg-light_gray rounded-xl text-icon_inactive flex flex-row items-center justify-center">
						<ion-icon :icon="document" class="text-[30px]"></ion-icon>
					</div>

					<div
						class="py-7 col-span-4 bg-light_gray rounded-xl text-icon_inactive flex flex-row items-center justify-center">
						<ion-icon :icon="images" class="text-[30px]"></ion-icon>
					</div>

					<div
						class="py-7 col-span-4 bg-light_gray rounded-xl text-icon_inactive flex flex-row items-center justify-center">
						<ion-icon :icon="document" class="text-[30px]"></ion-icon>
					</div>

					<div
						class="py-7 col-span-4 bg-light_gray rounded-xl text-icon_inactive flex flex-row items-center justify-center">
						<ion-icon :icon="documentText" class="text-[30px]"></ion-icon>
					</div>

				</div>
			</div>


			<div
				class="flex flex-row gap-1 px-3 py-2 pb-6 border-b-[1px] border-light_gray justify-between items-center">
				<h2 class="text-xs font-bold text-dark_gray">Date & Time</h2>
				<ion-icon :icon="ellipseOutline" class="text-[22px]"></ion-icon>
			</div>

		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronForward, document, documentText, ellipseOutline, images, logoYoutube } from 'ionicons/icons'
import Avatar from '../../core/AvatarUser.vue'
import ShowRatings from '../../core/ShowRatings.vue'
import { useUser } from '@app/composable/users/user'

export default defineComponent({
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props: any) {

		const { user } = useUser(props.userId)
		return {
			chevronForward, documentText, logoYoutube, user, document, images, ellipseOutline
		}
	},
	components: {
		Avatar, ShowRatings, IonIcon
	}
})
</script>
