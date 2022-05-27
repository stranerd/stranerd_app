<template>
	<Justified>
		<div>
			<BlockLoading v-if="loading" />
			<slot v-if="classInst && classInst.members.includes(id)" :classInst="classInst" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useRoute } from 'vue-router'
import { useClass } from '@app/composable/classes/classes'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ClassWrapper',
	components: { Justified },
	setup () {
		const { id } = useAuth()
		const route = useRoute()
		const { classId } = route.params
		const { loading, error, classInst } = useClass(classId as string)
		return { loading, error, classInst, id }
	}
})
</script>
