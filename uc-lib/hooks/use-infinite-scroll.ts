import { useEffect } from "react"
import { ReplaySubject } from "rxjs"
import { scan, filter, debounceTime } from "rxjs/operators"

const DEBNCE_THRESHOLD_TIME = 100

export interface InfiniteScrollProps<TData> {
  data: TData[]
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null
  onEndReachedThreshold?: number | null
}

export interface InfiniteScrollCallback {
  handleItemVisibilityChange: (visible: boolean, index: number) => void
}

/*
 * Hook to support inifite scroll on web
 * Triggers infinite scroll base on threadhold in units similar to VirtualizeList in react-native
 * To use, item unit need to wrap with <VisibilityCheck> control
 * Check usage in <Grid> and <List> controls
 * e.g.
 *  <VisibilityCheck key={index} index={index} onVisibilityChange={handleItemVisibilityChange}>
 *    {renderItem(item, index)}
 *  </VisibilityCheck>
 */
export function useInfiniteScroll<TData>(props: InfiniteScrollProps<TData>): InfiniteScrollCallback {
  const { data, onEndReached, onEndReachedThreshold } = props
  const endReachedThreshold = onEndReachedThreshold ?? 0

  const visibilityItemSubject$ = new ReplaySubject()
  const handleItemVisibilityChange = (visible: boolean, index: number) => {
    if (visible) {
      visibilityItemSubject$.next(index)
    }
  }

  const hasReachedItemThreshold = (maxVisibileIndex: number): boolean => {
    return endReachedThreshold + maxVisibileIndex > data.length - 1
  }
  useEffect(() => {
    visibilityItemSubject$
      .pipe(
        scan((acc, curr) => Math.max(acc, curr as number), 0),
        filter(hasReachedItemThreshold),
        debounceTime(DEBNCE_THRESHOLD_TIME),
      )
      .subscribe({
        next: maxVisibileIndex => {
          onEndReached && onEndReached({ distanceFromEnd: maxVisibileIndex })
          visibilityItemSubject$.complete()
        },
      })
  }, [data])

  return {
    handleItemVisibilityChange,
  }
}
