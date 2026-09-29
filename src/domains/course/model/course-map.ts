export interface CourseMapCenter {
  lat: number;
  lng: number;
}

export interface CourseMapCameraState {
  center: CourseMapCenter;
  zoom: number;
}
