import React, { useState, useContext } from "react"
import invariant from "invariant"

export interface SelectableContext {
  selected: string[]
  setSelected: (newSelected: string[]) => void
  select: (selectId: string) => void
  deselect: (selectId: string) => void
  isSelected: (selectId: string) => boolean
  multiSelect: boolean
}

const _SELECTABLE_CONTEXT_DEFAULT = {
  selected: [],
  setSelected: () => {
    invariant(false, "attempt to use setSelected on default context")
  },
  select: () => {
    invariant(false, "attempt to use select on default context")
  },
  deselect: () => {
    invariant(false, "attempt to use deselect on default context")
  },
  isSelected: () => {
    invariant(false, "attempt to use isSelected on default context")
    return false
  },
  multiSelect: false,
  enableSingleSelectDeselect: false,
}
export const SelectableContext = React.createContext<SelectableContext>(_SELECTABLE_CONTEXT_DEFAULT)

const useSelectableContext = (
  multiSelect: boolean,
  initialSelections?: string[],
  enableSingleSelectDeselect?: boolean,
): SelectableContext => {
  const [selectedState, setSelectedState] = useState<string[]>(initialSelections ?? [])
  const setSelected = (newSelected: string[]) => {
    let result = newSelected
    if (!multiSelect && result.length > 1) {
      result = newSelected.slice(0, 1)
    }
    setSelectedState(result)
  }

  const select = (selectId: string) => {
    if (multiSelect) {
      setSelected([...selectedState, selectId])
    } else {
      setSelected([selectId])
    }
  }

  const deselect = (selectId: string) => {
    if (multiSelect || enableSingleSelectDeselect) {
      setSelected(selectedState.filter(s => s !== selectId))
    }
  }

  const isSelected = (selectId: string) => {
    return selectedState.indexOf(selectId) >= 0
  }

  return {
    selected: selectedState,
    setSelected,
    select,
    deselect,
    isSelected,
    multiSelect,
  }
}

export interface SelectableProviderProps {
  multiSelect: boolean
  initialSelections?: string[]
  children?: React.ReactNode
  enableSingleSelectDeselect?: boolean
}

export const SelectableContextProvider = (props: SelectableProviderProps) => {
  const { multiSelect, initialSelections, children, enableSingleSelectDeselect } = props
  const context = useSelectableContext(multiSelect, initialSelections, enableSingleSelectDeselect)

  return <SelectableContext.Provider value={context}>{children}</SelectableContext.Provider>
}

export const useSelectable = () => {
  const { selected, setSelected, select, deselect, isSelected, multiSelect } = useContext(SelectableContext)

  return { selected, setSelected, select, deselect, isSelected, multiSelect }
}
