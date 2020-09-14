import axios from "axios"

const CryptoJS = require("crypto-js")
/**
 *  Delete Image from cloudinary storage.
 *
 * @param image url to upload.
 */

/** TODO move the key to env variables  **/
const api_key = "415963894794147" //production
const api_secret = "MyXUX76jBaup6YQyNwuIoR0ICik" //production
const cloud = "hak92fxux" //production
const upload_url = "https://api.cloudinary.com/v1_1/" + cloud + "/image/upload"
const destroy_url = "https://api.cloudinary.com/v1_1/" + cloud + "/image/destroy"

export async function uploadImage(image: string): Promise<string | null> {
  const formData = new FormData()

  formData.append("file", {
    uri: image,
    type: "image/png",
    format: "jpg",
    name: "upload.png",
  })

  const timestamp = ((Date.now() / 1000) | 0).toString()
  //formData.append("eager", "c_800,w_1600,")
  formData.append("eager", "c_fit,w_800")
  formData.append("timestamp", timestamp)
  //const hash_string = `eager=h_800,w_1600,&timestamp=${timestamp}${api_secret}`
  const hash_string = `eager=c_fit,w_800&timestamp=${timestamp}${api_secret}`
  const signature = CryptoJS.SHA1(hash_string).toString()
  formData.append("api_key", api_key)
  formData.append("signature", signature)
  try {
    const result = await axios.post(upload_url, formData)
    return result.data.eager[0].secure_url
  } catch (error) {
    console.log("we ahve an error uploading", error)
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Delete Image from cloudinary storage.
 *
 *
 * @param public image id from the cloud.
 */
export async function deleteImage(image: string): Promise<boolean> {
  const formData = new FormData()
  const timestamp = ((Date.now() / 1000) | 0).toString()
  const picParams = image.match(/.*\/(.*)\/(.*)$/)
  //console.log('picParams', picParams);
  const pic_pub_id = picParams[2].split(".").shift()
  //console.log('pic_pub_id', pic_pub_id);

  formData.append("public_id", pic_pub_id)
  formData.append("timestamp", timestamp)
  const hash_string = `public_id=${pic_pub_id}&timestamp=${timestamp}${api_secret}`
  const signature = CryptoJS.SHA1(hash_string).toString()
  formData.append("api_key", api_key)
  formData.append("signature", signature)
  //console.log('formatdagta', formData);
  try {
    const res = await axios.post(destroy_url, formData)
    //console.log('res', res);
    return true
  } catch {
    return false
  }
}
