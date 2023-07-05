import { useContext } from "react";
import { AuthContext } from '../utils/AuthContext';
import Order from "../interfaces/Order";
import OrderDetails from "../interfaces/OrderDetails";
import { User } from "../interfaces/User";

const filterPastOrders = (order: Order): boolean => {
  return order.event.date < new Date();
};

const filterOrders = (order:Order): boolean => {
  return !filterPastOrders(order);
};


const useMyAccount = () => {
  const [token] = useContext(AuthContext).token;

  const getMyPurchases = async () : Promise<Order[]> => {
    const url = `http://api.sivtickets.fun/account/purchases/all`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }

    const request = await fetch(url, requestOptions);
    const data = await request.json();

    const orders = data.content.filter(filterOrders);

    return orders;
  }

  const getMyPastPurchases = async (): Promise<Order[]> => {
    const url = `http://api.sivtickets.fun/account/purchases/all`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }

    const request = await fetch(url, requestOptions);
    const data = await request.json();

    const orders = data.content.filter(filterPastOrders);

    return orders;
  }

  const getTicketHash = async (ticketId: String) : Promise<string> => {
    const url = `http://api.sivtickets.fun/account/tickets/hash/${ticketId}`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }

    const request = await fetch(url, requestOptions);
    const data = await request.json();
    
    return data.hash;
  }

  const getPurchaseById = async (purchaseId: string): Promise<OrderDetails> => {
    const url = `http://api.sivtickets.fun/account/purchases/${purchaseId}`;

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }

    const request = await fetch(url, requestOptions);
    const data = await request.json();

    return data;
  };

  const getUserInfo = async (): Promise<User> => {
    const url = `http://api.sivtickets.fun/account/`;

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }

    const request = await fetch(url, requestOptions);
    const data = await request.json();

    return data.messages;
  };


  const changeUserPassword = async (password: string, newPassword: string): Promise<boolean> => {
    const url = `http://api.sivtickets.fun/account/changePassword`;
    const bodyContent = {
      "new_password": newPassword,
      password
    }

    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const request = await fetch(url, requestOptions);
    
    return request.ok;
  }

  return {
    getMyPurchases, 
    getTicketHash,
    getMyPastPurchases,
    getPurchaseById,
    getUserInfo,
    changeUserPassword
  };
};

export default useMyAccount;