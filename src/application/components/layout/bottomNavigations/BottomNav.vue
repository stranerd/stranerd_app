<template>
	<IonFooter class="ion-no-border border-top-line">
		<IonToolbar class="lg:hidden pt-0.5">
			<div class="flex justify-around items-center text-sub text-main_dark">
				<router-link
					v-for="{ path, icon, name, iconOutline } in [
						{ name: 'Home', path: '/dashboard', icon: home, iconOutline:homeOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
						{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
						{ name: 'Library', path: '/study', icon: library, iconOutline:libraryOutline },
						{ name: 'Classes', path: '/classes', icon: people, iconOutline:peopleOutline }
					]" :key="path"
					:to="path"
					class="col-span-1 flex flex-col items-center justify-center">
					<ion-icon :icon="$route.path === path ? icon : iconOutline " class="w-6 md:w-14" />
					<IonText>{{ name }}</IonText>
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
	receipt,
	receiptOutline,
	search,
	searchOutline
} from 'ionicons/icons'

export default defineComponent({
	components: { IonFooter, IonIcon, IonToolbar },
	setup () {
		return {
			homeOutline, libraryOutline, helpCircleOutline, peopleOutline, searchOutline, receiptOutline,
			library, helpCircle, home, people, search, receipt
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-icon {
		font-size: 23px;
	}

	ion-toolbar {
		--background: #{$color-white};
	}
</style>
