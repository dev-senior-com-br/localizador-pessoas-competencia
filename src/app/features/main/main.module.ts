import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/primeng";
import { MainRouting } from "./main.routing";
import { MainComponent } from "./main.component";
import { LocalizadorService } from "./localizador.service";



@NgModule({
    imports: [
        SharedModule,
        MainRouting,
        FormsModule,
        ButtonModule
    ],
    declarations: [MainComponent],
})
export class MainModule {};