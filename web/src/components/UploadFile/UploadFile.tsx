import React from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { customValidation, CustomValidationOptionsType } from './customValidation'
import CSS from 'csstype'
import { UploadZoneContainer, UploadLink, UploadZoneText, UploadZoneTitle } from './style'

export enum UploadTypeEnum {
  ZONE = 'zone',
  LINK = 'link'
}

type PropsType = {
  onUpload: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  accept?: string | string[];
  multiple?: boolean;
  type?: UploadTypeEnum;
  linkText?: string;
  customValidationOptions?: CustomValidationOptionsType;
  style?: CSS.Properties;
};

export const UploadFile: React.FC<PropsType> = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: props.accept,
    multiple: props.multiple,
    onDrop: async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const [customAcceptedFiles, customFileRejections] = await customValidation(acceptedFiles, props.customValidationOptions as CustomValidationOptionsType)
      props.onUpload(customAcceptedFiles, [...fileRejections, ...customFileRejections])
    },
    onDragEnter: () => null,
    onDragOver: () => null,
    onDragLeave: () => null,
  })

  return <>
    <input type="file" {...getInputProps()} />
    {props.type === UploadTypeEnum.ZONE ? (
      <UploadZoneContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        style={props.style}
      >
        <UploadZoneTitle>Click to upload</UploadZoneTitle> {/* TODO: Add icon */}
        <UploadZoneText>Or, drag and drop a file here</UploadZoneText>
      </UploadZoneContainer>
    ) : (<>
      <UploadLink
        {...getRootProps()}
        style={props.style}
      >
        {props.linkText}
      </UploadLink>
    </>)}
  </>
}

UploadFile.defaultProps = {
  onUpload: () => { },
  accept: 'image/*',
  multiple: false,
  type: UploadTypeEnum.ZONE,
  linkText: 'Upload file',
  customValidationOptions: {
    image: {
      minWidth: 300,
      minHeight: 300,
      square: true
    }
  }
}
