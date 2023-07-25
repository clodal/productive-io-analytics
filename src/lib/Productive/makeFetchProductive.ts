import axios, { AxiosRequestConfig } from 'axios'

const makeFetchProductive =
  ({
    authToken,
    organizationId,
  }: {
    authToken: string
    organizationId: string
  }) =>
  async (path: string, options: AxiosRequestConfig = {}) => {
    try {
      const { headers, ...rest } = options

      const res = await axios(`https://api.productive.io/api/v2${path}`, {
        method: 'get',
        headers: {
          'X-Auth-Token': authToken,
          'X-Organization-Id': organizationId,
          ...headers,
        },
        ...rest,
      })

      return res.data
    } catch (err) {
      console.error('Error caught:', err)
      return { data: [] }
    }
  }

export default makeFetchProductive
