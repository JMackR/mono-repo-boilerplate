import CookieManager from "@react-native-community/cookies"

import React from "react"
import { Linking } from "react-native"
import { WebView } from "react-native-webview"
import { render } from "react-native-testing-library"
import { shallow } from "enzyme"
import * as WebViewContext from "../webview-api.native"
import { WebViewAPI, WebContextProps } from "../webview-api.native"
import { WebView, WebViewProps } from "../index.native"

describe("WebView Internal Functionality Test ", () => {
  const props: WebViewProps = {
    source: { uri: "https://redibs.com" },
    baseUrl: "https://redibs.com",
  }

  const mockOpenUrlMock = jest.fn()

  const testWebContextProps: WebContextProps = {
    webview: React.createRef<WebView>(),
    setWebview: () => {},
    goBack: () => jest.fn(),
    canGoBack: () => true,
    setInternalRequest: jest.fn(),
    title: undefined,
    setTitle: jest.fn(),
    currentUri: "",
    setUri: jest.fn(),
  }
  beforeEach(() => {
    jest.clearAllMocks()

    // setup custom context
    jest.spyOn(WebViewContext, "useWebViewContext").mockImplementation(() => testWebContextProps)

    // Intercept some Linking.openURL calls
    jest.mock("Linking")
    Linking.openURL = mockOpenUrlMock

    CookieManager.setFromResponse = jest.fn()
  })

  test("test handleOnShouldStartLoadWithRequest no main url", () => {
    const wrapper = shallow(<WebView {...props} />)
    const shouldStartRequestResponse = wrapper.props().onShouldStartLoadWithRequest({})
    expect(shouldStartRequestResponse).toBeFalsy()
  })

  test("test handleOnShouldStartLoadWithRequest with whitelisted url", () => {
    const wrapper = shallow(<WebView {...props} />)
    const shouldStartRequestResponse = wrapper
      .props()
      .onShouldStartLoadWithRequest({ mainDocumentURL: "https://redibs.com" })
    expect(shouldStartRequestResponse).toBeTruthy()
  })

  test("test handleOnShouldStartLoadWithRequest with whitelisted url user click", () => {
    testWebContextProps.currentUri = "https://redibs.com"

    const wrapper = shallow(<WebView {...props} />)

    const shouldStartRequestResponse = wrapper.props().onShouldStartLoadWithRequest({
      mainDocumentURL: "https://redibs.com",
      url: "https://redibs.com",
      navigationType: "click",
    })
    expect(shouldStartRequestResponse).toBeTruthy()
  })

  test("test handleOnShouldStartLoadWithRequest with blacklisted url and opens externally", () => {
    const wrapper = shallow(<WebView {...props} />, {
      context: { ...testWebContextProps },
    })
    const shouldStartRequestResponse = wrapper.props().onShouldStartLoadWithRequest({
      mainDocumentURL: "https://redibs1.com",
    })
    expect(shouldStartRequestResponse).toBeFalsy()

    expect(mockOpenUrlMock).toBeCalledTimes(1)
  })
  test("test handleOnShouldStartLoadWithRequest with okay subdomain", () => {
    const wrapper = shallow(<WebView {...props} />, {
      context: { ...testWebContextProps },
    })
    const shouldStartRequestResponse = wrapper.props().onShouldStartLoadWithRequest({
      mainDocumentURL: "https://help.redibs.com",
    })
    expect(shouldStartRequestResponse).toBeTruthy()
  })

  test("test onNavigationStateChange with blacklisted url does not update internal state", () => {
    const wrapper = shallow(<WebView {...props} />, {
      context: { ...testWebContextProps },
    })
    const shouldStartRequestResponse = wrapper.props().onNavigationStateChange({ mainDocumentURL: "https://redibs1.com" })
    expect(shouldStartRequestResponse).toBeFalsy()
    expect(testWebContextProps.setInternalRequest).toHaveBeenCalledTimes(0)
  })

  test("test onNavigationStateChange updates internal state with web page title", () => {
    const wrapper = shallow(<WebView {...props} />)
    wrapper.props().onNavigationStateChange({
      url: "https://redibs.com",
      title: "custom webpage title",
    })

    expect(testWebContextProps.setInternalRequest).toHaveBeenCalledTimes(1)
    expect(testWebContextProps.setTitle).toHaveBeenCalledTimes(1)
    expect(testWebContextProps.setTitle).toHaveBeenCalledWith("custom webpage title")
  })

  test("test onNavigationStateChange updates internal state with custom title", () => {
    // set title
    const updatedProps: WebViewProps = {
      ...props,
      title: "custom title",
    }
    testWebContextProps.title = updatedProps.title
    // expect(testContextProps.title).toBeDefined()

    // render
    const wrapper = shallow(<WebView {...updatedProps} />)

    // call state change
    wrapper.props().onNavigationStateChange({ url: "https://redibs.com" })

    expect(testWebContextProps.setInternalRequest).toHaveBeenCalledTimes(1)

    expect(testWebContextProps.setTitle).toHaveBeenCalledTimes(0)
    expect(testWebContextProps.title).toBe("custom title")
  })
})

describe("WebView Snapshot Tests", () => {
  const props: WebViewProps = {
    source: { uri: "https://redibs.com" },
    baseUrl: "https://redibs.com",
  }

  function renderWebViewWithApi(props: WebViewProps) {
    return render(
      <WebViewAPI webViewProps={props}>
        <WebView {...props} />
      </WebViewAPI>,
    )
  }

  test("Render with uri", () => {
    const tree = renderWebViewWithApi(props)
    expect(tree).toMatchSnapshot(tree)
  })
  test("Render with headers", () => {
    const updatedProps: WebViewProps = {
      ...props,
      source: {
        uri: "https://redibs.com",
        headers: {
          "my-custom-header-key": "my-custom-header-value",
        },
      },
    }
    const tree = renderWebViewWithApi(updatedProps)
    expect(tree).toMatchSnapshot(tree)
  })
  test("Render with custom colors", () => {
    const updatedProps: WebViewProps = {
      ...props,
      headerBackgroundColor: "glacialBlue",
      textAndIconTint: "brand",
    }
    const tree = renderWebViewWithApi(updatedProps)
    expect(tree).toMatchSnapshot(tree)
  })
})
