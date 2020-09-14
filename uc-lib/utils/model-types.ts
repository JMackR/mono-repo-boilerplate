import {
  getEnv,
  getRoot,
  IAnyModelType,
  IAnyStateTreeNode,
  ReferenceIdentifier,
  ReferenceOptions,
  resolveIdentifier,
  types,
} from "mobx-state-tree"
import { Environment } from "../models/environment"
import { ReferenceT } from "mobx-state-tree/dist/type-defs/utility-type-defs/reference"

/**
 * Creates an MST reference where the reference is found through a callback
 * @param referenceType the referenced type
 * @param lookup a function that looks up the reference, must be defined
 */
export function lookupReference<ReferencedType extends IAnyModelType, LookupReturnType extends ReferenceT<ReferencedType>>(
  referenceType: ReferencedType,
  lookup: (id: ReferenceIdentifier, env: Environment) => LookupReturnType,
) {
  return types.reference(referenceType, {
    get(id: ReferenceIdentifier, parent: IAnyStateTreeNode): LookupReturnType {
      const reference = lookup(id, getEnv<Environment>(parent!))
      if (!reference) throw new Error(`lookupReference must find a definite value for ${id}`)
      return reference
    },
    set(reference: ReferencedType & { id: string }): ReferenceIdentifier {
      return reference.id
    },
  } as ReferenceOptions<ReferencedType>)
}

/**
 * Creates an MST reference where the resolved value may be undefined
 * @param referenceType the referenced type
 */
export function maybeReference<ReferencedType extends IAnyModelType, ResolvedType extends ReferencedType | undefined>(
  referenceType: ReferencedType,
) {
  return types.reference(referenceType, {
    get(id: ReferenceIdentifier, parent: IAnyStateTreeNode): ResolvedType {
      const tree = getEnv<Environment>(parent)?.rootStore || getRoot(parent)
      if (!tree) return undefined as ResolvedType
      return resolveIdentifier(referenceType, tree, id) as ResolvedType
    },
    set(reference: ReferencedType & { id: string }): ReferenceIdentifier {
      return reference.id
    },
  } as ReferenceOptions<ReferencedType>)
}
