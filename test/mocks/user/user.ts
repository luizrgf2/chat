import { UserInterface } from "../../../src/domain/entities/user"

export const  UserValid =  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    email:"teste@gmail.com",
    name:"Felipe Ramos",
    pictureUrl:"https://example.image.com.br"
} as UserInterface


export const  UserWithConfirmationFalse=  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    email:"teste@gmail.com",
    name:"Felipe Ramos",
} as UserInterface

export const  UserWithoutConfirmation=  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    email:"teste@gmail.com",
    name:"Felipe Ramos",
} as UserInterface

export const  UserWithInvalidEmail =  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    email:"testegmail.com",
    name:"Felipe Ramos",
} as UserInterface



export const  UserWithInvalidName =  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    email:"teste@gmail.com",
    name:"Fel",
} as UserInterface

export const  UserWithWithoutName =  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    email:"teste@gmail.com",
} as UserInterface

export const  UserWithWithoutEmail =  {
    id:"c804305a-f6ae-11ed-b67e-0242ac120002",
    name:"Luiz Fellipe",
} as UserInterface



