<template>
	<DefaultLayout>
		<div>
			<header class="flex flex-col px-4 py-6 gap-2">
				<IonText class="font-bold text-lg">Improve your studying</IonText>
				<span>Here you can find exam MCQ solutions, exam theory solutions, and textbook solutions.</span>
				<IonSearchbar class="mt-4" placeholder="Find solutions" />
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

			<section v-if="tab === 'MCQs'" class="mt-4 p-4">
				<div class="card-sm p-4">
					<div class="flex justify-between">
						<IonText class="font-bold">GST</IonText>
						<Tag :index="2" tag="Test" />
					</div>
					<IonText class="text-sm">UNILAG</IonText>
					<div class="flex justify-between">
						<IonText class="text-xs">2020</IonText>
						<IonText class="text-xs">Save for later</IonText>

					</div>
				</div>
			</section>
			<section v-if="tab === 'Theories'" class="mt-4 p-4">
				<div class="flex justify-center items-center flex-col text-center gap-3">
					<img alt="" src="@/assets/images/emptyStates/tests.svg">
					<IonText class="text-base font-bold">Nothing here</IonText>
					<span class="max-w-[200px] text-sm">You have not saved any MCQ.
						Find using the search bar above.</span>
				</div>
			</section>
			<section v-if="tab === 'Textbooks'" class="mt-4 p-4">
				<div class="flex justify-center items-center flex-col text-center gap-3">
					<img alt="" src="@/assets/images/emptyStates/search.svg">
					<IonText class="text-base font-bold">Nothing was found</IonText>
					<span class="max-w-[250px] text-sm">We don’t have what you’re looking for yet.
						Make a request so we can get it for you.</span>

					<IonButton class="btn-outline">Tell us what you want</IonButton>
					<IonButton class="btn-primary">Submit</IonButton>
				</div>
			</section>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addOutline } from 'ionicons/icons'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyPreps',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', {})
		const tab = ref('MCQs')
		return { tab, addOutline }
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		min-width: 180px;
		--border-radius: 10rem;
		--padding-top: 1.25rem;
		--padding-bottom: 1.25rem;
	}
</style>
