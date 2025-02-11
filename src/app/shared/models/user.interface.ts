export interface Iuser{
    name: string;
    email: string;
    password: string;
    role:string;
    phone:string;
    address:{
        street:string;
        city:string;
        state:string;
        zip:string;
    }
    gender:string;
    image: string;
}