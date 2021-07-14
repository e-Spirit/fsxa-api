import Faker from 'faker'
import { FSXAApiErrors } from '../enums'
import FSXARemoteApi from './FSXARemoteApi'

describe('FSXARemoteAPI', () => {
  describe('The initialization', () => {
    let API_KEY: string
    let CAAS_URL: string
    let NAVIGATION_SERVICE_URL: string
    let TENANT_ID: string
    let PROJECT_ID: string
    let remoteAPI: FSXARemoteApi
    let config: any
    beforeEach(() => {
      API_KEY = Faker.datatype.uuid()
      CAAS_URL = Faker.internet.url()
      NAVIGATION_SERVICE_URL = Faker.internet.url()
      TENANT_ID = Faker.company.companyName()
      PROJECT_ID = Faker.datatype.uuid()
      config = {
        apikey: API_KEY,
        caasURL: CAAS_URL,
        navigationServiceURL: NAVIGATION_SERVICE_URL,
        tenantID: TENANT_ID,
        projectID: PROJECT_ID
      }
    })
    it('should get initialized', () => {
      remoteAPI = new FSXARemoteApi(config)
      expect(remoteAPI).not.toBeNull()
    })
    it('should throw an error if the API_KEY is not set', () => {
      delete config.apikey
      expect(() => {
        new FSXARemoteApi(config)
      }).toThrow(FSXAApiErrors.MISSING_API_KEY)
    })
    it('should throw an error if the CAAS_URL is not set', () => {
      delete config.caasURL
      expect(() => {
        new FSXARemoteApi(config)
      }).toThrow(FSXAApiErrors.MISSING_CAAS_URL)
    })
    it('should throw an error if the NAVIGATION_SERVICE_URL is not set', () => {
      delete config.navigationServiceURL
      expect(() => {
        new FSXARemoteApi(config)
      }).toThrow(FSXAApiErrors.MISSING_NAVIGATION_SERVICE_URL)
    })
    it('should throw an error if the PROJECT_ID is not set', () => {
      delete config.projectID
      expect(() => {
        new FSXARemoteApi(config)
      }).toThrow(FSXAApiErrors.MISSING_PROJECT_ID)
    })
    it('should throw an error if the TENANT_ID is not set', () => {
      delete config.tenantID
      expect(() => {
        new FSXARemoteApi(config)
      }).toThrow(FSXAApiErrors.MISSING_TENANT_ID)
    })
  })
  describe('buildAuthorizationHeaders', () => {
    it.todo('should return the correct authorization object')
  })
  describe('buildCaaSUrl', () => {
    it.todo('should return the correct caas url')
  })
  describe('buildNavigationServiceUrl', () => {
    it.todo('should return the correct navigation service url')
  })
  describe('fetchElement', () => {
    it.todo('should trigger the fetch method with the correct params')
    it.todo('should throw an not found error when the response is 404')
    it.todo('should throw an unauthorized error when the response is 401')
    it.todo('should throw an unknown error when the response is not ok')
    it.todo('should return the response')
    it.todo('should return a mapped response when additionalParams are set')
  })
  describe('fetchByFilter', () => {
    it.todo('should trigger the fetch method with the correct params')
    it.todo('should throw an unauthorized error when the response is 401')
    it.todo('should throw an unknown error when the response is not ok')
    it.todo('should return the response')
  })
  describe('fetchNavigation', () => {
    it.todo('should trigger the fetch method with the correct params')
    it.todo('should throw an not found error when the response is 404')
    it.todo('should throw an unknown error when the response is not ok')
    it.todo('should return the response')
  })
  describe('fetchProjectProperties', () => {
    it.todo('should trigger fetchByFilter with correct params')
    it.todo('should trigger fetchByFilter if first response contains an GCAPage')
    it.todo('should return undefined when there are no project properties')
    it.todo('should return the response')
  })
})
