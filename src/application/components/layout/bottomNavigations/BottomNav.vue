<template>
	<IonFooter class="ion-no-border border-top-line">
		<IonToolbar class="lg:hidden pt-0.5">
			<div class="flex justify-around items-center text-sub">
				<router-link
					v-for="{ path, icon,  iconOutline } in [
						{ name: 'Classes', path: '/classes', icon: people, iconOutline:peopleOutline },
						{ name: 'Questions', path: '/questions', icon: helpCircle, iconOutline:helpCircleOutline },
						{ name: 'Discussions', path: '/study', icon: chatbubbles, iconOutline:chatbubblesOutline },
						{ name: 'Tests', path: '/study/preps/', icon: receipt, iconOutline:receiptOutline },
						{ name: 'Home', path: '/dashboard', icon: person, iconOutline:personOutline },
					]" :key="path" :to="path"
					class="col-span-1 flex flex-col items-center justify-center">
					<ion-icon :icon="$route.path === path ? icon : iconOutline" class="w-6 md:w-14" />
				</router-link>
			</div>
		</IonToolbar>
	</IonFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter, IonIcon, IonToolbar } from '@ionic/vue'
import {
	chatbubbles,
	chatbubblesOutline,
	helpCircle,
	helpCircleOutline,
	people,
	peopleOutline,
	person,
	personOutline,
	receipt,
	receiptOutline,
	search,
	searchOutline
} from 'ionicons/icons'

export default defineComponent({
	components: { IonFooter, IonIcon, IonToolbar },
	setup () {
		return {
			personOutline, chatbubblesOutline, helpCircleOutline, peopleOutline, searchOutline, receiptOutline,
			chatbubbles, helpCircle, person, people, search, receipt
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-icon {
		font-size: 23px;
	}

	ion-toolbar {
		--background: #{$color-bodyBg};
		--color: #{$color-bodyText};
	}
</style>
