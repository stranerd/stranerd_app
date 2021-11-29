import {reactive} from 'vue'

const editState: Record<string, boolean> = reactive({
	'flashcard': false,
	'video': false,
	'set': false,
	'note': false,
	'testprep': false,
})

export const useEditState = ()=>{
	const toggle= (type: string)=>{
		editState[type] = !editState[type]

	}

	return {
		toggle, editState
	}
}