import { AuthProvider } from "@/src/components/layout/AuthProvider";
import "../../globals.css";


export default function InviteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <AuthProvider>
            {children}
        </AuthProvider>

    );
}