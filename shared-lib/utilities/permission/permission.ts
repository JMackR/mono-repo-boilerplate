/**
 * Multiple entires for one permission type, such as with Location, are to show prompts with
 * different contextual strings
 */
export enum Permission {
  Camera = "CAMERA_PERMISSON",
  PhotoGallery = "PHOTO_GALLERY",
  LocationPost = "LOCATION_POST",
  LocationMeetup = "LOCATION_MEETUP",
  LocationUser = "LOCATION_USER",
  LocationSearch = "LOCATION_SEARCH",
  Notification = "NOTIFICATION_PERMISSION",
  Storage = "STORAGE",
}
