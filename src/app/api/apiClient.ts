type RequestOptions = {
    method: string,
    body?: string,
}

type apiClientProps = {
    params: RequestOptions,
    path: string
}

export async function apiClient(props: apiClientProps) : Promise<Response> {
    const { params, path } = props
    const tokens = localStorage.getItem("housebook_tokens")
    let tokensObj = { accessToken: "", refreshToken: "" };
    if(tokens)
    {
        tokensObj = JSON.parse(tokens)
    }
    return fetch(`http://localhost:3001/${path}`, { headers: { "Authorization":  `Bearer ${tokensObj.accessToken}`, "Content-Type": "application/json" }, ...params })
}