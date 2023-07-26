import { IUser } from "../interfaces/user.interface";

export const sortByNames = (user1: IUser, user2: IUser, sort: 'asc' | 'desc') => {
    if (sort === 'asc') {
        return user1.name.first.localeCompare(user2.name.first)
    } else {
        return user2.name.first.localeCompare(user1.name.first)
    }
}
export const sortByDateOfBirth = (user1: IUser, user2: IUser, sort: 'asc' | 'desc') => {
    if (sort === 'asc') {
        return user1.dob.age - user2.dob.age
    } else {
        return user2.dob.age - user1.dob.age
    }   
}
export const sortByCity = (user1: IUser, user2: IUser, sort: 'asc' | 'desc') => {
    if (sort === 'asc') {
        return user1.location.city.localeCompare(user2.location.city)
    } else {
        return user2.location.city.localeCompare(user1.location.city)
    }
}