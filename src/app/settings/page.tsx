import { Text, Title } from '@tremor/react'
import { Metadata } from 'next'
import ProductiveSettingsForm from './ProductiveSettingsForm'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'An overview of your settings.',
}

export default function SettingsPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mb-4">
        <Title>Settings</Title>
        <Text>An overview of your settings.</Text>
      </div>

      <ProductiveSettingsForm />
    </main>
  )
}
