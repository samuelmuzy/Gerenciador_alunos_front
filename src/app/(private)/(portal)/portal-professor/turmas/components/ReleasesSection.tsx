import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, FileText } from "lucide-react"
const lancamentosMock = [
    {
        id: 1,
        titulo: "Trabalho de React",
        tipo: "Trabalho",
        data: "15/03/2026",
    },
    {
        id: 2,
        titulo: "Prova de Algoritmos",
        tipo: "Prova",
        data: "22/03/2026",
    },
]
export function ReleasesSection() {
    return (
        <Card className="rounded-2xl shadow-md border border-purple-200 bg-white">
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-purple-600" />
                    <h2 className="text-xl font-semibold text-purple-700">
                        Lançamentos
                    </h2>
                </div>


                <div className="space-y-4">
                    {lancamentosMock.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border border-purple-100 rounded-xl bg-purple-50 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium text-purple-800">
                                    {item.titulo}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.tipo} • {item.data}
                                </p>
                            </div>
                            <FileText className="text-purple-500" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}