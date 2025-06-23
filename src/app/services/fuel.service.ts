import { Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, orderBy, limit } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { Observable, from, map } from "rxjs";

export interface Fuel {
    id: string;
    name: string;
    quantity: number;
    calorificValue: number;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class FuelService {
    constructor(
        private firestore: Firestore,
        private authService: AuthService
    ) {}
}
