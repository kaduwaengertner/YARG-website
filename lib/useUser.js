import useSWR from 'swr';

export default function useUser() {
    const { data: user, mutate: mutateUser } = useSWR('/api/@me', url => fetch(url).then(res => res.json()));
    return { user, mutateUser }
}