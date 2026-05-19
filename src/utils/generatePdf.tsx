import { jsPDF } from "jspdf";
import { getBase64FromImageUrl } from "./utls";
import { IJogos } from "@api/jogo-interface";

interface ReportData {
  startTime: Date;
  endTime: Date;
  erros: number;
  selectedJogo: IJogos;
  dicaSemantica: number;
  dicaFonetica: number;
}

export const generateGamePDF = async ({
  startTime,
  endTime,
  erros,
  selectedJogo,
  dicaSemantica,
  dicaFonetica,
}: ReportData) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  const base64Logo = await getBase64FromImageUrl(require("../assets/logo.png"));

  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  // =========================
  // HEADER
  // =========================

  doc.addImage(base64Logo, "PNG", 14, 10, 30, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  doc.text(selectedJogo.nome, pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(`Gerado em: ${new Date().toLocaleString()}`, pageWidth - 14, 30, {
    align: "right",
  });

  // linha divisória
  doc.setDrawColor(200);
  doc.line(14, 45, pageWidth - 14, 45);

  // =========================
  // TÍTULO
  // =========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text("Relatório de Sessão", 14, 60);

  // =========================
  // CONTEÚDO
  // =========================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  let currentY = 72;

  /**
   * Helper para adicionar linhas
   */
  const addLine = (text: string, spacing: number = 10) => {
    doc.text(text, 14, currentY);
    currentY += spacing;
  };

  /**
   * SOBRE O JOGO
   */
  const sobreJogo = doc.splitTextToSize(
    `Sobre o jogo: ${selectedJogo.sobre}`,
    170,
  );

  doc.text(sobreJogo, 14, currentY);

  // altura dinâmica do texto
  currentY += sobreJogo.length * 7 + 8;

  /**
   * DADOS DA SESSÃO
   */

  addLine(`Início: ${startTime.toLocaleString()}`);

  addLine(`Término: ${endTime.toLocaleString()}`);

  addLine(`Tempo total: ${minutes} min ${seconds} s`);

  addLine(`Total de erros: ${erros}`);

  /**
   * DADOS EXTRAS
   */
  if (selectedJogo.nome === "Nomeação de Boston") {
    addLine(`Total de dicas semânticas solicitadas: ${dicaSemantica}`);

    addLine(`Total de dicas fonéticas solicitadas: ${dicaFonetica}`);
  }

  // =========================
  // RODAPÉ
  // =========================

  doc.setFontSize(9);
  doc.setTextColor(150);

  const footerText =
    "Documento gerado automaticamente pelo sistema em fase de teste, não deve ser utilizado como laudo.";

  const footer = doc.splitTextToSize(footerText, 160);

  doc.text(footer, pageWidth / 2, 285, {
    align: "center",
  });

  // =========================
  // SALVAR
  // =========================

  doc.save(`relatorio_jogo_${selectedJogo.nome.replace(/\s+/g, "_")}.pdf`);
};
