import { jsPDF } from "jspdf";
import { getBase64FromImageUrl } from "./utls";

interface ReportData {
  startTime: Date;
  endTime: Date;
  erros: number;
  gameName: string;
}

export const generateGamePDF = async ({
  startTime,
  endTime,
  erros,
  gameName,
}: ReportData) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // =========================
  // HEADER
  // =========================

  // Logo
  const base64Logo = await getBase64FromImageUrl(require("../assets/logo.png"));

  doc.addImage(base64Logo, "PNG", 14, 10, 30, 30);

  // Nome do jogo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(gameName, pageWidth / 2, 20, { align: "center" });

  // Linha divisória
  doc.setDrawColor(200);
  doc.line(14, 45, pageWidth - 14, 45);

  // =========================
  // CONTEÚDO
  // =========================

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Relatório de Sessão", 14, 60);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  doc.text(`Início: ${startTime.toLocaleString()}`, 14, 75);
  doc.text(`Término: ${endTime.toLocaleString()}`, 14, 85);
  doc.text(`Tempo total: ${minutes} min ${seconds} s`, 14, 95);
  doc.text(`Total de erros: ${erros}`, 14, 105);

  // =========================
  // RODAPÉ
  // =========================
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(
    "Documento gerado automaticamente pelo sistema.",
    pageWidth / 2,
    285,
    { align: "center" },
  );

  // Salvar
  doc.save("relatorio_jogo.pdf");
};
