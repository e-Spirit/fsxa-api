describe('FSXAProxyAPI', () => {
  describe('The initialization', () => {
    it.todo('should throw an error if the API_KEY is not set')
    it.todo('should throw an error if the CAAS_URL is not set')
    it.todo('should throw an error if the NAVIGATION_SERVICE_URL is not set')
    it.todo('should throw an error if the PROJECT_ID is not set')
    it.todo('should throw an error if the TENANT_ID is not set')
    it.todo('should get initialized correctly')
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
