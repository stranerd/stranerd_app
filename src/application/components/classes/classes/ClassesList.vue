<template>
	<div class="showcase-flex">
		<div v-if="user?.isVerified" class="flex items-center justify-end px-4 pt-4 md:p-0">
			<router-link class="w-full md:w-auto" to="/classes/create">
				<ion-button class="btn-primary font-bold w-full">
					Create a class
				</ion-button>
			</router-link>
		</div>
		<EmptyState v-if="!loading && !error && classes.length === 0" info="You are not a member of any class!" />
		<ClassListCard v-for="classInst in classes" :key="classInst" :classInst="classInst" />
		<IonSkeletonText v-if="loading" animated class="h-28 rounded-xl px-4" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassListCard from '@app/components/classes/classes/ClassListCard.vue'
import { useUserClassList } from '@app/composable/users/users/classes'
import { IonSkeletonText } from '@ionic/vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ClassesList',
	components: { ClassListCard, IonSkeletonText },
	setup () {
		const { user } = useAuth()
		const { classes, error, loading } = useUserClassList()
		return { user, classes, error, loading }
	}
})
</script>
