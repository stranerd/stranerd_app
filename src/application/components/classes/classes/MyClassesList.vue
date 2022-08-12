<template>
	<div class="flex flex-col">
		<router-link v-if="!loading && !error && classes.length === 0"
			class="card-padding flex flex-col !gap-0 border-bottom-line" to="/classes/">
			<div class="font-bold flex items-center text-lg gap-2">
				<IonText>Find your class</IonText>
				<IonIcon :icon="arrowForwardCircleOutline" />
			</div>
			<IonText class="text-secondaryText">
				If you don’t find your class, please
				<router-link class="text-info" to="/settings/contact">contact us</router-link>
				.
			</IonText>
		</router-link>
		<ClassListCard v-for="classInst in classes" :key="classInst.hash" :classInst="classInst"
			class="border-bottom-line" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassListCard from '@app/components/classes/classes/ClassListCard.vue'
import { useUserClassList } from '@app/composable/users/users/classes'
import { arrowForwardCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'MyClassesList',
	components: { ClassListCard },
	setup () {
		const { classes, error, loading } = useUserClassList()
		return { classes, error, loading, arrowForwardCircleOutline }
	}
})
</script>
