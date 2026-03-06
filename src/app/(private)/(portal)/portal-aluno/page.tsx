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
import { Router } from "next/router";
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
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-slate-950 to-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-6 md:py-12">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-900/50 px-3 py-1 text-xs font-medium text-violet-200 ring-1 ring-violet-500/40">
              <Sparkles className="h-3 w-3 text-violet-300" />
              <span>Portal do Aluno</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 ring-1 ring-violet-400/60">
                <GraduationCap className="h-6 w-6 text-violet-300" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Minhas turmas
                </h1>
                <p className="mt-1 text-sm text-violet-200/70">
                  Veja em quais turmas você está matriculado e acesse seus
                  conteúdos.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={fetchClasses}
            className="mt-2 inline-flex items-center gap-2 rounded-xl border-violet-500/60 bg-violet-900/20 px-4 py-2 text-xs font-semibold text-violet-100 hover:bg-violet-800/40 hover:text-white md:mt-0"
          >
            <Loader2
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Atualizar
          </Button>
        </header>

        {/* Estado de carregamento */}
        {isLoading && (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3 text-violet-100/80">
              <Loader2 className="h-7 w-7 animate-spin text-violet-300" />
              <p className="text-sm">Carregando suas turmas...</p>
            </div>
          </div>
        )}

        {/* Erro */}
        {!isLoading && error && (
          <Card className="border-rose-500/40 bg-gradient-to-r from-rose-950/80 via-slate-950 to-slate-950 text-rose-50">
            <CardContent className="flex items-start gap-3 py-4">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-rose-900/70">
                <AlertCircle className="h-4 w-4 text-rose-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">Não foi possível carregar suas turmas.</p>
                <p className="mt-1 text-xs text-rose-100/80">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de turmas */}
        {!isLoading && !error && (
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-violet-200/70">
              Turmas
            </h2>

            {!hasClasses ? (
              <Card className="border-dashed border-violet-700/60 bg-violet-950/40 text-violet-100">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-900/70 ring-1 ring-violet-500/60">
                    <BookOpen className="h-6 w-6 text-violet-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">
                      Você ainda não está em nenhuma turma
                    </p>
                    <p className="text-xs text-violet-200/70">
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
                    className="group relative overflow-hidden rounded-2xl border border-violet-700/60 bg-gradient-to-br from-violet-950/80 via-slate-950 to-slate-950 shadow-lg shadow-violet-900/40 transition-all hover:border-violet-400 hover:shadow-violet-800/60"
                  >
                    <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-br from-violet-500/25 via-fuchsia-500/10 to-transparent blur-3xl" />
                    <CardHeader className="relative space-y-1 pb-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-900/80 ring-1 ring-violet-500/60">
                            <GraduationCap className="h-4.5 w-4.5 text-violet-200" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-violet-50">
                              {turma.nome}
                            </CardTitle>
                            <CardDescription className="text-[11px] text-violet-200/80">
                              ID do período: {turma.id_periodo}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative pb-4 pt-1">
                      {turma.periodo && (
                        <div className="mb-3 flex items-center gap-2 text-xs text-violet-200/80">
                          <CalendarDays className="h-3.5 w-3.5 text-violet-300" />
                          <span className="font-medium">
                            {turma.periodo.nome}
                          </span>
                          <span className="mx-1 text-violet-500/60">•</span>
                          <span className="truncate text-violet-200/70">
                            {turma.periodo.descricao}
                          </span>
                        </div>
                      )}

                      <div className="mt-1 flex items-center justify-between text-[11px] text-violet-200/80">
                        <span className="rounded-full bg-violet-900/60 px-2 py-1 font-medium uppercase tracking-[0.18em] text-violet-200">
                          Turma ativa
                        </span>
                        {turma.periodo && (
                          <span className="text-violet-300">
                            Nota de corte:{" "}
                            <span className="font-semibold">
                              {turma.periodo.nota_corte}
                            </span>
                          </span>
                        )}

                      </div>
                      <Link
                        href={`/portal-aluno/turmas/${turma.id}`}
                        className="mt- inline-flex items-center gap-2 rounded-xl border-violet-500/60 bg-violet-900/20 px-4 py-2 text-xs font-semibold text-violet-100 hover:bg-violet-800/40 hover:text-white md:mt-0"
                      > 
                        Atualizar
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