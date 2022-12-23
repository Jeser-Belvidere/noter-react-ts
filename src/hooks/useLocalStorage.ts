import { useEffect, useState } from 'react'

export function useLocalStorage<Type>(key: string, initialValue: Type | (() => Type)) {
	const [value, setValue] = useState<Type>(() => {
		const jsonValue = localStorage.getItem(key)
		if (jsonValue == null) {
			if (typeof initialValue === 'function') {
				return (initialValue as () => Type)()
			} else {
				return initialValue
			}
		} else {
			return JSON.parse(jsonValue)
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [value, key])

	return [value, setValue] as [Type, typeof setValue]
}
