import styled from "styled-components"

export const UploadLink = styled.span`
  color: inherit;
  outline: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const UploadZoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${(props: any) => {
    if (props.isDragAccept) {
      return "#00e676"
    }
    if (props.isDragReject) {
      return "#ff1744"
    }
    if (props.isDragActive) {
      return "#2196f3"
    }
    return "#9AABBB"
  }};
  border-style: dashed;
  background-color: #f8fbff;
  outline: none;
  transition: border 0.24s ease-in-out;
  color: #100d23;
  cursor: pointer;
  & > *:not-last-child {
    margin-bottom: 5px;
  }
  min-height: 96px;
`

export const UploadZoneTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
`

export const UploadZoneText = styled.div`
  font-size: 16px;
  line-height: 20px;
`
