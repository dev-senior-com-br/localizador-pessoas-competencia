import { Component } from "@angular/core";
import { LocalizadorService } from "./localizador.service";
import { MessageService } from "primeng/components/common/messageservice";
import { UsuarioCompetencia } from "./usuario-competencia";
import { TranslateService } from "@ngx-translate/core";

@Component({
    template: require("./main.html"),
    providers:[
        LocalizadorService
    ]
})

export class MainComponent {

    constructor(
        private localizadorService: LocalizadorService,
        private translate: TranslateService,
        private messageService: MessageService
    ){
        //nothing
    }

    private listaUsuariosCompetencia: UsuarioCompetencia[];
    private dataLoading: boolean;
    private searchText: string;


    search() {
        if(!this.searchText){
            this.messageService.add({
                severity: "warn",
                summary: "Valor não informado",
                detail: "Informe o termo que deseja procurar no campo de busca"
            });
            return;
        }
        this.dataLoading = true;
        this.localizadorService.getCompetencias(this.searchText).subscribe(data => {
            this.listaUsuariosCompetencia = data.list;
            if(this.listaUsuariosCompetencia){
                this.listaUsuariosCompetencia.map(usuCompetencia =>{
                    this.localizadorService
                    .searchPersonAPI(usuCompetencia.name)
                    .subscribe(personsFound => {
                        console.log(personsFound);
                        if (!personsFound || personsFound.length == 0){
                            usuCompetencia.ultimoLocal = "Sem informação de local"
                            return
                        }
                        this.localizadorService
                        .getPersonApi(personsFound[0].id)
                        .subscribe(person =>{
                            if(!person.currentPhysicalLocation){
                                usuCompetencia.ultimoLocal = "Sem informação de local"
                            }else{
                                usuCompetencia.ultimoLocal = person.currentPhysicalLocation.name;
                            }
                        })
                    });
                });
            }else{
                this.messageService.add({
                    severity: "info",
                    summary: "Ninguém encontrado",
                    detail: "Não encontramos nenhum colaborador com os dados informados"
                });
            }
            this.dataLoading = false;
        });
    }

    isDataLoading(){
        return this.dataLoading;
    }
};

