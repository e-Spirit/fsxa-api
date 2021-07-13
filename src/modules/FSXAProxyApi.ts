import { Page, GCAPage, Dataset, Image, QueryBuilderQuery, NavigationData } from '../types'
import { FSXAApiErrors, FSXAProxyRoutes } from '../enums'

type FetchElementParams = {
  id: string
  locale: string
  additionalParams?: Record<'keys' | string, any>
  remoteProjectId?: string
  fetchOptions?: RequestInit
}

type FetchByFilterParams = {
  filters: QueryBuilderQuery[]
  locale: string
  page?: number
  pagesize?: number
  additionalParams?: Record<'keys' | string, any>
  remoteProject?: string
  fetchOptions?: RequestInit
}

type FetchNavigationParams = {
  initialPath: string
  locale: string
  fetchOptions?: RequestInit
}

type FetchProjectPropertiesParams = {
  locale: string
  resolver?: string[]
  fetchOptions?: RequestInit
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | null | object
}

/**
 * This class represents the functionality of the FSXA-API as a proxy.
 * To use this class, there must be an instance of FSXARemoteApi that is accessed here.
 * By using this class, no secrets are provided to the client.
 * @see FSXARemoteApi
 */
export class FSXAProxyApi {
  private _baseUrl: string = this.baseUrl
  private _method = 'POST'
  private _headers = {
    'Content-Type': 'application/json'
  }

  get baseUrl() {
    return this._baseUrl
  }

  set baseUrl(value: string) {
    value = value.trim()
    if (value === '') {
      throw new Error(FSXAApiErrors.MISSING_BASE_URL)
    }
    this._baseUrl = value
  }

  /**
   * Creates a new instance with the connection to the FSXARemoteAPI
   * @param baseURL specifies the URL to communicate with
   */
  constructor(baseURL: string) {
    this.baseUrl = baseURL
  }

  /**
   *
   * @param id
   * @param locale
   * @param additionalParams
   * @param remoteProjectId
   * @param fetchOptions
   * @returns
   */
  async fetchElement<T = Page | GCAPage | Dataset | Image | Record<string, any> | null>({
    id,
    locale,
    additionalParams = {},
    remoteProjectId,
    fetchOptions
  }: FetchElementParams): Promise<T> {
    const body = { id, locale, additionalParams, remote: remoteProjectId }

    const response = await this.fetch({
      url: FSXAProxyRoutes.FETCH_ELEMENT_ROUTE,
      options: {
        method: this._method,
        headers: this._headers,
        body,
        ...fetchOptions
      }
    })

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(FSXAApiErrors.NOT_FOUND)
        case 401:
          throw new Error(FSXAApiErrors.NOT_AUTHORIZED)
        default:
          throw new Error(FSXAApiErrors.UNKNOWN_ERROR)
      }
    }

    return response.json()
  }

  /**
   *
   * @param filters
   * @param locale
   * @param page
   * @param pagesize
   * @param additionalParams
   * @param remoteProject
   * @param fetchOptions
   * @returns
   */
  async fetchByFilter({
    filters,
    locale,
    page = 1,
    pagesize = 30,
    additionalParams = {},
    remoteProject,
    fetchOptions
  }: FetchByFilterParams) {
    if (pagesize < 1) {
      // TODO: LOGGER WARN
      pagesize = 1
    }

    if (page < 1) {
      // TODO: LOGGER WARN
      page = 1
    }

    if (page > 100) {
      // TODO: LOGGER WARN
      page = 100
    }

    const body = {
      filter: filters,
      locale,
      page,
      pagesize,
      additionalParams,
      remote: remoteProject
    }

    const response = await this.fetch({
      url: FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE,
      options: {
        method: this._method,
        headers: this._headers,
        body,
        ...fetchOptions
      }
    })

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(FSXAApiErrors.NOT_AUTHORIZED)
        default:
          throw new Error(FSXAApiErrors.UNKNOWN_ERROR)
      }
    }

    return response.json()
  }

  /**
   *
   * @param initialPath
   * @param locale
   * @param fetchOptions
   * @returns
   */
  async fetchNavigation({
    initialPath,
    locale,
    fetchOptions
  }: FetchNavigationParams): Promise<NavigationData | null> {
    const body = {
      initialPath,
      locale
    }

    const response = await this.fetch({
      url: FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE,
      options: {
        method: this._method,
        headers: this._headers,
        body,
        ...fetchOptions
      }
    })

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(FSXAApiErrors.NOT_FOUND)
        default:
          throw new Error(FSXAApiErrors.UNKNOWN_ERROR)
      }
    }
    return response.json()
  }

  /**
   *
   * @param locale
   * @param resolver
   * @param fetchOptions
   * @returns
   */
  async fetchProjectProperties({
    locale,
    resolver = ['GCAPage'],
    fetchOptions
  }: FetchProjectPropertiesParams): Promise<Record<string, any> | null> {
    const body = {
      locale,
      resolver
    }

    const response = await this.fetch({
      url: FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE,
      options: {
        method: this._method,
        headers: this._headers,
        body,
        ...fetchOptions
      }
    })

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(FSXAApiErrors.NOT_FOUND)
        default:
          throw new Error(FSXAApiErrors.UNKNOWN_ERROR)
      }
    }
    return response.json()
  }

  /**
   *
   * @param url
   * @param options
   * @returns
   */
  private fetch({ url, options }: { url: string; options: RequestOptions }) {
    if (options.body && typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }
    return fetch(this.baseUrl + url, options as RequestInit)
  }
}
