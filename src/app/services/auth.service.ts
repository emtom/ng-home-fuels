import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, User, setPersistence, browserLocalPersistence, onAuthStateChanged } from '@angular/fire/auth';

export interface IAuthUser extends User {};

export interface IAuthState {
  user: IAuthUser | null;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public state: WritableSignal<IAuthState | null | undefined> = signal(undefined);  
  public readonly user = computed(() => this.state()?.user);
  public readonly userId = computed(() => this.state()?.user?.uid);
  public readonly isAuthenticated = computed(() => !!this.state()?.user);
  public readonly isLoading = computed(() => this.state()?.user === undefined);
  private auth = inject(Auth);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.state.set({ user });
    });
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async logout() {
    await signOut(this.auth);
  }
} 