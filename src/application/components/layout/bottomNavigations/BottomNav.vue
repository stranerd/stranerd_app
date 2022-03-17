<template>
	<IonFooter class="ion-no-border">
		<IonToolbar class="lg:hidden !bg-white border-top-line">
			<div class="flex justify-around items-center text-sm">
				<router-link
					v-for="{ path, icon, name, iconOutline } in [
						{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
						{ name: 'Library', path: '/study', icon: library, iconOutline:libraryOutline },
						{ name: 'TestPreps', path: '/testPreps', icon: receipt, iconOutline:receiptOutline },
						...(isProd ? [] : [{ name: 'Classes', path: '/classes', icon: people, iconOutline:peopleOutline }])
					]" :key="path"
					:to="path"
					class="col-span-1 text-main_dark flex flex-col items-center justify-center">
					<ion-icon :icon="$route.path === path ? icon : iconOutline " class="w-6 md:w-14" />
					<IonText class="hidden md:inline">{{ name }}</IonText>
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter, IonIcon, IonToolbar } from '@ionic/vue'
import {
	helpCircle,
	helpCircleOutline,
	home,
	homeOutline,
	library,
	libraryOutline,
	people,
	peopleOutline,
	search,
	searchOutline,
	receipt,
	receiptOutline
} from 'ionicons/icons'
import { isProd } from '@utils/environment'

export default defineComponent({
	components: { IonFooter, IonIcon, IonToolbar },
	setup () {
		return {
			isProd,
			homeOutline,
			libraryOutline,
			helpCircleOutline,
			peopleOutline,
			searchOutline,
			library,
			helpCircle,
			home,
			people,
			search,	receipt,
			receiptOutline
		}
	}
})
</script>

<style scoped>
	ion-toolbar {
		--background: #FFFFFF;
		--border-color: rgba(0, 0, 0, .4)
	}

	ion-tab-button {
		--color-selected: #546DD3;
		--padding-top: 1px;
		--padding-bottom: 1px;
		--color: #808e9c;
		--ripple-color: #546DD3;
	}

	ion-icon {
		font-size: 23px;
	}
</style>
