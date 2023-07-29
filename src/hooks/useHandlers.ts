import { Dispatch, SetStateAction } from 'react'
import { IUser } from '../interfaces/user.interface'
import { useActions } from './useActions'

export const dragStartHandler = (
	e: React.DragEvent<HTMLDivElement>,
	dragUser: IUser,
	setDraggedUser?: Dispatch<SetStateAction<IUser>>
) => {
	setDraggedUser && setDraggedUser(dragUser)
}

export const useDropHandler = (draggedUser?: IUser) => {
	const { customSortUsers } = useActions()
	const dropHandler = (e: React.DragEvent<HTMLDivElement>, dropUser: IUser) => {
		e.preventDefault()
		if (!draggedUser) return
		customSortUsers({
			firstUser: draggedUser,
			secondUser: dropUser
		})
	}
	return dropHandler
}
