import jwt from 'jsonwebtoken'
import { secretKey } from './constants'

const handleEncryptProductiveAuth = (input: string) =>
  jwt.sign({ data: input }, secretKey)

export default handleEncryptProductiveAuth
