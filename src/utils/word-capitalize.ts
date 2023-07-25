export const capitalize = (word: string): string => {
	const firstWord = word.split(' ')[0].toLowerCase()
	return firstWord.charAt(0).toUpperCase() + word.slice(1)
}
