import { Injectable } from "@angular/core";
import { HttpHeaders, HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { UsuarioCompetencia } from "./usuario-competencia";
import { service } from "gianpasqualini-platform-data";

@Injectable()
export class LocalizadorService {

    constructor(
        private http: HttpClient,
    ) {};

    private usuarioCompetenciaURL =  "https://hcm-beta-api.senior.com.br/hcm-api/search/person"
    //private usuarioCompetenciaURL =  "/usuarios-competencia.json"
    private personSearchURL =  "https://platform-beta.senior.com.br/t/senior.com.br/sam/1.0/person/search"
    private personGetURL =  "https://platform-beta.senior.com.br/t/senior.com.br/sam/1.0/person"


    getCompetencias(query: string): Observable < any >{
        let params = new HttpParams();
        params = params.append("q", query);
        let withCredentials = true;
        return this.http.get < any > (this.usuarioCompetenciaURL, { params, withCredentials});
    }

    searchPersonAPI(name: string): Observable < any > {
        let params = new HttpParams({
            fromString : `term=${name}&situation=0`
        });
                
        return this.http.get < any > (this.personSearchURL, { params });
    }

    getPersonApi(id: string): Observable < any >{
        console.log("Get Person: "+id);
        return this.http.get < any > (`${this.personGetURL}/${id}`);
    }
}