'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  PRODUCTIVE_TOKEN_SEARCH_PARAM_KEY,
  PRODUCTIVE_AUTH_LOCAL_STORAGE_KEY,
} from './constants'

export interface ProductiveAuthProps {}

const ProductiveAuth: React.FC<ProductiveAuthProps> = () => {
  // ==============================
  // Router
  // ==============================
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // ==============================
  // Constants
  // ==============================
  const hasProductiveToken = Boolean(
    searchParams.get(PRODUCTIVE_TOKEN_SEARCH_PARAM_KEY),
  )

  // ==============================
  // Methods
  // ==============================
  const setProductiveToken = async (productiveAuth: {
    auth_token: string
    organization_id: string
  }) => {
    try {
      const {
        data: { productiveToken },
      } = await axios.post('/api/productive/token', {
        ...productiveAuth,
      })
      // Set route
      const params = new URLSearchParams(window.location.search)
      params.set(PRODUCTIVE_TOKEN_SEARCH_PARAM_KEY, productiveToken)
      router.replace(`${pathname}?${params.toString()}`)
    } catch (err) {
      console.error('Error caught:', err)
    }
  }

  // ==============================
  // Effects
  // ==============================
  // Step 1. Get productiveAuth from localStorage
  const [productiveAuth, setProductiveAuth] = useState()
  useEffect(() => {
    const productiveAuthLocalStorageString = localStorage.getItem(
      PRODUCTIVE_AUTH_LOCAL_STORAGE_KEY,
    )
    const productiveAuth =
      productiveAuthLocalStorageString &&
      JSON.parse(productiveAuthLocalStorageString)
    setProductiveAuth(productiveAuth)
  }, [])

  // Step 2. Set productiveToken (param) from productiveAuth (localStorage)
  useEffect(() => {
    if (productiveAuth && !hasProductiveToken)
      setProductiveToken(productiveAuth)
  }, [productiveAuth])

  return null
}

export default ProductiveAuth
