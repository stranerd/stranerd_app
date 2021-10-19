export interface FormBaseDataSource<To> {
	create: (data: To) => Promise<void>
}
