<template>
	<DefaultLayout>
		<main >
			<!-- <router-link class="border-bottom-line p-4 flex items-center gap-4"
				to="/study/preps/start">
				<IonIcon :icon="addOutline" />
				<IonText>Take test/Study solutions</IonText>
			</router-link>

			<ContinueTests /> -->

			<header class="flex flex-col px-4 py-6">
				<IonText class="font-bold text-base">Improve your studying</IonText>
				<span class="text-xs mt-2">Here you can find exam MCQ solutions, exam theory solutions, and textbook solutions.</span>
				<IonSearchbar  placeholder="Find solutions" type="search" class="!mt-6" />
			</header>

			<div class="flex flex-col lg:gap-4">
				<div class="flex items-center justify-between">
					<span v-for="path in [
							{ name: 'MCQs' },
							{ name: 'Theories'},
							{ name: 'Textbooks' },

						]" :key="path.name"
						:class="{ 'border-b-2 !text-primaryBg !border-primaryBg': path.name === tab}"
						class="border-b border-itemBg text-secondaryText p-4 capitalize w-full flex justify-center items-center gap-2"
						@click="tab = path.name">
						<span>{{ path.name }}</span>
					</span>
				</div>
			
			</div>

			<section class="mt-4 p-4" v-if="tab == 'MCQs'">
				<div class="card-sm p-4">
					<div class="flex justify-between">
						<IonText class="font-bold">GST</IonText>
						<Tag tag="Test" :index="2" />
					</div>
					<IonText class="text-sm">UNILAG</IonText>
					<div class="flex justify-between">
						<IonText class="text-xs">2020</IonText>
						<IonText class="text-xs">Save for later</IonText>

					</div>
				</div>
			</section>
			<!-- This contains the empty content state -->
			<section  class="mt-4 p-4" v-if="tab == 'Theories'">
				<div class="flex justify-center items-center flex-col text-center gap-3">
					<img src="@/assets/images/empty_states/tests.svg" alt="Images">
					<IonText class="text-base font-bold">Nothing here</IonText>
					<span class="max-w-[200px] text-sm">You have not saved any MCQ.
						Find using the search bar above.</span>
				</div>
				
			</section>
			<!-- This contains the empty search state -->
			<section  class="mt-4 p-4" v-if="tab == 'Textbooks'">
				<div class="flex justify-center items-center flex-col text-center gap-3">
					<img src="@/assets/images/empty_states/search.svg" alt="Images">
					<IonText class="text-base font-bold">Nothing was found</IonText>
					<span class="max-w-[250px] text-sm">We don’t have what you’re looking for yet.
						Make a request so we can get it for you.</span>

					<IonButton class="btn-outline">Tell us what you want</IonButton>
					<IonButton>Submit</IonButton>
				</div>
				
			</section>
	
		</main>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addOutline } from 'ionicons/icons'
import ContinueTests from '@root/application/components/study/tests/ContinueTests.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyPreps',
	// components: { ContinueTests },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', {})
		const tab = ref('MCQs')
		return { tab, addOutline }
	}
})
</script>
