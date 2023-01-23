<template>
	<DefaultLayout>
		<div class="h-full flex flex-col">
			<div class="nav-scroll lg:hidden">
				<router-link v-for="{ label, route } in [
					{ label: 'My Practice', route: '/study/preps/' },
					{ label: 'Practice Tests', route: '/study/preps/practice' },
					{ label: 'Solution Manuals', route: '/study/preps/solutions' }
				]" :key="route" :to="route">
					<IonText>{{ label }}</IonText>
				</router-link>
			</div>
			<div class="flex-grow">
				<slot />
			</div>
		</div>
	</DefaultLayout>
</template>
