 "use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Link as LinkIcon, Copy, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/input";

export default function CreateInviteLinkCard() {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const generateFakeLink = () => {
    const token = Math.random().toString(36).substring(2, 12);
    const newLink = `https://seusistema.com/convite?token=${token}`;
    setInviteLink(newLink);
    setIsCopied(false);
  };

  const copyLink = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card className="rounded-2xl shadow-xl border-purple-200 bg-white">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100">
              <LinkIcon className="w-5 h-5 text-purple-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-purple-700">
              Gerar Link de Convite
            </CardTitle>
          </div>
          <CardDescription className="text-gray-500">
            Crie um link para que seus alunos entrem na turma de forma rápida e segura.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!inviteLink && (
            <Button
              onClick={generateFakeLink}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Gerar Link
            </Button>
          )}

          {inviteLink && (
            <div className="space-y-3">
              <Input
                value={inviteLink}
                readOnly
                className="border-purple-300 focus-visible:ring-purple-500 rounded-xl"
              />

              <div className="flex gap-2">
                <Button
                  onClick={copyLink}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </Button>

                <Button
                  variant="outline"
                  onClick={generateFakeLink}
                  className="rounded-2xl border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Novo
                </Button>
              </div>

              {isCopied && (
                <Badge className="bg-purple-100 text-purple-700 rounded-xl">
                  Link copiado com sucesso!
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
