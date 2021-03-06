import { history } from './../../index';
import { runInAction } from 'mobx';
import { store } from './store';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { User, UserFormValues } from './../models/user';
export default class UserStore{
    user: User | null = null;
    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return  !!this.user;
    }

    login = async (credentials: UserFormValues) =>{
        try {
            const user = await agent.Account.login(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        }
        catch(error){
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            })
        }
        catch(error){
            console.log(error)
        }
    }

    register = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.register(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        }
        catch(error){
            throw error;
        }
    }

    setImage = (image:string) => {
        if(this.user){
            this.user.image = image;
        }
    }
}