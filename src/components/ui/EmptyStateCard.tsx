import { Layers } from "lucide-react";

interface EmptyStateCardProps {
    title: string;
    description: string;
}

export function EmptyStateCard({ title, description }: EmptyStateCardProps) {
    return (
        <div className="bg-white border border-purple-100 rounded-2xl shadow-md p-10 text-center">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-purple-100">
                <Layers className="text-purple-600" size={28} />
            </div>

            <h3 className="text-lg font-semibold text-purple-700">
                {title}
            </h3>

            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                {description}
            </p>
        </div>
    );
}