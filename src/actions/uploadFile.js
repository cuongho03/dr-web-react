
import { Firebase, FirebaseRef } from '../lib/firebase'

export async function uploadMutipleFile(ImageFile, path = 'banner-img/') {
  const storage = Firebase.storage()
  const storageRef = storage.ref()

  const metadata = {
    contentType: ImageFile.type ? ImageFile.type : 'image/jpeg'
  }
  let result = {}
  let uid = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null

  await storageRef
    .child(uid + '/' + path + ImageFile.name)
    .put(ImageFile, metadata)
    .then(uploadTask => {
      return uploadTask.ref.getDownloadURL().then(url => {
        console.log(url)
        result = {}
        result['isSuccess'] = true
        result['url'] = url
        return result
      })
    })

  return result
}

