import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { PostgresStore, PgVector } from "@mastra/pg";
import { pdfToQuestionsWorkflow } from "./workflows/generate-questions-from-pdf-workflow";
import { textQuestionAgent } from "./agents/text-question-agent";
import { pdfQuestionAgent } from "./agents/chat";
import { pdfSummarizationAgent } from "./agents/pdf-summarization-agent";

export const mastra = new Mastra({
  // workflows: { pdfToQuestionsWorkflow },
  agents: {
    textQuestionAgent,
    pdfQuestionAgent,
    pdfSummarizationAgent,
  },
  storage: new PostgresStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    connectionString: process.env.DATABASE_URL!,
  }),
  vectors: {
    main: new PgVector({
      // stores embeddings, if it needs to persist, change to file:../mastra.db
      connectionString: process.env.DATABASE_URL!,
    }),
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
