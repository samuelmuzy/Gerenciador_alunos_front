"use client"

import { ClassDetailData } from "@/src/types/Class-detail";
import { ClassDetailPage } from "./ClassDetail";
import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/src/errors/api-error";
import { handleResponse } from "@/src/services/handle-response";
import { notFound } from "next/navigation";

export default function StudentClassClient({ id_turma }: { id_turma: string }) {
    const [studentClass, setStudentClass] = useState<ClassDetailData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error,setError] = useState<string | null>("");

    const fetchStudentClass = useCallback(async () => {
        try {
          setIsLoading(true);
          setError(null);
    
          const res = await fetch(`/api/student/student-classes/${id_turma}`)

          
    
          const data = await handleResponse<ClassDetailData>(res);
          console.log(data)
          
          setStudentClass(data);

        } catch (error) {
          if (error instanceof ApiError) {
            console.log(error.message);
            setError(error.message);
          } else {
            setError("Não foi possível carregar suas turmas.");
          }
        } finally {
          setIsLoading(false);
        }
      }, []);

      useEffect(() =>{
            fetchStudentClass()
      },[fetchStudentClass])

    if(!studentClass) return <div></div>;

    return (
        <div>
            {<ClassDetailPage data={studentClass}/>}
        </div>
    )
}