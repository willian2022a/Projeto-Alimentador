import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, setDoc, doc, docData, FirestoreDataConverter  } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ConfigsMicro {
  quantidadeReservatorio: number | undefined | string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicosFirestoreService {

  private mostrarModalSucessoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private mostrarModalErroSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  mostrarModalSucesso$: Observable<boolean> = this.mostrarModalSucessoSubject.asObservable();
  mostrarModalErro$: Observable<boolean> = this.mostrarModalErroSubject.asObservable();

  mostrarModalSucesso:boolean = false;
  mostrarModalErro:boolean = false;

  documentId:string = "lho9vSUSO55IG6OG3l5A"
  idReservatorio:string = "qj846FgAsWJ24kOcdlYn"

  private configsMicroConverter: FirestoreDataConverter<ConfigsMicro> = {
    toFirestore(modelObject: ConfigsMicro): any {
      return { ...modelObject }; // Apenas copia o objeto
    },
    fromFirestore(snapshot: any): ConfigsMicro {
      return { quantidadeReservatorio: snapshot.get("quantidadeReservatorio") };
    }
  };

  constructor(private firestore: Firestore) { }

  getRegistros(): Observable<any[]> {
    const placeRef = collection(this.firestore, 'registros');
    const alterado = collectionData(placeRef)
    return alterado
  }

  getQuantidadeReservatorio(): Observable<ConfigsMicro | undefined> {
    const docRef = doc(collection(this.firestore, 'configsMicro'), this.idReservatorio).withConverter(this.configsMicroConverter);
    const quantidadeReservatorio$ = docData(docRef);
    return quantidadeReservatorio$;
  }
  
  updateDocument(novosDados: any): void {
    const docRef = doc(collection(this.firestore, 'registros'), this.documentId);
    
    setDoc(docRef, novosDados)
      .then(() => {
        console.log("Documento atualizado com sucesso!");

        this.mostrarModalSucessoSubject.next(true);
        setTimeout(() => {
          this.mostrarModalSucessoSubject.next(false);
        }, 5000);
        return true;
      })
      .catch((error) => {
        console.error("Erro ao atualizar documento: ", error);

        this.mostrarModalErroSubject.next(true);
        setTimeout(() => {
          this.mostrarModalErroSubject.next(false);
        }, 5000);
        return false;
      });
  }
}
