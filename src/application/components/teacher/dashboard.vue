<template>
	<div class="flex flex-col gap-4 lg:gap-8">
		<div class="showcase-flex">
			<router-link v-for="{ title, sub, route, color } in [
				{ title: 'Create a course', route: '/courses/create', sub: 'Manage your students better; make announcement, send files, post assignments, and take attendance.', color: 'bg-primaryBg text-primaryText' },
			]" :key="route" :class="color" :to="route" class="card-sm card-padding flex flex-col">
				<span class="flex gap-2 text-lg font-bold">
					<IonText>{{ title }}</IonText>
					<IonIcon :icon="arrowForwardOutline" />
				</span>
				<IonText>{{ sub }}</IonText>
			</router-link>
		</div>

		<router-link to="/courses/id" class="grid grid-cols-2 gap-4">
			<div class="card-sm card-padding flex flex-col" v-for="n in 10" :key="n">
				<div class="flex w-full justify-between">
					<IonText class="font-bold">MEG 511</IonText>
					<span class="bg-green text-xs font-bold grid place-items-center rounded px-3 py-1 text-primaryText">100L</span>
				</div>
				<ionText class="text-xs font-bold text-gray">University of Lagos</ionText>
				<ionText class="text-xs  text-gray">Electrical Engineering</ionText>
			</div>
		</router-link>

	</div>
</template>

<script setup lang="ts">
import { arrowForwardOutline } from 'ionicons/icons'
</script>

<style scoped>

</style>