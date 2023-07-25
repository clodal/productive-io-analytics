'use client'

import React from 'react'
import { Grid, Card, List, ListItem, Text, Title } from '@tremor/react'

const resourceCards = [
  {
    title: 'Business Resources',
    subtitle: 'A list of business resources used to build this page.',
    items: [
      {
        title: 'ClickUp: How to Create a Burndown Chart',
        href: 'https://clickup.com/blog/burndown-chart-excel',
      },
      {
        title: 'Burn Charts – Hours VS Story Points',
        href: 'https://scrumage.com/blog/2012/03/122/',
      },
      {
        title: 'Project Manager: What is a Burndown Chart?',
        href: 'https://www.projectmanager.com/blog/burndown-chart-what-is-it',
      },
    ],
  },
  {
    title: 'Technical Resources',
    subtitle: 'A list of technical resources used to build this page.',
    items: [
      {
        title: 'Tremor',
        href: 'https://www.tremor.so/',
      },
      {
        title: 'Tailwind UI',
        href: 'https://tailwindui.com/',
      },
      {
        title: 'Productive API Docs',
        href: 'https://developer.productive.io/index.html',
      },
      {
        title:
          'Github: Next.js + Planetscale + NextAuth + TailwindCSS Template',
        href: 'https://github.com/vercel/nextjs-planetscale-nextauth-tailwindcss-template',
      },
      {
        title: 'Demo: Next Admin Dash',
        href: 'https://next-admin-dash.vercel.app/',
      },
      {
        title: 'Demo: Tremor',
        href: 'https://demo.tremor.so/',
      },
    ],
  },
]

export interface BurndownResourcesListProps {}

const BurndownResourcesList: React.FC<BurndownResourcesListProps> = (props) => {
  return (
    <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
      {resourceCards.map((resourceCard) => {
        const { title, subtitle, items } = resourceCard
        return (
          <Card key={title}>
            <div className="mb-4">
              <Title>{title}</Title>
              <Text>{subtitle}</Text>
            </div>

            <List>
              {items.map((item) => {
                const { title, href } = item
                return (
                  <ListItem key={title}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-800 hover:underline"
                    >
                      • {title}
                    </a>
                  </ListItem>
                )
              })}
            </List>
          </Card>
        )
      })}
    </Grid>
  )
}

export default BurndownResourcesList
