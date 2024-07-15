import { LoginData, RegistrationData, User } from "../redux/auth/authTypes.ts";
import { OrderAndTicketsResponse } from "../redux/actions/actionsTypes.ts";

type RequestOptions = {
    method: string,
    headers: Headers,
    body: string,
    redirect: "error" | "follow" | "manual"
}

export class Server {
    private static async sendRequest(method: string, serverUrl: string, endpoint: string, csrfToken?: string, data?: Record<string, any>, headers?: Headers): Promise<any> {

        if (headers) {
            headers.append("Content-Type", "application/json");
        } else {
            headers = new Headers();
        }

        if (csrfToken) {
            headers.append("X-CSRF-TOKEN", csrfToken);
        }

        let raw = "";
        if (data) {
            raw = JSON.stringify(data);
        }

        const requestOptions: RequestOptions = {
            method: method,
            headers: headers,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${serverUrl}${endpoint}`, requestOptions);
        const responseBody = await response.text();

        if (response.ok) {
            return await JSON.parse(responseBody);
        } else {
            throw new Error(`Fetch ${response.status}:${response.statusText}`);
        }
    }

    private static authHeaders(user: User): Headers {
        const headers = new Headers();
        if (user){
            headers.append("Authorization", "Bearer " + user.accessToken);
            headers.append("Refresh-Token", user.refreshToken);
        }
        return headers;
    }

    public static async login(loginData: LoginData, serverUrl: string, csrfToken: string): Promise<any> {
        const data = {
            "username": loginData.username,
            "password": loginData.password
        };

        try {
            return await Server.sendRequest("POST", serverUrl, "/guest/authentication", csrfToken, data);
        } catch (error: any) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    public static async fetchRoles(serverUrl: string, csrfToken: string, user: User): Promise<any> {
        try {
            return await Server.sendRequest("GET", serverUrl, "/admin/roles", csrfToken, undefined, this.authHeaders(user));
        } catch (error: any) {
            throw new Error(`Failed to retrieve roles: ${error.message}`);
        }
    }

    public static async getToken(serverUrl: string): Promise<string> {
        try {
            const req = await Server.sendRequest("GET", serverUrl, "/guest/csrf-token");
            return req.token;
        } catch (error: any) {
            throw new Error(`Failed to retrieve token: ${error.message}`);
        }
    }

    public static async registration(regData: RegistrationData, serverUrl: string, csrfToken: string, user: User): Promise<any> {
        const data = {
            "name": regData.name,
            "email": regData.username,
            "password": regData.password,
            "role": regData.roleId
        };

        try {
            return await Server.sendRequest("POST", serverUrl, "/admin/new-account", csrfToken, data, this.authHeaders(user));
        } catch (error: any) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    public static async getOrder(serverUrl: string, orderId: string, csrfToken: string, user: User): Promise<any>{
        try {
            return await Server.sendRequest("GET", serverUrl, `/admin/order-and-tickets-from-remote?id=${orderId}`, csrfToken, undefined, this.authHeaders(user));
        } catch (error: any) {
            throw new Error(`Failed to getting order: ${error.message}`);
        }
    }

    public static async getWhoIsIn(serverUrl: string, csrfToken: string, user: User): Promise<any>{
        try {
            return await Server.sendRequest("GET", serverUrl, "/employee/whoisin", csrfToken, undefined, this.authHeaders(user));
        } catch (error: any) {
            throw new Error(`Failed to getting who is in: ${error.message}`);
        }
    }

    public static async getTickets(serverUrl: string, csrfToken: string, user: User): Promise<any>{
        try {
            return await Server.sendRequest("GET", serverUrl, "/guest/tickets", csrfToken, undefined, this.authHeaders(user));
        } catch (error: any) {
            throw new Error(`Failed to getting tickets: ${error.message}`);
        }
    }
}
