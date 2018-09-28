import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
const APIURL = 'localhost:8080';
declare let toastr;
//const APIURL = '192.241.151.249:8080';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ApiService {
    constructor(private http: Http) { }
    public initUrl(url) {
        return 'http://' + APIURL + url;
    }
    public initWebSocket(url) {
        return 'ws://' + APIURL + url;
    }
    get(url) {
        return new Promise((resolve, reject) => {
            this.http
                .get(this.initUrl(url))
                .toPromise()
                .then(response => {
                    resolve(response.json())
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    post(url, data) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http
                .post(this.initUrl(url), data, { headers })
                .toPromise()
                .then(response => {
                    resolve(response.json())
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    patch(url, data) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http
                .patch(this.initUrl(url), data, { headers })
                .toPromise()
                .then(response => {
                    resolve(response.json())
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    delete(url) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http
                .delete(this.initUrl(url), { headers })
                .toPromise()
                .then(response => {
                    resolve(response.json())
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    postToDownload(url, data) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http
                .post(this.initUrl(url), data, { responseType: ResponseContentType.Blob, headers })
                .subscribe(data => {
                    resolve(data)
                })
        })
    }
    handleError(err) {
        toastr['error']('request failed', err._body, {
            "positionClass": "toast-bottom-right",
            "closeButton": true,
            "newestOnTop": true
        }).css('width', '100%')
    }
}
