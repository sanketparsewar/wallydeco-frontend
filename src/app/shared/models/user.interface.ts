export interface Iuser{
    _id: string;
    name: string;
    email: string;
    password: string;
    phone:string;
    image: string;
    address:{
        street:string;
        city:string;
        state:string;
        zip:string;
    }
    role:string;
    orders:[];
}