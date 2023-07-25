import jwt from 'jsonwebtoken'
import { secretKey } from './constants'

const handleDecryptProductiveAuth = (input: string) =>
  input ? (jwt.verify(input, secretKey) as { data?: string })?.data : ''

export default handleDecryptProductiveAuth
