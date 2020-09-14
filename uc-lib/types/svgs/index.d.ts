declare module "*.svg" {
  import { SVGColors } from "uc-lib"
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement> & SVGColors>
  export default content
}
