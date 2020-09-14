import { useState, useEffect } from "react"
import { PhotoImageIdentifier, GetPhotosParams, getPhotos, getAlbums, AlbumIndentifier, PhotoPageInfo } from "../camera-roll"

const DEFAULT_NUMBER_OF_PHOTOS_TO_LOAD = 12

export const useImagePicker = (numberOfPhotosToLoad?: number) => {
  const [photosFromDevice, setPhotosFromDevice] = useState<PhotoImageIdentifier[]>([])
  const [loading, setLoading] = useState(false)
  const [albums, setAlbums] = useState<AlbumIndentifier[]>([])
  const [album, setAlbum] = useState<AlbumIndentifier | null>(null)
  const [pageInfo, setPageInfo] = useState<PhotoPageInfo | null>(null)
  const pageSize = numberOfPhotosToLoad || DEFAULT_NUMBER_OF_PHOTOS_TO_LOAD

  useEffect(() => {
    getAlbums()
      .then(albums => {
        const sortedAlbums = albums?.length ? [...albums] : []
        sortedAlbums.sort((a, b) => b.numberOfPhotos - a.numberOfPhotos)
        setAlbums(sortedAlbums)
      })
      .catch(console.log)
  }, [])

  const loadMore = async () => {
    if (pageInfo && pageInfo.has_next_page) {
      getPhotos({
        first: pageSize,
        after: pageInfo.end_cursor,
        ...(album && { albumId: album.id }),
      })
        .then(response => {
          setPageInfo(response.page_info)
          setPhotosFromDevice([...photosFromDevice, ...response.edges.map(e => e.node.image)])
        })
        .catch(error => {
          // tslint:disable-next-line: no-console
          console.log(error)
        })
    }
  }

  useEffect(() => {
    setLoading(true)
    const params: GetPhotosParams = {
      first: pageSize,
    }
    if (album && album.id) {
      params.albumId = album.id
    }
    getPhotos(params)
      .then(response => {
        const photoImages = response.edges.map(e => e.node.image)
        setPageInfo(response.page_info)
        const goToCameraTile = {} as PhotoImageIdentifier
        setPhotosFromDevice([goToCameraTile, ...photoImages])
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [album])

  return {
    photosFromDevice,
    loading,
    albums,
    setAlbum,
    album,
    loadMore,
  }
}
