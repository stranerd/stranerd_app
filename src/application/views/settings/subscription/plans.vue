<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>

		<div class="flex gap-8">
			<div class="flex flex-col border gap-4 p-6 flex-1  rounded-2xl">
				<span class="font-bold">Premium</span>
				<IonText><span class="text-xl font-bold">N1500</span> /month</IonText>
				<span v-for="n in
						[
							{name:'Class', available:true},
							{name:'Flashcards', available:true},
							{name:'File storage', available:true},
							{name:'Answer a question', available:true},
							{name:'Ask a question', available:false},
							{name:'Answers', available:false},
							{name:'Student connect', available:false},
						]"
					:key="n.name"
					class=" flex items-center gap-2"
				>
					<IonIcon :class="n.available ? 'text-success' : 'text-danger'"
						:icon="n.available ? checkmarkOutline : closeOutline" />
					<IonText>{{ n.name }}</IonText>
				</span>

				<IonButton class="mt-6">Subscribe</IonButton>
			</div>
			<div class="flex flex-col border gap-4 p-6 flex-1 rounded-2xl">
				<span class="font-bold">Basic Free</span>
				<IonText><span class="text-xl font-bold">N0</span> /month</IonText>
				<span v-for="n in
						[
							{name:'Class', available:true},
							{name:'Flashcards', available:true},
							{name:'File storage', available:true},
							{name:'Answer a question', available:true},
							{name:'Ask a question', available:true},
							{name:'Answers', available:true},
							{name:'Student connect', available:true},
						]"
					:key="n.name"
					class=" flex items-center gap-2"
				>
					<IonIcon :icon="checkmarkOutline" class="text-success" />
					<IonText>{{ n.name }}</IonText>
				</span>

				<IonButton class="mt-6" disabled>Current plan</IonButton>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'
import { cardOutline, checkmarkOutline, closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SettingsSubscriptionPlans',
	components: { SettingsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Available plans', { back: true })
		return { checkmarkOutline, cardOutline, closeOutline }
	}
})
</script>
