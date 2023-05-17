import { UserInterface } from "../../../src/domain/entities/user"

export const  UserValid =  {
    email:"teste@gmail.com",
    name:"Felipe Ramos",
} as UserInterface


export const  UserWithConfirmationFalse=  {
    email:"teste@gmail.com",
    name:"Felipe Ramos",
} as UserInterface

export const  UserWithoutConfirmation=  {
    email:"teste@gmail.com",
    name:"Felipe Ramos",
} as UserInterface

export const  UserWithInvalidEmail =  {
    email:"testegmail.com",
    name:"Felipe Ramos",
} as UserInterface



export const  UserWithInvalidName =  {
    email:"teste@gmail.com",
    name:"Fel",
} as UserInterface

export const  UserWithWithoutName =  {
    email:"teste@gmail.com",
} as UserInterface

export const  UserWithWithoutEmail =  {
    name:"Luiz Fellipe",
} as UserInterface



