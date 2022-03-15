<template>
	<div
		class="hidden lg:flex py-3 bg-white h-full flex-col">
		<div class="flex flex-col pl-8 mt-6">
			<router-link v-for="{ path, icon, name, iconOutline } in [
					{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
					{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
					{ name: 'Library', path: '/study', icon: library, iconOutline:libraryOutline },
					...(isProd ? [] : [{ name: 'Classes', path: '/classes', icon: people, iconOutline:peopleOutline }])
				]" :key="path" :to="path"
				class="flex flex-col text-icon_inactive cursor-pointer text-sm hover:text-main_dark mb-2">
				<div :class="{'text-main_dark active-route-link relative bg-new_gray': $route.path === path }"
					class="py-4 flex px-8 items-center rounded-tl-full rounded-bl-full">
					<ion-icon :icon="$route.path === path ? icon : iconOutline " class="text-[23px] mr-4" />
					<span class="font-semibold capitalize">{{ name }}</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	library,
	libraryOutline,
	people,
	peopleOutline
} from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'
import { isProd } from '@utils/environment'

export default defineComponent({
	components: { IonIcon },
	setup () {
		return {
			isProd,
			libraryOutline,
			homeOutline,
			helpCircleOutline,
			peopleOutline,
			library,
			home,
			helpCircle,
			people
		}
	}
})
</script>
