import { NextResponse } from 'next/server'
import { handleEncryptProductiveAuth } from '@/lib/Productive'

export async function POST(req: Request) {
  const { auth_token, organization_id } = await req.json()
  const productiveAuth = `${auth_token}:${organization_id}`
  const productiveToken = handleEncryptProductiveAuth(productiveAuth)
  return NextResponse.json({ productiveToken })
}
