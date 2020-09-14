export enum TabNavigatorEventType {
  BotttomNavigation = "bottom_navigation_ui_event",
}
// TODO: follow up if need to move enum NavigableRoute from app to here in shared
export enum NavigableRoute {
  DashboardStack = "hometabs/dashboard-stack",
  PortfolioStack = "hometabs/portfolio-stack",
  TodoStack = "hometabs/todo-stack",
  OnboardingStack = "onboarding-Stack",
  ResoucesStack = "hometabs/resource-stack",
  ProfileStack = "hometabs/profile-stack",
}
interface ScreenNameObject {
  [key: string]: string
}

export const ScreenName: ScreenNameObject = Object.freeze({
  [NavigableRoute.DashboardStack]: "DashboardStack",
  [NavigableRoute.PortfolioStack]: "PortfolioStack",
  [NavigableRoute.TodoStack]: "TodoStack",
  [NavigableRoute.OnboardingStack]: "OnboardingStack",
  [NavigableRoute.ResoucesStack]: "ResourcesStack",
  [NavigableRoute.ProfileStack]: "ProfileStack",
})

export enum TabNavigatorElementType {
  Dashboard = "ToDashboard",
  Portfolio = "ToPortfolio",
  Todos = "ToTodos",
  Resources = "ToResources",
  Profile = "ToProfilet",
}
interface TabNavigatorElementNameObject {
  [key: string]: TabNavigatorElementType
}

export const TabNavigatorElementName: TabNavigatorElementNameObject = Object.freeze({
  [NavigableRoute.DashboardStack]: TabNavigatorElementType.Dashboard,
  [NavigableRoute.PortfolioStack]: TabNavigatorElementType.Portfolio,
  [NavigableRoute.TodoStack]: TabNavigatorElementType.Todos,
  [NavigableRoute.ResoucesStack]: TabNavigatorElementType.Resources,
  [NavigableRoute.ProfileStack]: TabNavigatorElementType.Profile,
})
