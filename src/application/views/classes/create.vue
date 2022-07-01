<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<ClassForm :error="error" :factory="factory" :loading="loading" :submit="createClass" class="page-padding">
			<template v-slot:buttonText>Create Class</template>
		</ClassForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { useCreateClass } from '@app/composable/classes/classes'
import ClassForm from '@app/components/classes/classes/ClassForm.vue'

export default defineComponent({
	name: 'ClassesCreate',
	components: { ClassForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', 'isAccountVerified']),
	setup () {
		useRouteMeta('Create a class', { back: true })
		const { createClass, factory, error, loading } = useCreateClass()
		return { error, loading, createClass, factory }
	}
})
</script>
