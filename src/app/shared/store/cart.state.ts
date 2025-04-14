export interface IcartItem {
    id: string;
    title: string;
    image: string;
    category: string;
    stock: number;
    size: string;
    color?: string;
    price: number;
    quantity: number;
  }
 

export interface IcartState {
    items: IcartItem[];
    total: number;
  }
  
  export const initialCartState: IcartState = {
    items: [],
    total: 0,
  };
  
  export interface CardDetails {
    nameOnCard: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }
  
  