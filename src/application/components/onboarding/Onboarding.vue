<template>
	<div class="w-full h-full flex flex-col justify-center gap-12 p-8">
		<Logo :showName="true" class="mx-auto" />
		<div class="flex flex-col justify-center items-center gap-4">
			<img :src="data[tab-1].image" alt="" class="rounded-2xl w-full" />
			<IonText class="text-2xl text-secondaryText font-bold mt-8">{{ data[tab - 1].title }}</IonText>
			<IonText class="text-secondaryText max-w-[75vw] text-center text-lg">
				{{ data[tab - 1].description }}
			</IonText>
			<div class="flex justify-center gap-2 mt-4">
				<span v-for="n in tabs" :key="n"
					:class="[n === tab ? 'bg-primaryBg':'bg-disabled', 'rounded-full w-2 h-2']"
					@click="tab = n" />
			</div>
		</div>
		<div class="flex flex-col justify-between gap-4 mt-auto">
			<template v-if="tab < tabs">
				<IonButton class="btn-primary w-full" @click="tab++">
					Next
				</IonButton>
				<router-link to="/auth/signup">
					<IonButton class="btn-outline no-border w-full">
						Skip
					</IonButton>
				</router-link>
			</template>
			<template v-else>
				<router-link to="/auth/signin">
					<IonButton class="btn-primary w-full">
						Login
					</IonButton>
				</router-link>
				<router-link to="/auth/signup">
					<IonButton class="btn-outline no-border w-full">
						Sign up
					</IonButton>
				</router-link>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'Onboarding',
	setup () {
		const tab = ref(1)
		const data = [
			{
				title: 'Welcome to Stranerd', image: require('@app/assets/images/onboarding/1.png'),
				description: 'Get access to expert answers and study materials for assignment help, and test & exam preparation.'
			},
			{
				title: 'Get assignment help', image: require('@app/assets/images/onboarding/2.png'),
				description: 'Share tough questions you come across in homework or while studying to get expert answers to them.'
			},
			{
				title: 'Study with flashcards', image: require('@app/assets/images/onboarding/3.png'),
				description: 'Share tough questions you come across in homework or while studying to get expert answers to them.'
			},
			{
				title: 'Rank on leaderboard', image: require('@app/assets/images/onboarding/4.png'),
				description: 'Fight for the daily, weekly, monthly, or overall top spot in your department or in general with points from studying.'
			}
		]
		const tabs = data.length
		return { tabs, tab, data }
	}
})
</script>

<style scoped>
.no-border {
	--border-color: transparent !important
}
</style>
