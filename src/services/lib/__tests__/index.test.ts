import API from '../index'
import httpClient from '../../api'

jest.mock("../../api")

describe("lib service", () => {
  it("Should success call request", () => {
    API.requestCarInformation();
    expect(httpClient.get).toBeCalledWith("api/lib/car-info")
  })
})