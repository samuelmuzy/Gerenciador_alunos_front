import AcceptClient from '../../components/AcceptClient'


export default async function AcceptInvitePage({
    params,
}: {
    params: Promise<{ token: string }>
}) {
    const { token } = await params;

    return (
        <AcceptClient token={token} />
    )
}