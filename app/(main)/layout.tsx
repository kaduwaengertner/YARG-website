import { Footer } from "@/app/components/Footer"
import { MenuHeader } from "../components/MenuHeader";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        <MenuHeader />

        <main>
            {children}
        </main>

        <Footer />
    </>);

}
