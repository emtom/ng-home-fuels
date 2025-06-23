import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Firestore, collection, collectionData, query, orderBy } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { Fuel } from "./fuel.service";

export interface Entry {
    id: string;
    date: string;
    type: 'fuelUsage' | 'fuelPurchase';
    data: {
        fuel: Fuel;
        quantity: number;
        cost: number;
    }
}

@Injectable({
    providedIn: 'root'
})
export class EntryService {
    constructor(
        private firestore: Firestore,
        private authService: AuthService
    ) {}

    /**
     * Get all entries for the current user
     */
    getEntries(): Observable<Entry[]> {
        const user = this.authService.user();
        if (!user) {
            return new Observable(subscriber => subscriber.next([]));
        }

        const entriesRef = collection(this.firestore, `users/${user.uid}/entries`);
        const q = query(entriesRef, orderBy('date', 'desc'));
        
        return collectionData(q, { idField: 'id' }).pipe(
            map(docs => docs as Entry[])
        );
    }
}
