import http from "@/http-common";

/* eslint-disable */
class PhotoService {
  get(id: any): Promise<any> {
    return http.get(`albums/${id}/photos`);
  }
}
/*singleton*/
export default new PhotoService();
