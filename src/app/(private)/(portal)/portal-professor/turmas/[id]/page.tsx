import ClassClient from "../components/features/student-class/ClassClient";


export default async function TurmaPage({ params, }: { params: Promise<{ id: string }>; }) { 
  const { id } = await params;

  return <ClassClient id={id} />;
}
