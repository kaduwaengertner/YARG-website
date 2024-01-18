import useSWR from "swr";

export default function SWR<T>(url: string) {
    return useSWR<T>(
            url, 
            (url: string) => fetch(url).then(res => res.json())
        );
};