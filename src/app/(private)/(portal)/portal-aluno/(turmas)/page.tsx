"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/src/errors/api-error";
import { handleResponse } from "@/src/services/handle-response";
import { ClassStudent } from "@/src/types/Class-student";
import {
  GraduationCap,
  Loader2,
  AlertCircle,
  BookOpen,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function PortalStudentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<ClassStudent[] | null>(null);

  

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/student/student-classes")

      const data = await handleResponse<ClassStudent[]>(res);
      console.log(data)
      setClasses(data);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError("Não foi possível carregar suas turmas.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const hasClasses = !!classes && classes.length > 0;

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-6 md:py-12">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white px-3 py-1 text-xs font-medium text-violet-700 shadow-sm shadow-violet-100/50">
              <Sparkles className="h-3 w-3 text-violet-500" />
              <span>Portal do Aluno</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white shadow-sm">
                <GraduationCap className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  Minhas turmas
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Veja em quais turmas você está matriculado e acesse seus
                  conteúdos.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={fetchClasses}
            className="mt-2 inline-flex items-center gap-2 rounded-xl border-violet-200 bg-white px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm hover:border-violet-300 hover:bg-violet-50 md:mt-0"
          >
            <Loader2
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Atualizar lista de turmas
          </Button>
        </header>

        {/* Estado de carregamento */}
        {isLoading && (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <Loader2 className="h-7 w-7 animate-spin text-violet-500" />
              <p className="text-sm">Carregando suas turmas...</p>
            </div>
          </div>
        )}

        {/* Erro */}
        {!isLoading && error && (
          <Card className="border border-rose-200 bg-white text-rose-900 shadow-sm">
            <CardContent className="flex items-start gap-3 py-4">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-rose-50">
                <AlertCircle className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Não foi possível carregar suas turmas.</p>
                <p className="mt-1 text-xs text-rose-600/90">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de turmas */}
        {!isLoading && !error && (
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-violet-400">
              Turmas
            </h2>

            {!hasClasses ? (
              <Card className="border border-dashed border-violet-200 bg-white text-slate-600 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50/80">
                    <BookOpen className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Você ainda não está em nenhuma turma
                    </p>
                    <p className="text-xs text-slate-500">
                      Quando você entrar em uma turma, ela aparecerá aqui.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {classes!.map((turma) => (
                  <Card
                    key={turma.id}
                    className="group relative overflow-hidden rounded-2xl border border-violet-100/90 bg-white shadow-sm shadow-violet-100/40 transition-all hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/60"
                  >
                    <div className="pointer-events-none absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-violet-100/50 to-transparent" />
                    <CardHeader className="relative space-y-1 pb-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50">
                            <GraduationCap className="h-4.5 w-4.5 text-violet-600" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-slate-900">
                              {turma.nome}
                            </CardTitle>
                            <CardDescription className="text-[11px] text-slate-500">
                              ID do período: {turma.id_periodo}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative pb-4 pt-1">
                      {turma.periodo && (
                        <div className="mb-3 flex items-center gap-2 text-xs text-slate-600">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                          <span className="font-medium text-slate-700">
                            {turma.periodo.nome}
                          </span>
                          <span className="mx-1 text-violet-200">•</span>
                          <span className="truncate text-slate-500">
                            {turma.periodo.descricao}
                          </span>
                        </div>
                      )}

                      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                        <span className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-0.5 font-medium uppercase tracking-[0.14em] text-violet-700">
                          Turma ativa
                        </span>
                        {turma.periodo && (
                          <span>
                            Nota de corte:{" "}
                            <span className="font-semibold text-slate-700">
                              {turma.periodo.nota_corte}
                            </span>
                          </span>
                        )}

                      </div>
                      <Link
                        href={`/portal-aluno/${turma.id}`}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
                      >
                        Acessar conteúdos, etapas e trabalhos
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default PortalStudentPage;