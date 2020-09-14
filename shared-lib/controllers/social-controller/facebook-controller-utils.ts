export const getUngrantedRequiredScope = ({
  scope,
  requiredScope,
  grantedScope,
}: {
  scope: string[]
  requiredScope: string[]
  grantedScope: string[]
}) => {
  const ungrantedScope = scope.filter((p: string) => !grantedScope.includes(p))
  const ungrantedRequiredScope = requiredScope.filter((p: string) => ungrantedScope.includes(p))
  return ungrantedRequiredScope
}
