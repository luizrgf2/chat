import { SERVER_PORT } from '../config'
import {App} from './http/express'


if(!SERVER_PORT) throw new Error("HTTP port is not empty!")

const port = +SERVER_PORT


const express = App
express.start(port)