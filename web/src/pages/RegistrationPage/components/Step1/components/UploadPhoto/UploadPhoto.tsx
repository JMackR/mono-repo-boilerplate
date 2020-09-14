import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar'
import { UploadFile, UploadTypeEnum } from '@web-components/UploadFile'
import { useSnackbar } from 'notistack'

import { AvatarRemoveLink } from './style'

type PropsType = {
  name: string;
  onUpload: (value: string) => void;
}

export const UploadPhoto: React.FC<PropsType> = props => {
  const [avatarUrl, setAvatarUrl] = useState("")
  const [avatarWasUploaded, setAvatarWasUploaded] = useState(false)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    props.onUpload(avatarUrl)
  }, [avatarUrl, props])

  const showError = (text: string) => {
    enqueueSnackbar(text, {
      variant: "error",
      autoHideDuration: 5000
    })
  }

  return (
    <div>
      <strong>Upload a photo</strong>
      <p>Studies show clients are much more likely to connect with an agent when they can see a real face.</p>
      <p>TIP: Use a square image, at least 300px high by 300px wide.</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
        {!avatarWasUploaded ? (
          <UploadFile
            onUpload={(acceptedFiles, fileRejections) => {
              if (acceptedFiles[0]) {
                setAvatarUrl(URL.createObjectURL(acceptedFiles[0]))
                setAvatarWasUploaded(true)
              } else {
                showError(fileRejections[0].errors[0].message)
              }
            }}
          />
        ) : (<>
          {avatarUrl.length > 0 ? (<>
            <Avatar
              round={true}
              src={avatarUrl}
            />
            <AvatarRemoveLink onClick={() => setAvatarUrl('')}>Remove</AvatarRemoveLink>
          </>) : (<>
            <Avatar
              name="Test Name" // TODO: Set name
              round={true}
            />
            <UploadFile
              onUpload={(acceptedFiles, fileRejections) => {
                if (acceptedFiles[0]) {
                  setAvatarUrl(URL.createObjectURL(acceptedFiles[0]))
                  props.onUpload('da')
                } else {
                  showError(fileRejections[0].errors[0].message)
                }

                console.log('acceptedFiles', acceptedFiles)
                console.log('fileRejections', fileRejections)
              }}
              type={UploadTypeEnum.LINK}
            />
          </>)
          }
        </>)
        }
      </div >
    </div >
  )
}
