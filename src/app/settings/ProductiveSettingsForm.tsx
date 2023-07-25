'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  TextInput,
  Card,
  Title,
  Text,
  Flex,
  Divider,
} from '@tremor/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { PRODUCTIVE_AUTH_LOCAL_STORAGE_KEY } from '@/lib/Productive'

export type SearchFormInputs = {
  auth_token: string
  organization_id: string
}

export interface ProductiveSettingsFormProps {}

const ProductiveSettingsForm: React.FC<ProductiveSettingsFormProps> = () => {
  // Router
  const router = useRouter()
  const pathname = usePathname()

  // Access localStorage in client only to pass build
  const [localStorageProductiveAuth, setLocalStorageProductiveAuth] = useState<{
    auth_token?: string
    organization_id?: string
  }>({})
  useEffect(() => {
    setLocalStorageProductiveAuth(
      JSON.parse(localStorage.getItem(PRODUCTIVE_AUTH_LOCAL_STORAGE_KEY) || ''),
    )
  }, [])

  // Form
  const defaultValues = {
    auth_token: localStorageProductiveAuth.auth_token || '',
    organization_id: localStorageProductiveAuth.organization_id || '',
  }
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>({
    defaultValues,
  })

  // Set defaultValues if localStorage exists but form values are empty
  useEffect(() => {
    const hasFormValues = Object.values(getValues()).filter(Boolean).length
    if (defaultValues && !hasFormValues) reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<SearchFormInputs> = async (values) => {
    // Store the values in local storage
    localStorage.setItem(
      PRODUCTIVE_AUTH_LOCAL_STORAGE_KEY,
      JSON.stringify(values),
    )
    // Trigger router push for use effect to take place
    router.push(pathname)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div>
          <Title>Productive API</Title>
          <Text>
            Get your Productive API Keys{' '}
            <a
              href="https://help.productive.io/en/articles/5440689-api-access"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </Text>
        </div>

        <Divider className="my-4" />

        <div>
          <TextInput
            placeholder="Productive Auth Token"
            {...register('auth_token')}
          />
          {errors.auth_token && <span>This field is required</span>}
          <TextInput
            placeholder="Productive Organization Id"
            className="mt-4"
            {...register('organization_id', { required: true })}
          />
          {errors.organization_id && <span>This field is required</span>}
        </div>

        <Flex justifyContent="end" className="mt-4">
          <Button type="submit">Submit</Button>
        </Flex>
      </Card>
    </form>
  )
}

export default ProductiveSettingsForm
