import { ResponseAPI } from "@/model/Response";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpRequestParams {
    url: string;
    method?: HttpMethod;
    options?: object;
    useBaseURL?: boolean;
    headers?: object;
    body?: object | null;
    params?: Record<string, any> | null;
    cache?: boolean;
    revalidate?: number;
}

export interface ResponseMessage {
    ok: boolean;
    status: number;
    body?: ResponseAPI;
}

export default async function Request({
    url = '',
    method = 'GET',
    options = {},
    useBaseURL = false,
    headers = {},
    body = null,
    params = null,
    cache = true,
    revalidate = undefined,
}: HttpRequestParams): Promise<ResponseMessage> {
    let responseDoc: ResponseMessage = {
        status: -1,
        ok: false,
    }

    try {
        const baseURL = useBaseURL ? process.env.NEXT_PUBLIC_BASE_URL : '';
        const requestHeaders: Record<string, string> = {
            ...(headers || {}),
        };

        if (body) {
            requestHeaders['Content-Type'] = 'application/json';
        }

        let finalURL = `${baseURL}${url}` + (params ? '?' + new URLSearchParams(params) : '');

        if (!cache) {
            options = {
                ...options,
                cache: 'no-store',
            }
        }

        if (revalidate) {
            options = {
                ...options,
                next: {
                    revalidate: revalidate,
                }
            }
        }

        responseDoc = await fetch(
            finalURL,
            {
                method,
                body: body && JSON.stringify(body),
                headers: requestHeaders,
                ...options,
            }).then(async (res) => {
                const body = await res.json();
                return {
                    ok: res.ok,
                    status: res.status,
                    body,
                };
            }).catch((_err) => {
                //console.error(_err);
                return {
                    ok: false,
                    status: -1,
                };
            });
    } catch (_err) {
        //console.error(_err);
    }

    return responseDoc;
}