import { observable, computed, reaction, action } from 'mobx';
import { createContext } from 'react';

interface IJwtDecrypted {
    exp: string;
    iat: string;
    nbf: string;
    unique_name: string;
    role: string;
    userId: string;
}

const VALID_DAYS : number = 2;

class UserStore {
    @observable user: IJwtDecrypted = { exp: '', iat: '', nbf: '', unique_name: '', role: '', userId: '' };
    @observable jwt: string = window.localStorage.getItem('jwt') || '';
    @observable validToken: boolean = false;
    @observable isAdmin : boolean = false;
    @observable userId : string | null = '';
 
    @action checkIfTokenIsValid = (): void => {
        let now = new Date();
        let expirement = new Date(JSON.stringify(window.localStorage.getItem('validuntil')));

        if (this.isValidToken(now, expirement)) {
            this.validToken = true;
        }
        else {
            this.logOut();
        }
    }

    @action setUserId = () => {
        const user = this.parseJwt(this.jwt);

        this.userId = user.userId;
    }

    @action setJwtToLocalStorage = (token : string) => {
        let validUntil = new Date();
        
        this.jwt = token;
        this.createUserObject();

        validUntil.setHours(validUntil.getHours() - 2); 
        validUntil = this.addDays(validUntil);
        window.localStorage.setItem('jwt', this.jwt);
        window.localStorage.setItem('validuntil', validUntil.toString());
    }

    @action checkIfUserIsAdmin = () => {
        const user = this.parseJwt(this.jwt);

        if (user.role === 'Admin') {
            this.isAdmin = true;
        }
    }

    @action logOut = () => {
        window.localStorage.clear();
        this.isAdmin = false;
        this.validToken = false;
    }

    @action createUserObject = () => {
        this.user = this.parseJwt(this.jwt);
    }

    private addDays(date : Date) {
        var result = new Date(date);

        result.setDate(result.getDate() + VALID_DAYS);
        return result;
      }

    private parseJwt = (token: string): IJwtDecrypted => {
        return JSON.parse(atob(token.split('.')[1]));
    };

    private isValidToken = (currentTime: Date, tokenExpireTime: Date): boolean => {
        return currentTime < tokenExpireTime;
    }
}

export default createContext(new UserStore());
