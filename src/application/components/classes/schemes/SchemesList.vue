<template>
	<div class="showcase-flex flex-1">
		<div class="flex justify-between items-center p-4 border-bottom-line"
			@click="openCreateSchemeModal(classInst, $router)">
			<IonText>Set up scheme of work</IonText>
			<IonIcon :icon="arrowForwardOutline" />
		</div>
		<div class="flex flex-col flex-1">
			<EmptyData v-if="!loading && !error && schemes.length === 0"
				sub="Contact your class admin to add your scheme of work."
				title="No scheme of work" />
			<div v-for="{ key: course, values } in schemes" :key="course"
				class="flex flex-col border-bottom-line p-4 gap-4">
				<div class="py-2 flex justify-between items-center cursor-pointer"
					@click="show[course] = !show[course]">
					<IonText class="font-bold capitalize">{{ course }}</IonText>
					<IonIcon :class="{'rotate-90': show[course]}" :icon="chevronForwardOutline" />
				</div>
				<template v-if="show[course]">
					<SchemesListCard v-for="scheme in values" :key="scheme.hash" :classInst="classInst"
						:scheme="scheme" />
				</template>
			</div>
		</div>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ClassEntity } from '@modules/classes'
import { openCreateSchemeModal, useSchemesList } from '@app/composable/classes/schemes'
import { arrowForwardOutline, chevronForwardOutline } from 'ionicons/icons'
import SchemesListCard from '@app/components/classes/schemes/SchemesListCard.vue'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const show = reactive({} as Record<string, boolean>)
const { loading, error, schemes } = useSchemesList(props.classInst.id)
</script>
